import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import fsP from 'fs/promises';
import fs from 'fs';
import { SelectParagraphPipe } from '@app/lib/pipe/select-paragraph.pipe';

@Injectable()
export class AdminService {
  async getHello(): Promise<string> {
    // const res = execSync('pwd', {
    //   encoding: 'utf-8',
    // });
    // return res;

    return 'Hello World!';
    const rs = fs.createReadStream(
      '/Users/kuubee/Desktop/self_porject/node/blog/static/markdown/1613706204968/index.md',
    );
    const spp = new SelectParagraphPipe();
    await new Promise((reslove, reject) => {
      rs.pipe(spp);
      rs.on('close', () => {
        console.log('完成了');
        console.log('spp.firstParagraph', spp.firstParagraph);
        reslove(null);
      });
      rs.on('error', (err) => {
        reject(err);
      });
    });
    // return res.toString('utf-8');
    return spp.firstParagraph;
  }
}
