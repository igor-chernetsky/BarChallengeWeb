import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PurchaseService } from '../../services/purchase.service';
import { Purchase } from '../../entities/purchase';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public purchases: Purchase[] = [];

  constructor(
    private authService: AuthService,
    private purchaseService: PurchaseService) { }

  public async ngOnInit() {
    const client = this.authService.getCurrentUser();
    this.purchases = await this.purchaseService.getClientPurchases(client.id);
  }

}
