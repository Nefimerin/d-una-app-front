import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderRequestDto } from 'src/app/model/OrderRequestDto';
import { OrderStatusEnum, OrderStatusMap } from 'src/app/model/OrderStatusEnum';
import { OrderService } from 'src/app/service/order/order.service';
import { ProductService } from 'src/app/service/product/product.service';
import { UserService } from 'src/app/service/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent {
  orderForm!: FormGroup;
  errores!: string[];
  allProducts: any[] = [];
  paginatedProducts: any[] = [];
  users: any[] = []; 
  orderModel: OrderRequestDto = new OrderRequestDto(0, 0, 0, OrderStatusEnum.RECEIVED, []);
  orderStatusList: { key: string, value: string }[] = []; 
  selectedProducts: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalProducts: number = 0;
  totalPages: number = 0;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.orderForm = this.createFormOrder();
    this.orderStatusList = Object.keys(OrderStatusEnum).map(key => ({ key, value: OrderStatusMap[key as keyof typeof OrderStatusEnum] }));
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadUsers();
    const orderId = +localStorage.getItem('orderId')!;
    this.orderService.getOrderById(orderId).subscribe(
      response => {
        const responseData = response;
        if (responseData) {
          this.orderForm.patchValue({
            totalPrice: responseData.totalPrice,
            userId: responseData.userId,
            status: responseData.status
          });
        }
      },
      error => {
        console.error('Error al obtener el producto:', error);
      }
    ); 
  }

  createFormOrder() {
    return this.formBuilder.group({
      totalPrice: [{ value: '', disabled: true }, [Validators.required, Validators.min(0.01)]],
      userId: ['', [Validators.required]],
      status: ['', [Validators.required]],
      productsIds: [[], [Validators.required]]
    });
  }

  loadProducts() {
    this.productService.findAll().subscribe(
      data => {
        this.allProducts = data;
        this.totalProducts = this.allProducts.length;
        this.totalPages = Math.ceil(this.totalProducts / this.pageSize); 
        this.paginateProducts(); 
      },
      err => {
        console.error('Error al cargar los productos', err);
        Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
      }
    );
  }

  loadUsers() {
    this.userService.findAllUsers().subscribe(
      users => {
        this.users = users;
      },
      err => {
        console.error('Error al cargar los usuarios', err);
        Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
      }
    );
  }

  toggleProductSelection(product: any) {
    const selectedIndex = this.selectedProducts.findIndex(p => p.productId === product.productId);
    if (selectedIndex > -1) {
      this.selectedProducts.splice(selectedIndex, 1);
    } else {
      this.selectedProducts.push(product);
    }
    this.orderForm.get('productsIds')?.setValue(this.selectedProducts.map(p => p.productId));
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    const totalPrice = this.selectedProducts.reduce((sum, product) => sum + product.price, 0);
    this.orderForm.get('totalPrice')?.setValue(totalPrice);
  }

  paginateProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = this.allProducts.slice(start, end);
  }

  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateProducts();
    }
  }

  saveOrder() {
    if (this.orderForm.valid) {
      Object.assign(this.orderModel, this.orderForm.value);
      this.orderModel.totalPrice = this.orderForm.get('totalPrice')?.value;
      const orderId = +localStorage.getItem('orderId')!;
      this.orderModel.orderId=orderId;
      this.orderService.updateOrder(this.orderModel).subscribe(
        response => {
          Swal.fire('Orden actualizada!', `La orden con ID ${response.orderId} ha sido actualizada.`, 'success');
          this.router.navigate(['order/list']);
        },
        error => {
          Swal.fire('Error', 'Hubo un problema al actualizar la orden.', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Por favor, complete todos los campos requeridos.', 'error');
    }
  }

  get totalPrice() { return this.orderForm.get('totalPrice'); }
  get userId() { return this.orderForm.get('userId'); }
  get status() { return this.orderForm.get('status'); }
  get productsIds() { return this.orderForm.get('productsIds'); }
}

