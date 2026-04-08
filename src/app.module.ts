import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [TypeOrmModule.forRoot({ // configuracao do banco de dados.
      type: 'mysql', // tipo do banco de dados
      host: 'localhost', // aqui é host da banco de dados
      port: 3306, // a porta do banco de dados
      username: 'root', // senha do banco de dados
      password: '110294', // senha do banco de dados
      database: 'db_lojagames',
      entities: [Categoria, Produto],
      synchronize: true,
    }),
      CategoriaModule,
      ProdutoModule      
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
