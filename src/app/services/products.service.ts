import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Product, UpdateProductDTO } from '../models/product.model';
import { catchError, map, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from './../enviroments/environment';
import { checkTime } from '../interceptors/time.interceptor';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api/v1`;

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit) {
      params = params.set('limit', limit);
      // params = params.set('offset', offset);
    }
    console.log(this.apiUrl);

    return this.http
      .get<Product[]>(`${this.apiUrl}/products`, {
        params,
        context: checkTime(),
      })
      .pipe(
        retry(2),
        map((products) =>
          products.map((item) => {
            return {
              ...item,
              taxes: 0.19 * item.price,
            };
          })
        )
      );
  }
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas autorizado');
        }
        return throwError('Ups');
      })
    );
  }
  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params: { limit },
    });
  }

  create(dto: UpdateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }

  getByCategory(categoryId: string, limit: number, offset: number) {
    let params = new HttpParams();
    if (limit) {
      params = params.set('limit', limit);
      //params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(
      `${this.apiUrl}/categories/${categoryId}/products`,
      {
        params,
      }
    );
  }
}
