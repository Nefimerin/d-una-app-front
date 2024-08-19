import { OrderStatusEnum } from "./OrderStatusEnum";
import { ProductDto } from "./ProductDto";
import { UserResponseDto } from "./UserResponseDto";

export class OrderResponseDto {
  orderId: number;
  totalPrice: number;
  userId: number;
  products: ProductDto[];
  user: UserResponseDto;
  status: OrderStatusEnum;

  constructor(
    orderId: number = 0,
    totalPrice: number = 0,
    userId: number = 0,
    products: ProductDto[] = [],
    user: UserResponseDto = new UserResponseDto(0, '', '', [], '', ''),
    status: OrderStatusEnum
  ) {
    this.orderId = orderId;
    this.totalPrice = totalPrice;
    this.userId = userId;
    this.products = products;
    this.user = user;
    this.status = status;
  }
}
