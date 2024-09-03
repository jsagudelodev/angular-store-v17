import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from '../../../services/products.service';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from 'src/app/models/product.model';
import { StoreService } from '../../../services/store.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  @Input() products: Product[] = [];
  @Output() loadMore = new EventEmitter();
  //@Input() productId: string | null = null;
  @Input()
  set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id);
    }
  }
  myShoppingCart: Product[] = [];
  total = 0;
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private productsService: ProductsService,
    private storeService: StoreService
  ) {}

  onAddToShoppingCart(product: Product) {
    //console.log('Emitido' + product);
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }
  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }

    this.productsService.getProduct(id).subscribe(
      (data) => {
        //this.toggleProductDetail();
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      (response) => {
        this.statusDetail = 'error';
        console.log(response.error.message);
      }
    );
  }

  readAndUpdate(id: string) {
    this.productsService
      .getProduct(id)
      .pipe(
        switchMap((product) =>
          this.productsService.update(product.id, { title: 'change' })
        )
      )

      .subscribe((data) => {
        console.log(data);
      });
  }
  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'test product',
      price: 13.5,
      description: 'lorem ipsum set',
      images: ['https://i.pravatar.cc'],
      categoryId: 5,
    };
    this.productsService.create(product).subscribe((data) => {
      this.products.unshift(data);
      console.log('se creo ' + JSON.stringify(data));
    });
  }
  updateProduct() {
    if (this.productChosen) {
      const changes: UpdateProductDTO = {
        title: 'change title',
      };
      const id = this.productChosen?.id;
      this.productsService.update(id, changes).subscribe((data) => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products[productIndex] = data;
        this.productChosen = data;
      });
    }
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }
  //loadMore() {
  // this.productsService
  //  .getProductsByPage(this.limit, this.offset)
  //  .subscribe((data) => {
  //     this.products.concat(data);
  //     this.offset += this.limit;
  //   });
  //}

  onLoadMore() {
    this.loadMore.emit();
  }
}
