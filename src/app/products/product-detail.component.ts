import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product detail component';
  product: IProduct | undefined;
  messageError: string = '';
  sub: Subscription | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {   }

  ngOnInit(): void {
    const id = Number( this.route.snapshot.paramMap.get('id'));
    if(id) {
      this.sub = this.getProduct(id);
    }
  }

  getProduct(id: Number) {
    return this.productService.getProductById(id).subscribe({
      next: product => {
        console.log("this product: " + JSON.stringify(product));
        this.product = product;
      },
      error: err => this.messageError = err 
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
