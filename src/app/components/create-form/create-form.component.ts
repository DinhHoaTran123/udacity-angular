import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  @Output() checkoutSuccess = new EventEmitter<string>();

  firstName = '';
  address = '';
  creditCard = '';

  ngOnInit(): void { }

  onSubmit(): void {
    this.checkoutSuccess.emit(this.firstName);
  }
  isValidCardNumber(cardNumber: string): boolean {
    return /^\d{16}$/.test(cardNumber);
  }
}
