import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDto } from 'src/app/model/ProductDto';
import { ProductService } from 'src/app/service/product/product.service';

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

}
