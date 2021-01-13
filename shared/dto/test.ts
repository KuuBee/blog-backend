import { ApiProperty } from '@nestjs/swagger';

export class TestDto {
  @ApiProperty({
    name: '姓名',
    example: '我是谁',
  })
  name: string;
  @ApiProperty({
    name: '年龄',
    example: 11,
  })
  age: number;
}
