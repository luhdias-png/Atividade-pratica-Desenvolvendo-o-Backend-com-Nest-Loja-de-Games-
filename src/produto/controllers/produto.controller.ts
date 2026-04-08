import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";


@Controller("/produto")
export class ProdutoController{

    constructor(private readonly produtoService: ProdutoService) { }

        @Get()
        @HttpCode(HttpStatus.OK)
        findAll(): Promise<Produto[]>{
            return this.produtoService.findAll();
        }
    
        @Get('/:id')
        findBy(@Param('id', ParseIntPipe)id: number){
            return this.produtoService.findById(id);
        }

        @Get('/nome/:nome')
        findByNome(@Param('nome') nome: string): Promise<Produto[]>{
            return this.produtoService.findByNome(nome);
        }

        @Post()
        create(@Body() produto: Produto): Promise<Produto>{
            return this.produtoService.create(produto);
        }
    
        @Put('/:id')
        async update(
            @Param('id', ParseIntPipe) id: number, @Body() produto: Produto
        ): Promise<{ message: string; produto: Produto }> {

            produto.id = id;

            return await this.produtoService.update(produto);
        }
    
        @Delete('/:id')
        @HttpCode(HttpStatus.OK)
        delete(@Param('id', ParseIntPipe)id: number){
            return this.produtoService.delete(id);
        }
}