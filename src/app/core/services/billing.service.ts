import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentModalComponent } from '../components/payment-modal/payment-modal.component';
import { TariffPlan, TariffPlansResponse } from '../models/tariffPlans';
import { CoreApiService } from './core-api.service';


@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(
    private modalService: NgbModal,
    private coreApiService: CoreApiService
  ) { }

  public checkTariffPlans(siteId, title, subscription, siteName, expTime) {
    this.getTariffPlans().subscribe((response: TariffPlan[]) => {
      if (response.length) {
        const inputs = {
          plans: response,
          siteId: siteId,
          siteName: siteName,
          title: title,
          subscription: subscription,
          expTime: expTime
        };
        this.showTariffPlansModal(inputs);
      } else {
        toastr["error"]($translate.instant("billing.notify.noPlans"), "");
      }
    });
  }

  private getTariffPlans(): Observable<TariffPlan[]> {
    return this.coreApiService.getTariffPlans().pipe(
      map((response: TariffPlansResponse) => response.data)
    );
  }

  private showTariffPlansModal(inputs) {
    const modalRef = this.modalService.open(PaymentModalComponent);
    modalRef.componentInstance.inputs = inputs;
  }
}
