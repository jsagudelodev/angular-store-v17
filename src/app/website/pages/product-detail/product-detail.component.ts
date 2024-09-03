import { ProductsService } from '../../../services/products.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          console.log('producto:' + this.productId);
          if (this.productId) {
            return this.productsService.getProduct(this.productId);
          }
          return [];
        })
      )
      .subscribe((data) => {
        this.product = data;
      });
  }
  goToBack() {
    this.location.back();
  }
}
