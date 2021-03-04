import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import fsP from 'fs/promises';
import { ErrorType, ResponseService } from '@app/lib/service/response.service';
import compressing from 'compressing';
import { GlobalType } from '@app/lib/interface';
import { ImageUrlTransformPipe } from '@app/lib/pipe/fs-markdown.pipe';
import { EnvService } from '@app/lib/service/env/env.service';
import { CreateArticleDTO } from '@app/lib/dto/article/create.dto';
import { ArticleEntity, ArticleStatus } from '@app/lib/entity/article.entity';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IndexArticleDTO } from '@app/lib/dto/article/index.dto';
import { PaginationService } from '@app/lib/service/pagination/pagination.service';
import { execSync } from 'child_process';
import { UpdateArticleDTO } from '@app/lib/dto/article/update.dto';
import { SelectParagraphPipe } from '@app/lib/pipe/select-paragraph.pipe';
import { TagEntity } from '@app/lib/entity/tag.entity';
import { ClassificationEntity } from '@app/lib/entity/classification.entity';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private _articleRepository: Repository<ArticleEntity>,
    @InjectRepository(TagEntity)
    private _tagRepository: Repository<TagEntity>,
    @InjectRepository(ClassificationEntity)
    private _classRepository: Repository<ClassificationEntity>,
    private _responseService: ResponseService,
    private _envService: EnvService,
    private _paginationService: PaginationService,
  ) {}

  async index({ page, pageSize }: IndexArticleDTO) {
    const res = await this._paginationService.pagination({
      queryBuilder: this._articleRepository
        .createQueryBuilder('articl')
        .select([
          'articl.articleId',
          'articl.title',
          'articl.articleLink',
          'classification.classificationId',
          'classification.content',
          'articl.tagId',
          'articl.status',
          'articl.likeCount',
          'articl.createdAt',
          'articl.updatedAt',
          'tags',
        ])
        .innerJoin('articl.classification', 'classification')
        // 这个是后来才加的功能。。。
        .leftJoinAndSelect('articl.tag', 'tags')
        .orderBy('articl.createdAt', 'DESC'),
      page,
      pageSize,
    });
    return this._responseService.success({
      data: res,
    });
  }

  async create(
    file: GlobalType.UploadFile,
    { title, classificationId, tagId }: CreateArticleDTO,
  ) {
    const [, count] = await this._articleRepository.findAndCount({
      title,
    });
    if (count)
      return this._responseService.error({
        message: '标题重复！',
      });
    const { path: articleLink, firstParagraph } = await this._uploadMarkdown(
      file,
    );
    const tagIdArr = tagId.split(',').map((item) => parseInt(item));
    const tagEntityList = await this._tagRepository
      .createQueryBuilder('tag')
      .select()
      .where('tag.tagId = ANY(:tag)', {
        tag: tagIdArr,
      })
      .getMany();
    const classEntity = await this._classRepository.findOne(classificationId);

    const res = await getConnection().transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(ArticleEntity, {
          title,
          classificationId,
          tagId: tagIdArr,
          status: ArticleStatus.ENABLE,
          likeCount: 0,
          dislikeCount: 0,
          articleLink,
          firstParagraph,
          tag: tagEntityList,
          classification: classEntity,
        });
        // await transactionalEntityManager
        //   .createQueryBuilder()
        //   .insert()
        //   .into(ArticleEntity)
        //   .values({
        //     title,
        //     classificationId,
        //     tagId: tagIdArr,
        //     status: ArticleStatus.ENABLE,
        //     likeCount: 0,
        //     dislikeCount: 0,
        //     articleLink,
        //     firstParagraph,
        //     tag: tagEntityList,
        //     classification: classEntity,
        //   })
        //   .execute();
        await transactionalEntityManager
          .createQueryBuilder()
          .update(TagEntity)
          .set({
            count: () => 'count + 1',
          })
          .where('tagId = ANY(:id)', {
            id: tagIdArr,
          })
          .execute();
        await transactionalEntityManager
          .createQueryBuilder()
          .update(ClassificationEntity)
          .set({
            count: () => 'count + 1',
          })
          .where('classificationId = :id', {
            id: classificationId,
          })
          .execute();
      },
    );
    // await this._articleRepository.save({
    //   title,
    //   classificationId,
    //   tagId: tagIdArr,
    //   status: ArticleStatus.ENABLE,
    //   likeCount: 0,
    //   dislikeCount: 0,
    //   articleLink,
    //   firstParagraph,
    //   tag: tagEntityList,
    // });
    return this._responseService.success({
      message: '创建文章成功',
      data: res,
    });
  }

  async info(id: string) {
    const res = await this._articleRepository.findOne(id);
    return this._responseService.success({
      data: res,
    });
  }

  async update(
    file: GlobalType.UploadFile,
    articleId: number,
    { title, tagId, classificationId }: UpdateArticleDTO,
  ) {
    const findOne = await this._articleRepository.findOne(articleId);
    if (!findOne)
      return (
        this,
        this._responseService.error({
          message: '不能更新不存在的文章',
        })
      );
    const { articleLink: oldArticleLink } = findOne;
    const { path: newArticleLink, firstParagraph } = await this._uploadMarkdown(
      file,
    );
    const newArticle = {
      articleId,
      title,
      classificationId: parseInt(classificationId),
      tagId: JSON.parse(tagId),
      status: ArticleStatus.ENABLE,
      // likeCount: 0,
      // dislikeCount: 0,
      articleLink: newArticleLink,
      firstParagraph,
    };
    await this._articleRepository
      .createQueryBuilder()
      .update(ArticleEntity)
      .set(newArticle)
      .where('articleId = :id', { id: articleId })
      .execute();
    const oldMdPath = oldArticleLink.match(/\/markdown\/[0-9]*/);
    const defaultMdPath = this._envService.isDev
      ? `/Users/kuubee/Desktop/self_porject/node/blog/static${oldMdPath}`
      : `/home/assets${oldMdPath}`;
    await fsP.rmdir(defaultMdPath, {
      recursive: true,
    });
    return this._responseService.success({
      message: '更新成功！',
    });
  }

  // 上传md文件
  private async _uploadMarkdown(
    file: GlobalType.UploadFile,
  ): Promise<{ path: string; firstParagraph: string }> {
    const timestamp = new Date().getTime();
    const dirName = file.originalname.replace(/\.(zip)$/gi, '');
    let mdFileName: string;
    // 默认替换图片地址
    const imageReplaceUrl = this._envService.isDev
      ? `file:///Users/kuubee/Desktop/self_porject/node/blog/static/markdown/${timestamp}/`
      : `https://autocode.icu/assets/markdown/${timestamp}/`;
    // 默认md根目录
    const mdPath = this._envService.isDev
      ? // 开发目录
        path.resolve(__dirname, '../../../', './static/markdown')
      : // 服务器目录
        '/home/assets/markdown';
    // 当前md的文件夹路径
    const uncompressMdPath = path.resolve(mdPath, `./${dirName}`);
    // 实际存的文件夹路径
    const saveMdPath = path.resolve(mdPath, `./${timestamp}`);
    try {
      await fsP.access(uncompressMdPath, fs.constants.F_OK);
      this._responseService.error({
        message: `解压目录存在重复请检查上传文件名称是否重复`,
        data: uncompressMdPath,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        this._responseService.error(error.getResponse() as ErrorType);
      }
      // 需要目录不存在
      console.log('允许的报错', error);
    }
    try {
      // 解压至目标路径
      await compressing.zip.uncompress(file.buffer, mdPath);
      // 检查文件夹是否存在
      await fsP.access(uncompressMdPath, fs.constants.F_OK);
      // 获取文件夹内容
      const uncompressDir = await fsP.opendir(uncompressMdPath);
      for await (const dirent of uncompressDir) {
        const name = dirent.name;
        if (name.match(/\.md$/)) {
          // 获取md文件名称
          mdFileName = name;
          break;
        }
      }

      // 如果不存在md文件直接报错
      if (!mdFileName) {
        this._responseService.error({
          message: '至少包含个md文件啊！混蛋！',
          code: HttpStatus.BAD_REQUEST,
        });
      }

      // 带转换的md
      const baseMdPath = path.join(uncompressMdPath, `./${mdFileName}`);
      // 创建 md 读取流
      const readable = fs.createReadStream(baseMdPath);
      // 转写的目标文件
      const targetMdPath = path.join(uncompressMdPath, `./index.md`);
      // 创建 md 写入流
      const writeable = fs.createWriteStream(targetMdPath);
      // 创建 md 转换流
      const imageUrlTransformPipe = new ImageUrlTransformPipe(imageReplaceUrl);
      // 获取第一个段落
      const selectParagraphPipe = new SelectParagraphPipe();
      // 写入成功 准备删除原md文件
      readable
        .pipe(imageUrlTransformPipe)
        .pipe(selectParagraphPipe)
        .pipe(writeable);
      await new Promise((reslove, reject) => {
        readable.on('close', () => {
          reslove(null);
        });
        readable.on('error', (err) => {
          reject(err);
        });
      });
      // 删除基础md
      await fsP.unlink(baseMdPath);
      // 文件夹重命名
      execSync(`mv ${uncompressMdPath} ${saveMdPath}`);
      return {
        path: path.join(imageReplaceUrl, `./index.md`),
        firstParagraph: selectParagraphPipe.firstParagraph,
      };
    } catch (error) {
      console.log('外部错误', error);
      await fsP.rmdir(uncompressMdPath, {
        recursive: true,
      });
      this._responseService.error({
        data: error,
      });
    }
  }
}
