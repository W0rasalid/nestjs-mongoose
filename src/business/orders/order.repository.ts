import { Injectable } from '@nestjs/common';
import { IOrderRepository } from './interfaces/repository/order.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schemas';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>, // Use the correct type for Mongoose model
  ) {}

  async findAll(): Promise<OrderDocument[]> {
    return this.orderModel.find().exec();
  }

  async findById(id: string): Promise<OrderDocument | null> {
    return this.orderModel.findById(id).exec();
  }

  async findByAuthorId(author: Types.ObjectId): Promise<OrderDocument[]> {
    return this.orderModel.find({ author }).exec();
  }

  async findAllOrderWithAuthor(): Promise<OrderDocument[]> {
    return this.orderModel
      .find()
      .populate('author') // <-- ใช้ .populate() ตรงนี้!
      .exec();
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    return new this.orderModel(createOrderDto).save();
  }
}
