import { IndexCommentDTO } from '@app/lib/dto/comment/index.dto';
import { UpdatePartCommentDTO } from '@app/lib/dto/comment/update.dto';
import { CommentEntity } from '@app/lib/entity/comment.entity';
import { PaginationService } from '@app/lib/service/pagination/pagination.service';
import { ResponseService } from '@app/lib/service/response.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { retry } from 'rxjs/operators';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    private _response: ResponseService,
    @InjectRepository(CommentEntity)
    private _repository: Repository<CommentEntity>,
    private _pagination: PaginationService,
  ) {}
  async index({ page, pageSize }: IndexCommentDTO.Admin) {
    const data = await this._pagination.pagination({
      queryBuilder: this._repository
        .createQueryBuilder('comment')
        .select([
          'comment.commentId',
          'comment.os',
          'comment.browser',
          'comment.content',
          'comment.createdAt',
          'user.name',
          'user.userId',
          'article.title',
          'article.articleId',
          'comment.status',
        ])
        .innerJoin('comment.user', 'user')
        .innerJoin('comment.article', 'article')
        .orderBy('comment.createdAt', 'DESC'),
      pageSize,
      page,
    });
    return this._response.success({
      data,
    });
  }
  async updatePart(body: UpdatePartCommentDTO) {
    await this._repository.save(body);
    return this._response.success({
      message: '更新成功！',
    });
  }
}
