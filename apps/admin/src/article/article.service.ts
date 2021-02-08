import { HttpStatus, Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import fsP from 'fs/promises';
import { ResponseService } from '@app/lib/service/response.service';
import compressing from 'compressing';
import { GlobalType } from '@app/lib/interface';
import { ImageUrlTransformPipe } from '@app/lib/pipe/fs-markdown.pipe';

@Injectable()
export class ArticleService {
  constructor(private _responseService: ResponseService) {}
  async create(file: GlobalType.UploadFile) {
    console.log(file);

    let mdFileName: string;
    const dirName = file.originalname.replace(/\.(zip)$/gi, '');
    // 默认md根目录
    const mdPath = path.resolve(__dirname, '../../../', './static/markdown');
    // 当前md的文件夹路径
    const readMdPth = path.resolve(mdPath, `./${dirName}`);
    // 解压至目标路径
    await compressing.zip.uncompress(file.buffer, mdPath);
    // 检查文件夹是否存在
    await fsP.access(readMdPth, fs.constants.F_OK);
    // 获取文件夹内容
    const dir = await fsP.opendir(readMdPth);
    for await (const dirent of dir) {
      const name = dirent.name;
      if (name.match(/\.md$/)) {
        // 获取md文件名称
        mdFileName = name;
        break;
      }
    }

    // 如果不存在 直接保存
    if (!mdFileName)
      return this._responseService.error({
        message: '至少包含个md文件啊！混蛋！',
        code: HttpStatus.BAD_REQUEST,
      });
    // 创建 md 读取流
    const readable = fs.createReadStream(
      path.join(readMdPth, `./${mdFileName}`),
    );
    const targetMdPath = path.join(readMdPth, `./t-2.md`);
    try {
      await fsP.access(targetMdPath, fs.constants.F_OK);
      throw new Error(
        `目录存在重复请检查上传文件名称是否重复,path:${targetMdPath}`,
      );
    } catch (error) {
      // 需要目录不存在
      console.log(error);
      if (error.syscall !== 'access') {
        return this._responseService.error({
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
          data: error.stack,
        });
      }
    }
    // 创建 md 写入流
    const writeable = fs.createWriteStream(targetMdPath);
    // 创建 md 转换流
    const imageUrlTransformPipe = new ImageUrlTransformPipe('https://cc/bb/');
    readable.pipe(imageUrlTransformPipe).pipe(writeable);
  }
}
