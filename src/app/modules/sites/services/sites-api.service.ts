import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SitesResponse } from '../models/sites';


@Injectable({
  providedIn: 'root'
})
export class SitesApiService {

  constructor(private http: HttpClient) { }

  public getRawSites(): Observable<SitesResponse> {
    return this.http.get<SitesResponse>(`${ environment.url }/sites/statistics`);
  }
}
