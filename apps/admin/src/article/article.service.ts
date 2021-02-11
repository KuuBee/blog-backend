import { HttpStatus, Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import fsP from 'fs/promises';
import { ResponseService } from '@app/lib/service/response.service';
import compressing from 'compressing';
import { GlobalType } from '@app/lib/interface';
import { ImageUrlTransformPipe } from '@app/lib/pipe/fs-markdown.pipe';
import { ConfigService } from '@nestjs/config';
import { EnvService } from '@app/lib/service/env/env.service';

@Injectable()
export class ArticleService {
  constructor(
    private _responseService: ResponseService,
    private _envService: EnvService,
  ) {}
  async create(file: GlobalType.UploadFile) {
    console.log(file);

    let mdFileName: string;
    // 默认替换图片地址
    const imageReplaceUrl = this._envService.isDev
      ? 'https://cc/bb/'
      : 'https://autocode.icu/assets/markdown/';
    const dirName = file.originalname.replace(/\.(zip)$/gi, '');
    // 默认md根目录
    const mdPath = this._envService.isDev
      ? // 开发目录
        path.resolve(__dirname, '../../../', './static/markdown')
      : // 服务器目录
        '/home/assets/markdown';
    // 当前md的文件夹路径
    const readMdPath = path.resolve(mdPath, `./${dirName}`);
    // 解压至目标路径
    await compressing.zip.uncompress(file.buffer, mdPath);
    // 检查文件夹是否存在
    await fsP.access(readMdPath, fs.constants.F_OK);
    // 获取文件夹内容
    const dir = await fsP.opendir(readMdPath);
    for await (const dirent of dir) {
      const name = dirent.name;
      if (name.match(/\.md$/)) {
        // 获取md文件名称
        mdFileName = name;
        break;
      }
    }

    // 如果不存在md文件直接报错
    if (!mdFileName)
      return this._responseService.error({
        message: '至少包含个md文件啊！混蛋！',
        code: HttpStatus.BAD_REQUEST,
      });
    // 带转换的md
    const baseMdPath = path.join(readMdPath, `./${mdFileName}`);
    // 创建 md 读取流
    const readable = fs.createReadStream(baseMdPath);
    const targetMdPath = path.join(readMdPath, `./t-2.md`);
    try {
      await fsP.access(targetMdPath, fs.constants.F_OK);
      throw new Error(
        `目录存在重复请检查上传文件名称是否重复,path:${targetMdPath}`,
      );
    } catch (error) {
      if (error.syscall !== 'access') {
        return this._responseService.error({
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
          data: error.stack,
        });
      }
      // 需要目录不存在
      console.log('yes', error);
    }
    // 创建 md 写入流
    const writeable = fs.createWriteStream(targetMdPath);
    // 创建 md 转换流
    const imageUrlTransformPipe = new ImageUrlTransformPipe(imageReplaceUrl);
    // 写入成功 准备删除原md文件
    readable.pipe(imageUrlTransformPipe).pipe(writeable);
    await fsP.rm(baseMdPath);
    return 'success';
  }
}
