import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all orders',
    description: 'Retrieves a list of all orders in the system.',
  })
  async findAll() {
    return this.ordersService.findAllOrders();
  }

  @Get('/with-users')
  @ApiOperation({
    summary: 'Get all orders With User',
    description: 'Retrieves a list of all orders in the system.',
  })
  async findAllWithUsers() {
    return this.ordersService.findAllOrdersWithUsers();
  }
}
