import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartProduct } from '../../models/CartProduct';
import {productCount} from "../../models/Product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  totalPrice: number = 0;

  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.loadCartProducts();
  }

  loadCartProducts(): void {
    this.cartProducts = this.productService.getCartProduct();
    this.calculateTotalPrice();
  }

  selectChange(id: number, event: Event): void {
    const element = event.target as HTMLSelectElement;
    const selectedOption = element.value;
    const productIndex = this.cartProducts.findIndex(cart => cart.id === id);

    if (productIndex !== -1) {
      this.cartProducts[productIndex].option = String(Number(selectedOption));
      this.updateCart();
    }
  }

  removeCart(id: number): void {
    this.cartProducts = this.cartProducts.filter(cart => cart.id !== id);
    this.updateCart();
  }

  updateCart(): void {
    this.productService.addToCart(this.cartProducts);
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartProducts.reduce((acc, val) => acc + (Number(val.price) * Number(val.option)), 0);
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
  }

  checkoutSuccess(firstName: string): void {
    this.productService.clearCart();
    this.route.navigateByUrl(`/success/${firstName}/${this.totalPrice}`).then(r => console.log(r));
  }

  protected readonly productCount = productCount;
}
