import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductDto } from 'src/app/model/ProductDto';
import { ProductService } from 'src/app/service/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  productForm !: FormGroup;
  errores !: string [];
  productModel: ProductDto = new ProductDto('','',0,'',0, 0)



  constructor(private productService: ProductService, private frombuilder: FormBuilder, private router: Router) {
    this.productForm = this.createFormProduct();
  }

  ngOnInit(): void {
    const productId = +localStorage.getItem('productId')!;
    this.productService.findProductById(productId).subscribe(
      response => {
        const responseData = response;
        if (responseData) {
          this.productForm.patchValue({
            productId: responseData.productId,
            name: responseData.name,
            description: responseData.description,
            price: responseData.price,
            type: responseData.type,
            stock: responseData.stock
          });
        }
      },
      error => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }


  createFormProduct() {
    return new FormGroup({
      productId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      price: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
    });
  }


  saveProduct() {
    Object.assign(this.productModel,this.productForm.value);
    this.productService.updateProduct(this.productModel).subscribe(response => {
        Swal.fire('Producto actualizado!', `Producto ${response.name} ha sido creado!`, 'success');
        this.router.navigate(['/products/list']);
      },
      err => {
        this.errores = err.error as string [];
        Swal.fire('Producto NO actualizado!', err.error.message, 'error');
      }
    );
  }


  get productId() { return this.productForm.get('productId'); }
  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
  get type() { return this.productForm.get('type'); }
  get stock() {return this.productForm.get('stock')}


}
