import { OrderStatusEnum } from "./OrderStatusEnum";

export class OrderRequestDto {
  orderId: number;
  totalPrice: number;
  userId: number;
  status: OrderStatusEnum;
  productsIds: number[];

  constructor(
    orderId: number,
    totalPrice: number = 0,
    userId: number = 0,
    status: OrderStatusEnum = OrderStatusEnum.RECEIVED,
    productsIds: number[] = []
  ) {
    this.orderId = orderId;
    this.totalPrice = totalPrice;
    this.userId = userId;
    this.status = status;
    this.productsIds = productsIds;
  }
}
