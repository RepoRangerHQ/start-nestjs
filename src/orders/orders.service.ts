import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const product = await this.productsService.findOne(
      createOrderDto.productId,
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const result = new this.orderModel(createOrderDto);
    return result.save();
  }

  async findOne(id: string): Promise<Order> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`Invalid order ID format: ${id}`);
    }
    const order = await this.orderModel
      .findById(id)
      .populate('productId')
      .exec();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
