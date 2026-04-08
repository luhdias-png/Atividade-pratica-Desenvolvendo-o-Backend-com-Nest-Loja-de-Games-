import { IsInt, IsNotEmpty, Min } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";


@Entity({name: 'tb_produto'})
export class Produto {
    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column({length:255, nullable: false})
    nome!: string;

    @IsNotEmpty()
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    valor!:number
    
    @IsInt()
    @Min(0)
    @Column({type: 'int', nullable: false})
    quantidade!:number


    @ManyToOne(() => Categoria, (categoria) => Categoria.produto, {
        onDelete: 'CASCADE',
    })
    categoria!: Categoria
}