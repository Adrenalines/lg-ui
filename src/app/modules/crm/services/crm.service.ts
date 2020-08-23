import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Lead, LeadById, LeadByIdResponse, LeadByIdWithIndex, LeadsResponse } from '../../../core/models/crm';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { CrmApiService } from './crm-api.service';



@Injectable({
  providedIn: 'root'
})
export class CrmService {
  public openLeadInfoSidebar: BehaviorSubject<LeadByIdWithIndex> = new BehaviorSubject(null);

  constructor(
    private translate: TranslateService,
    private errorHandlerService: ErrorHandlerService,
    private crmApiService: CrmApiService
  ) { }

  public getLeadList(filterParams): Observable<Lead[]> {
    return this.crmApiService.getLeadList(filterParams).pipe(
      map((response: LeadsResponse) => response.data),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public getLeadById(leadId: string): Observable<LeadById> {
    return this.crmApiService.getLeadById(leadId).pipe(
      map((response: LeadByIdResponse) => response.data),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public getStates() {
    return [
      {
        id: 'NEW',
        name: this.translate.instant('crm.page.card.status.new')
      },
      {
        id: 'INWORK',
        name: this.translate.instant('crm.page.card.status.onWork')
      },
      {
        id: 'INVALID',
        name: this.translate.instant('crm.page.card.status.bad')
      },
      {
        id: 'SUCCESS',
        name: this.translate.instant('crm.page.card.status.success')
      }
    ];
  }
}
