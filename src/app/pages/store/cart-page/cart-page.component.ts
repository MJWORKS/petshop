import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartUtil } from '../../../utils/cart.util';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit {
  public cart = new Cart();

  constructor() {}

  ngOnInit(): void {
    this.loadCart();
  }

  public total() {
    let total = 0;
    this.cart.items.forEach((item) => {
      total += (item.price * item.quantity);
    });
    return total;
  }

  public loadCart(): void {
    this.cart = CartUtil.get();
  }

  public remove(item: any): void {
    let index = this.cart.items.indexOf(item);
    this.cart.items.splice(index, 1);
    CartUtil.update(this.cart);
  }

  public clear(): void {
    CartUtil.clear();
    this.loadCart();
  }
}
