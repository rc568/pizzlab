import { Repository } from 'typeorm';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(
    { product_code, quantity }: CreateOrderDto,
    user: string,
  ): Promise<Order> {
    const product = await this.productsRepository.findOne({
      where: { code: product_code },
    });

    if (!product) {
      throw new NotFoundException(`El producto ${product_code} no existe.`);
    }

    if (!product.status) {
      throw new NotAcceptableException(
        `El producto ${product_code} no está disponible.`,
      );
    }

    const orderData = this.orderRepository.create({
      quantity,
      mount: product.price * quantity,
      created_user: user,
      product: product,
    });

    return await this.orderRepository.save(orderData);
  }
}
