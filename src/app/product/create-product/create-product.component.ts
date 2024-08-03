import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductDto } from 'src/app/model/ProductDto';
import { ProductService } from 'src/app/service/product/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  productForm !: FormGroup;
  errores !: string [];
  productModel: ProductDto = new ProductDto('','',0,'',0, 0)




  constructor(private productService: ProductService, private frombuilder: FormBuilder, private router: Router) {
    this.productForm = this.createFormProduct();
  }

  createFormProduct() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      price: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
    });
  }


  saveProduct() {
    Object.assign(this.productModel,this.productForm.value);
    this.productService.saveProduct(this.productModel).subscribe(response => {
        Swal.fire('Producto registrado!', `Producto ${response.name} ha sido creado!`, 'success');
        this.router.navigate(['/products/list']);
      },
      err => {
        this.errores = err.error as string [];
        console.log("aqui",this.errores)
        console.error('codigo del error desde el backend: '+ err.status);
        Swal.fire('Producto NO registrado!', err.error.message, 'error');
      }
    );
  }



  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
  get type() { return this.productForm.get('type'); }
  get stock() {return this.productForm.get('stock')}

}
