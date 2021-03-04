import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ApiResponse } from '../../../core/models/api';
import {
  ContainerizedWidgetCloneRequest,
  ContainerResponse,
  ContainerShort,
  ContainersResponse, WidgetCloned, WidgetCloneRequest,
  WidgetCloneResponse,
  WidgetRename
} from '../../../core/models/widgets';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { ContainerizedWidgetApiService } from './containerized-widget-api.service';
import { SitesService } from '../../sites/services/sites.service';


@Injectable({
  providedIn: 'root'
})
export class ContainerizedWidgetService {

  constructor(
    private translate: TranslateService,
    private errorHandlerService: ErrorHandlerService,
    private sitesService: SitesService,
    private containerizedWidgetApiService: ContainerizedWidgetApiService
  ) { }

  public getWContainers(siteId: string): Observable<ContainerShort[]> {
    return this.containerizedWidgetApiService.getWContainers(siteId).pipe(
      map((response: ContainersResponse) => response.data),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public createWContainer(siteId: string, containerName: string): Observable<ContainerShort> {
    const container = { name: containerName };
    return this.containerizedWidgetApiService.createWContainer(siteId, container).pipe(
      map((response: ContainerResponse) => response.data),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public switch(siteId: string, widgetId: string, active: boolean): Observable<boolean> {
    const action = active ? 'start' : 'stop';
    return this.containerizedWidgetApiService.switch(siteId, widgetId, action).pipe(
      map((response: ApiResponse) => response.success),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public rename(siteId: string, widgetId: string, name: string): Observable<boolean> {
    const renamedCWidget: WidgetRename = { name };
    return this.containerizedWidgetApiService.rename(siteId, widgetId, renamedCWidget).pipe(
      map((response: ApiResponse) => response.success),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public clone(siteId: string, widgetId: string, targetSiteId: string, companyId: string, containerId: string): Observable<WidgetCloned> {
    const cloneWidget: ContainerizedWidgetCloneRequest = { siteId: targetSiteId, companyId, containerId };
    return this.containerizedWidgetApiService.clone(siteId, widgetId, cloneWidget).pipe(
      map((response: WidgetCloneResponse) => response.data),
      catchError(this.errorHandlerService.handleError)
    );
  }

  public getWContainerName(siteId: string) {
    const searchText = this.translate.instant('containerized.container.label') + ' #';
    return this.getWContainers(siteId || this.sitesService.getCurrentSiteId()).pipe(
      map((response: ContainerShort[]) => {
        if (response.length) {
          let compareNumber;
          response.forEach((item: ContainerShort) => {
            if (item.name.indexOf(searchText) > -1) {
              compareNumber = 1;
              const lastChar = parseInt(item.name.substring(searchText.length), 10);
              if (lastChar > compareNumber) {
                compareNumber = lastChar;
              }
            }
          });
          compareNumber = compareNumber ? (compareNumber + 1) : 1;
          return searchText + compareNumber;
        } else {
          return searchText + '1';
        }
      })
    );
  }
}
