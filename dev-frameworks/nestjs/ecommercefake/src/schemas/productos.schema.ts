import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductoDocument = Producto & Document;

@Schema()
export class Producto {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  thumbail: string;

  @Prop({ required: true })
  price: number;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
