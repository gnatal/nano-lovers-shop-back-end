import { Length } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  @Length(4, 50)
  name: string

  @Column()
  description: string

  @Column()
  price: number

  @Column()
  @Length(4, 100)
  main_image: string

  @Column('boolean', { default: true })
  available: boolean

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date
}
