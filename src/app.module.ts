import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { FavorisModule } from './favoris/favoris.module';
import { RoleModule } from './role/role.module';
import { RatingModule } from './rating/rating.module';
import { ProductsModule } from './products/products.module';
import { PanierModule } from './panier/panier.module';
import { MailToModule } from './mail-to/mail-to.module';
import { CommandesModule } from './commandes/commandes.module';
// import * as dotenv from 'dotenv';
import { User } from './users/entities/user.entity';
import { MailTo } from './mail-to/entities/mail-to.entity';
import { Product } from './products/entities/product.entity';
import { Favoris } from './favoris/entities/favoris.entity';
import { Panier } from './panier/entities/panier.entity';
import { Role } from './role/entities/role.entity';
import { Rating } from './rating/entities/rating.entity';
import { Commande } from './commandes/entities/commande.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';

// dotenv.config({ path: '.env' });
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        MailTo,
        Product,
        Favoris,
        Panier,
        Role,
        Rating,
        Commande,
        Category,
      ],
      synchronize: process.env.MODE === 'DEV' ? true : false,
      logging: false,
    }),
    UsersModule,
    FavorisModule,
    RoleModule,
    RatingModule,
    ProductsModule,
    PanierModule,
    MailToModule,
    CommandesModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
