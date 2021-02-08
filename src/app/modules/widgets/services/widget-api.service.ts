import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api';
import {
  SmartPointTypes,
  SmartPointUpdateRequest,
  WidgetRename,
  WidgetsResponse,
  WidgetTemplatesResponse,
  WidgetTypesResponse
} from '../../../core/models/widgets';


@Injectable({
  providedIn: 'root'
})
export class WidgetApiService {

  constructor(private http: HttpClient) { }

  public getWidgetsList(siteId: string): Observable<WidgetsResponse> {
    return this.http.get<WidgetsResponse>(`${ environment.url }/sites/${siteId}/widgets`);
  }

  public getWidgetsTypes(): Observable<WidgetTypesResponse> {
    return this.http.get<WidgetTypesResponse>(`${ environment.url }/widgets/types`);
  }

  public getWidgetsTemplates(): Observable<WidgetTemplatesResponse> {
    return this.http.get<WidgetTemplatesResponse>(`${ environment.url }/widgets/templates`);
  }

  public rename(siteId: string, widgetId: string, name: WidgetRename): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${ environment.url }/sites/${siteId}/sitewidgets/${widgetId}/rename`, name);
  }

  public switch(siteId: string, widgetId: string, action: 'start' | 'stop') {
    return this.http.post<ApiResponse>(`${ environment.url }/sites/${siteId}/sitewidgets/${widgetId}/${action}`, null);
  }

  public putSmartpointType(siteId: string, smartpointType: SmartPointTypes, smartpoint: SmartPointUpdateRequest) {
    return this.http.put(`${ environment.url }/sites/${siteId}/smartpoints/${smartpointType}`, smartpoint);
  }
}
