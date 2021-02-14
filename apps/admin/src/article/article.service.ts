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
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IndexArticleDTO } from '@app/lib/dto/article/index.dto';
import { PaginationService } from '@app/lib/service/pagination/pagination.service';
import { TagEntity } from '@app/lib/entity/tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private _articleRepository: Repository<ArticleEntity>,
    private _responseService: ResponseService,
    private _envService: EnvService,
    private _paginationService: PaginationService,
  ) {}

  async index({ page, pageSize }: IndexArticleDTO) {
    console.log(
      this._articleRepository
        .createQueryBuilder('articl')
        .leftJoinAndSelect('articl.tag', 'tag')
        .getQuery(),
    );

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
          // 'tag.tagId',
          'articl.status',
          'articl.likeCount',
          'articl.createdAt',
          'articl.updatedAt',
        ])
        .innerJoin('articl.classification', 'classification')
        .leftJoinAndSelect('tag', 'tag'),
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
    const articleLink = await this._uploadMarkdown(file);
    await this._articleRepository
      .createQueryBuilder('article')
      .insert()
      .into(ArticleEntity)
      .values({
        title,
        classificationId,
        tagId: tagId.split(',').map((item) => parseInt(item)),
        status: ArticleStatus.ENABLE,
        likeCount: 0,
        dislikeCount: 0,
        articleLink,
      })
      .execute();

    return this._responseService.success({
      message: '创建文章成功',
    });
  }
  // 上传md文件
  private async _uploadMarkdown(file: GlobalType.UploadFile): Promise<string> {
    const dirName = file.originalname.replace(/\.(zip)$/gi, '');
    let mdFileName: string;
    // 默认替换图片地址
    const imageReplaceUrl = this._envService.isDev
      ? 'https://cc/bb/'
      : `https://autocode.icu/assets/markdown/${dirName}/`;
    // 默认md根目录
    const mdPath = this._envService.isDev
      ? // 开发目录
        path.resolve(__dirname, '../../../', './static/markdown')
      : // 服务器目录
        '/home/assets/markdown';
    // 当前md的文件夹路径
    const readMdPath = path.resolve(mdPath, `./${dirName}`);
    try {
      await fsP.access(readMdPath, fs.constants.F_OK);
      this._responseService.error({
        message: `目录存在重复请检查上传文件名称是否重复`,
        data: readMdPath,
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
      await fsP.access(readMdPath, fs.constants.F_OK);
      // 获取文件夹内容
      const uncompressDir = await fsP.opendir(readMdPath);
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
      const baseMdPath = path.join(readMdPath, `./${mdFileName}`);
      // 创建 md 读取流
      const readable = fs.createReadStream(baseMdPath);
      // 转写的目标文件
      const targetMdPath = path.join(readMdPath, `./index.md`);
      // 创建 md 写入流
      const writeable = fs.createWriteStream(targetMdPath);
      // 创建 md 转换流
      const imageUrlTransformPipe = new ImageUrlTransformPipe(imageReplaceUrl);
      // 写入成功 准备删除原md文件
      readable.pipe(imageUrlTransformPipe).pipe(writeable);
      // 删除基础md
      await fsP.unlink(baseMdPath);
      return path.join(imageReplaceUrl, `./index.md`);
    } catch (error) {
      console.log('外部错误', error);
      await fsP.rmdir(readMdPath, {
        recursive: true,
      });
      this._responseService.error();
    }
  }
}
