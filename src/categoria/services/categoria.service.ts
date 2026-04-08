import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";



@Injectable()
export class CategoriaService{

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ){ }

    async findAll(): Promise<Categoria[]> {
        if(await this.categoriaRepository.count() ===0){
            throw new NotFoundException("Lista da categoria esta vazia")
        };

        return await this.categoriaRepository.find({
            relations:{
                produto:true
            }
        });
    }

    async findById(id: number): Promise<Categoria>{
        const categoria = await this.categoriaRepository.findOne({
            where: { id },
            relations:{
                produto:true
            }
        });

        if (!categoria){
            throw new HttpException("A categoria do game nao foi encontrada", HttpStatus.NOT_FOUND)
        }
        return categoria;
    }

    async findByNome(nome: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where:{nome: ILike(`%${nome}%`)},
            relations:{
                produto:true
            }
        });
    }

    async create(Categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(Categoria);
    }

    async update(categoria: Categoria): Promise<{ 
        message: string; 
        categoria: Categoria 
    }> {
        if (!categoria.id) {
            throw new BadRequestException("O id é obrigatório para atualizar.");
        }

        await this.findById(categoria.id);

        const categoriaAtualizada = await this.categoriaRepository.save(categoria);

        return {
            message: `Categoria com ID ${categoria.id} foi atualizada com sucesso.`,
            categoria: categoriaAtualizada 
        };
    }

    async delete(id: number): Promise<{ message: string }> {
        await this.findById(id);                    // já valida se existe

        await this.categoriaRepository.delete(id);

        return {
            message: `Categoria com ID ${id} foi deletada com sucesso.`
        };
    }
}