import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";


@Controller("/categoria")
export class CategoriaController{
    constructor(private readonly categoriaService: CategoriaService ) { }


    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]>{
        return this.categoriaService.findAll();
    }

    @Get('/:id')
    findBy(@Param('id', ParseIntPipe)id: number){
        return this.categoriaService.findById(id);
    }

    @Post()
    create(@Body() categoria: Categoria): Promise<Categoria>{
        return this.categoriaService.create(categoria);
    }

    @Put('/:id')
    async update(
        @Param('id', ParseIntPipe) id: number, @Body() categoria: Categoria
    ): Promise<{ message: string; categoria: Categoria }> {

        categoria.id = id;

        return await this.categoriaService.update(categoria);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id', ParseIntPipe)id: number){
        return this.categoriaService.delete(id);
    }

}