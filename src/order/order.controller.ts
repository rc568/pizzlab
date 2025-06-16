import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: { username: string },
  ) {
    return this.orderService.create(createOrderDto, req.username);
  }
}
