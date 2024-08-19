import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderResponseDto } from 'src/app/model/OrderResponseDto'; // Asegúrate de que la ruta sea correcta
import { OrderService } from 'src/app/service/order/order.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  @Input('orders') orders!: OrderResponseDto[];
  errors: string[] = [];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (response) => {
        this.orders = response;
      },
      err => {
        this.errors = err.error;
        console.error('Error al cargar órdenes:', this.errors);
      }
    );
  }

  editOrder(order: OrderResponseDto) {
    localStorage.setItem("orderId", order.orderId.toString());
    this.router.navigate(["orders/details"]);
  }

  deleteOrder(order: OrderResponseDto) {
    swal.fire({
      title: 'Eliminar',
      text: '¿Estás seguro de que deseas eliminar esta orden?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.orderService.deleteOrder(order.orderId).subscribe(response => {
          if (response.status === 200) {
            this.orders = this.orders.filter(o => o !== order);
            swal.fire('Eliminado', 'La orden ha sido eliminada.', 'success');
          } else {
            swal.fire('Cancelado', 'No se eliminó la orden.', 'error');
          }
        }, err => {
          swal.fire('Error', 'Ocurrió un error al eliminar la orden.', 'error');
          console.error('Error al eliminar orden:', err);
        });
      } else {
        swal.fire('Cancelado', 'No se eliminó la orden.', 'error');
      }
    });
  }
}
