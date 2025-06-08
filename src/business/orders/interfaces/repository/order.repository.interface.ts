import { Types } from 'mongoose';
import { CreateOrderDto } from '../../dto/create-order.dto';
import { OrderDocument } from '../../schemas/order.schemas';

export interface IOrderRepository {
  findAll(): Promise<OrderDocument[]>;
  findById(id: string): Promise<OrderDocument | null>;
  findByAuthorId(userId: Types.ObjectId): Promise<OrderDocument[]>;
  createOrder(createOrderDto: CreateOrderDto): Promise<OrderDocument>;
}
