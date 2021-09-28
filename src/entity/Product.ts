import { Length } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  @Length(4, 50)
  name: string

  @Column()
  description: string

  @Column()
  @Length(4, 100)
  main_image: string

  @Column()
  stock: number

  @Column()
  price: number

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date
}
