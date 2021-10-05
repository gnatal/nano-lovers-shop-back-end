import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'

import { OrderItem } from './OrderItem'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem
}
