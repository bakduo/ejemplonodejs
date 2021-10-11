import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Producto, ProductoDocument } from 'src/schemas/productos.schema';
import { ProductoDto } from 'src/dto/producto-dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name) private readonly model: Model<ProductoDocument>,
  ) {}

  async findAll(): Promise<Producto[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Producto> {
    return await this.model.findById(id).exec();
  }

  async create(createProductoDto: ProductoDto): Promise<Producto> {
    return await new this.model({
      ...createProductoDto,
    }).save();
  }

  async update(id: string, updateProductoDto: ProductoDto): Promise<Producto> {
    return await this.model.findByIdAndUpdate(id, updateProductoDto).exec();
  }

  async delete(id: string): Promise<Producto> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
