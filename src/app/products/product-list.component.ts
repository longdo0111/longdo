import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription

    private _listFilter: string = '';
    get listFilter(): string {  
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter: ' + value);
        this.filteredProducts = this.perfommFilter(value);
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];
    private _productService: ProductService;

    constructor(private ProductService: ProductService) {
        this._productService = ProductService;
    }

    perfommFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        // this.products = this._productService.getProducts();
        this.sub = this.ProductService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
        this.filteredProducts = this.products;
    }

    ngOnDestroy(): void{
        this.sub.unsubscribe();
    }

    onNotify(message: string): void {
        this.pageTitle = 'Product List ' + message;
    }
}