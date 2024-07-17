
export class ProductDto{
  productId: number;
  name:string;
  description:string;
  price:number;
  type:string;
  stock:number;


  constructor(
    name: string,
    description: string,
    price: number,
    type: string,
    stock:number,
    productId: number

) {
    this.price = price;
    this.name = name;
    this.description = description;
    this.type = type;
    this.stock = stock;
    this.productId = productId;
}
}