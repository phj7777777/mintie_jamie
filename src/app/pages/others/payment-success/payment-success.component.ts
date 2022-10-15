import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'molla-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private cartService: CartService,) { }

  ngOnInit(): void {
    this.cartService.clearStore()
  }

}
