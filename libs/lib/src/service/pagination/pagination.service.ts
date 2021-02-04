import { GlobalType } from '@app/lib/interface';
import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

export interface PaginationResponse {
  data: GlobalType.StrKeyObj[];
  pagination: Pagination;
}
export interface Pagination {
  count: number;
  currentPage: number;
  perPage: number;
  total: number;
  totalPages: number;
}

@Injectable()
export class PaginationService {
  // 返回分页好的数据
  async pagination<Entity>({
    queryBuilder,
    page = 0,
    pageSize = 5,
  }: {
    queryBuilder: SelectQueryBuilder<Entity>;
    page: number | string;
    pageSize: number | string;
  }): Promise<PaginationResponse> {
    page = typeof page === 'number' ? page : parseInt(page);
    pageSize = typeof pageSize === 'number' ? pageSize : parseInt(pageSize);
    const data = await queryBuilder
      .skip(page * pageSize)
      .take(pageSize)
      .getMany();
    const total = await queryBuilder.getCount();
    const totalPages = Math.ceil(total / pageSize);
    return {
      data,
      pagination: {
        count: data.length,
        currentPage: page,
        perPage: pageSize,
        total,
        totalPages,
      },
    };
  }
  // 返回分页好的 QueryBuilder
  paginationQueryBuilder<Entity>({
    queryBuilder,
    page = 0,
    pageSize,
  }: {
    queryBuilder: SelectQueryBuilder<Entity>;
    page: number | string;
    pageSize: number | string;
  }): SelectQueryBuilder<Entity> {
    page = typeof page === 'number' ? page : parseInt(page);
    pageSize = typeof pageSize === 'number' ? pageSize : parseInt(pageSize);
    return queryBuilder.skip(page * pageSize).take(pageSize);
  }
}
