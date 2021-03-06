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
        // ???????????????????????????????????????
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
        message: '???????????????',
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
      message: '??????????????????',
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
          message: '??????????????????????????????',
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
      message: '???????????????',
    });
  }

  // ??????md??????
  private async _uploadMarkdown(
    file: GlobalType.UploadFile,
  ): Promise<{ path: string; firstParagraph: string }> {
    const timestamp = new Date().getTime();
    const dirName = file.originalname.replace(/\.(zip)$/gi, '');
    let mdFileName: string;
    // ????????????????????????
    const imageReplaceUrl = this._envService.isDev
      ? `file://Users/kuubee/Desktop/self_porject/node/blog/static/markdown/${timestamp}/`
      : `https:\/\/autocode.icu/assets/markdown/${timestamp}/`;
    // ??????md?????????
    const mdPath = this._envService.isDev
      ? // ????????????
        path.resolve(__dirname, '../../../', './static/markdown')
      : // ???????????????
        '/home/assets/markdown';
    // ??????md??????????????????
    const uncompressMdPath = path.resolve(mdPath, `./${dirName}`);
    // ???????????????????????????
    const saveMdPath = path.resolve(mdPath, `./${timestamp}`);
    try {
      await fsP.access(uncompressMdPath, fs.constants.F_OK);
      this._responseService.error({
        message: `???????????????????????????????????????????????????????????????`,
        data: uncompressMdPath,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        this._responseService.error(error.getResponse() as ErrorType);
      }
      // ?????????????????????
      console.log('???????????????', error);
    }
    try {
      // ?????????????????????
      await compressing.zip.uncompress(file.buffer, mdPath);
      // ???????????????????????????
      await fsP.access(uncompressMdPath, fs.constants.F_OK);
      // ?????????????????????
      const uncompressDir = await fsP.opendir(uncompressMdPath);
      for await (const dirent of uncompressDir) {
        const name = dirent.name;
        if (name.match(/\.md$/)) {
          console.log('dirent', dirent);

          // ??????md????????????
          mdFileName = name;
          if (mdFileName === 'index.md')
            throw this._responseService.error({
              message: '?????????md??????????????????index.md',
            });
          break;
        }
      }

      // ???????????????md??????????????????
      if (!mdFileName) {
        this._responseService.error({
          message: '???????????????md?????????????????????',
          code: HttpStatus.BAD_REQUEST,
        });
      }

      // ????????????md
      const baseMdPath = path.join(uncompressMdPath, `./${mdFileName}`);
      // ?????? md ?????????
      const readable = fs.createReadStream(baseMdPath);
      // ?????????????????????
      const targetMdPath = path.join(uncompressMdPath, `./index.md`);
      // ?????? md ?????????
      const writeable = fs.createWriteStream(targetMdPath);
      // ?????? md ?????????
      const imageUrlTransformPipe = new ImageUrlTransformPipe(imageReplaceUrl);
      // ?????????????????????
      const selectParagraphPipe = new SelectParagraphPipe();
      // ???????????? ???????????????md??????
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
      // ????????????md
      await fsP.unlink(baseMdPath);
      // ??????????????????
      execSync(`mv ${uncompressMdPath} ${saveMdPath}`);
      return {
        path: `${imageReplaceUrl}index.md`,
        firstParagraph: selectParagraphPipe.firstParagraph,
      };
    } catch (error) {
      console.log('????????????', error);
      await fsP.rmdir(uncompressMdPath, {
        recursive: true,
      });
      this._responseService.error({
        data: error,
      });
    }
  }
}
