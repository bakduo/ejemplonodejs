import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Producto, ProductoSchema } from 'src/schemas/productos.schema';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Producto.name, schema: ProductoSchema },
    ]),
  ],
})
export class ProductosModule {}
