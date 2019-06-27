import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../../../entities/product';
import { Provider } from '../../../entities/provider';
import { Purchase } from '../../../entities/purchase';
import { PurchaseService } from '../../../services/purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['../../../shared/dialogs/dialogs.scss',
    './purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  public code: number;
  public product: Product;
  private provider: Provider;

  constructor(
    public translate: TranslateService,
    private purchaseService: PurchaseService,
    public dialogRef: MatDialogRef<PurchaseComponent>) { }

  public ngOnInit() {
  }

  public async setCode() {
    try {
      const params = new Purchase();
      params.customerId = this.code;
      params.product = this.product;
      params.provider = this.provider;
      await this.purchaseService.addPurchase(params);
      this.dialogRef.close();
    } catch(e) {
      console.log(e);
    }
  }

  public close() {
    this.dialogRef.close();
  }

}
