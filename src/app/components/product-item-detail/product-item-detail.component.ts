import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { CartProduct } from '../../models/CartProduct';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  product: Product | undefined;
  selectedOption = '1';

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct().subscribe(res => {
      this.product = res.find(product => product.id === id);
    });
  }

  onSubmit(product: Product): void {
    if (product) {
      const cartProduct: CartProduct = { ...product, option: this.selectedOption };
      this.productService.addToCart([cartProduct]); // Assuming addToCart accepts an array
      alert(`Added ${product.name} to cart with quantity: ${this.selectedOption}`);
    }
  }
}
