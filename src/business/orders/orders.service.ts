import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository, // Use the correct interface for the repository
  ) {}

  async findAllOrders() {
    const data = await this.orderRepository.findAll();
    return data;
  }

  async findAllOrdersWithUsers() {
    const data = await this.orderRepository.findAllOrderWithAuthor();
    return data;
  }
}
