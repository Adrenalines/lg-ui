import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  CompanyRequest,
  CompanyResponse,
  CompanyShort,
  Entities,
  SmartPoint,
  SmartPointEnableRequest,
  SmartPointUpdateRequest,
  WidgetChangeCompanyRequest,
  WidgetConversion,
  WidgetConversionResponse, WidgetInfo,
  WidgetRename,
  WidgetsResponse,
  WidgetTemplate,
  WidgetTemplatesResponse,
  WidgetType,
  WidgetTypesResponse
} from '../../../core/models/widgets';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { WidgetApiService } from './widget-api.service';
import { ApiResponse } from '../../../core/models/api';


@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  public updateWidgetsList = new Subject<string>();
  public openCloneWidgetModal = new Subject<{data: WidgetInfo; containerId: string}>();

  private currentCompanies;
  private currentContainers;

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private widgetApiService: WidgetApiService
  ) {
  }

  public getWidgetsList(siteId: string): Observable<Entities> {
    return this.widgetApiService.getWidgetsList(siteId).pipe(
      map((response: WidgetsResponse) => response.data),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public getWidgetsTypes(): Observable<WidgetType[]> {
    return this.widgetApiService.getWidgetsTypes().pipe(
      map((response: WidgetTypesResponse) => response.data),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public getWidgetsTemplates(): Observable<WidgetTemplate[]> {
    return this.widgetApiService.getWidgetsTemplates().pipe(
      map((response: WidgetTemplatesResponse) => response.data),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public getWidgetConversion(siteId: string, widgetId: string): Observable<WidgetConversion> {
    return this.widgetApiService.getWidgetConversion(siteId, widgetId).pipe(
      map((response: WidgetConversionResponse) => response.data),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public deleteWidget(siteId: string, widgetId: string): Observable<boolean> {
    return this.widgetApiService.deleteWidget(siteId, widgetId).pipe(
      map((response: ApiResponse) => response.success),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public switch(siteId: string, widgetId: string, active: boolean): Observable<boolean> {
    const action = active ? 'start' : 'stop';
    return this.widgetApiService.switch(siteId, widgetId, action).pipe(
      map((response: ApiResponse) => response.success),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public rename(siteId: string, widgetId: string, name: string): Observable<boolean> {
    const renamedCWidget: WidgetRename = { name };
    return this.widgetApiService.rename(siteId, widgetId, renamedCWidget).pipe(
      map((response: ApiResponse) => response.success),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public changeWidgetCompany(siteId: string, widgetId: string, companyId: string): Observable<boolean> {
    const changedCompanyWidget: WidgetChangeCompanyRequest = { companyId };
    return this.widgetApiService.changeWidgetCompany(siteId, widgetId, changedCompanyWidget).pipe(
      map((response: ApiResponse) => response.success),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public swap(siteId: string, widgetId1: string, widgetId2: string): Observable<boolean> {
    const widgetSwap = { widgetId1, widgetId2 };
    return this.widgetApiService.swap(siteId, widgetSwap).pipe(
      map((response: ApiResponse) => response.success),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public saveSmartpointType(siteId, smartpoint: SmartPoint): Observable<boolean> {
    const updatedSmartpoint: SmartPointUpdateRequest = {
      enabled: smartpoint.enabled,
      autoinvite: smartpoint.autoinvite,
      pos: smartpoint.pos
    };
    return this.widgetApiService.putSmartpointType(siteId, smartpoint.type, updatedSmartpoint).pipe(
      map((response: ApiResponse) => response.success),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public startStopSmartpoint(siteId, enabled: boolean): Observable<boolean> {
    const smartpoint: SmartPointEnableRequest = { enabled };
    return this.widgetApiService.startStopSmartpoint(siteId, smartpoint).pipe(
      map((response: ApiResponse) => response.success),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public createCompany(siteId, companyName: string): Observable<CompanyShort> {
    const company: CompanyRequest = {
      name: companyName
    };
    return this.widgetApiService.createCompany(siteId, company).pipe(
      map((response: CompanyResponse) => response.data),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public getDefaultCompany(companies) {
    const currentC = companies || this.currentCompanies;
    return currentC.find((item) => {
      return item.default;
    });
  }

  public getUndefaultCompanies(companies) {
    return companies.filter((item) => {
      return !item.default;
    });
  }

  public setContainers(containers) {
    this.currentContainers = containers;
  }

  public setCurrentCompanies(companies) {
    this.currentCompanies = companies;
  }

  public getCurrentCompanies() {
    return this.currentCompanies;
  }

  public getCompanyById(companyId, companies) {
    return companies.find((item) => {
      return item.id === companyId;
    });
  }
}
