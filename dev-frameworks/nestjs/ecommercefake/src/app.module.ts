import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosModule } from './productos/productos.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(
      `${process.env.DBTYPE_DB_CONNECTOR}://${process.env.DBTYPE_DB_USER}:${process.env.DBTYPE_DB_PASSWD}@${process.env.DBTYPE_DB_HOST}:${process.env.DBTYPE_DB_PORT}/${process.env.DBTYPE_DB_DBNAME}?ssl=true`,
    ),
    ProductosModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
