import { Component, OnInit } from '@angular/core';
import { Product, productCount } from '../../models/Product';
import { CartProduct } from '../../models/CartProduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productCount: string[] = productCount;
  productSelections: { [productId: number]: string } = {};

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProduct().subscribe(res => {
      this.products = res.map(product => ({
        ...product,
        selectedOption: '1' // Initialize each product's selected option
      }));
    });
  }

  onSubmit(product: Product): void {
    const selectedOption = this.productSelections[product.id] || '1'; // Default to '1' if not set
    const cartProduct: CartProduct = {
      ...product,
      option: selectedOption
    };

    // Pass cartProduct as an array element
    this.productService.addToCart([cartProduct]);
    alert(`Added ${product.name} to cart with quantity: ${selectedOption}`);
  }


}
