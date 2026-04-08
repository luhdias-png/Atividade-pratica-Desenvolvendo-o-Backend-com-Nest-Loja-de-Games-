import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { ILike, Repository } from "typeorm";


@Injectable()
export class ProdutoService{
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    )  { }

    async findAll(): Promise<Produto[]> {
        if(await this.produtoRepository.count() ===0){
            throw new NotFoundException("Lista de produtos esta vazia")
        };

        return await this.produtoRepository.find({
            relations:{
                categoria:true
            }
        });
    }

    async findById(id: number): Promise<Produto>{
        const produto = await this.produtoRepository.findOne({
            where: { id },
            relations:{
                categoria:true
            }
        });

        if (!produto){
            throw new HttpException("O produto nao foi encontrado", HttpStatus.NOT_FOUND)
        }
        return produto;
    }

    async findByNome(nome: string): Promise<Produto[]> {
        const name = await this.produtoRepository.find({ where:{nome: ILike(`%${nome}%`)},
    relations:{ categoria:true} });

        if(name.length === 0){
            throw new NotFoundException(`${nome} nao foi encotrado em produtos`)
        }
        return name;
    }

    // async findByNome(nome: string): Promise<Produto[]>{
    //     return await this.produtoRepository.find({
    //         where: {
    //             nome: ILike(`%${}%`)
    //         }
    //     })
    // }

    async create(Produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(Produto);
    }

async update(produto: Produto): Promise<{ 
    message: string; 
    produto: Produto 
}> {
    if (!produto.id) {
        throw new BadRequestException("O id é obrigatório para atualizar.");
    }

    await this.findById(produto.id); 

    const produtoAtualizado = await this.produtoRepository.save(produto);

    return {
        message: `Produto com ID ${produto.id} foi atualizado com sucesso.`,
        produto: produtoAtualizado
    };
}

    async delete(id: number): Promise<{ message: string }> {
        await this.findById(id); 

        await this.produtoRepository.delete(id);

        return {
            message: `O produto com ID ${id} foi deletado com sucesso.`
        };
    }
}