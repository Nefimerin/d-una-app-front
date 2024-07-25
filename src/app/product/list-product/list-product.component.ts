import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDto } from 'src/app/model/ProductDto';
import { ProductService } from 'src/app/service/product/product.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {

  constructor(private productService: ProductService, private router: Router) {

  }
  @Input('products') products!:ProductDto[];
  errors: string[] = [];

  ngOnInit(): void {
    this.productService.findAll().subscribe((response) => {
      this.products = response;
    })
  }

  editProduct(product: ProductDto) {
    localStorage.setItem("productId", product.productId.toString());
    this.router.navigate(["products/details"]);
  }
  
  deleteProduct(product: ProductDto) {
    swal.fire({
      title: 'Eliminar',
      text: '¿Estás seguro de que deseas eliminar este estudiante?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.productService.removeProduct(product.productId)
          .subscribe(response => {
            console.log(response.status)
            if (response.status === 200) {
              this.products = this.products.filter(s => s !== product);
              swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
            } else {
              swal.fire('Cancelado', 'No se eliminó el producto.', 'error');
            }
          })
      } else {
        swal.fire('Cancelado', 'No se eliminó el producto.', 'error');
      }
    });
  }

}
