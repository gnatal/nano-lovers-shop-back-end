import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Order } from './Order'
import { Service } from './Service'
import { Product } from './Product'

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date

  //   @ManyToOne(() => Product)
  //   product: Order

  //   @ManyToOne(() => Service)
  //   service: Service

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order
}
