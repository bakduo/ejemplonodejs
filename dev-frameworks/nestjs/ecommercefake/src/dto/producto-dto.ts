import { ApiProperty } from '@nestjs/swagger';

export class ProductoDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly thumbail: string;
  @ApiProperty()
  readonly price: number;
}
