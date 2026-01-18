import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Deal } from '../model/deal.model';


@Injectable({
  providedIn: 'root',
})
export class DealService {
  private baseUrl = `${environment.apiBaseUrl}/api/deals`;

  constructor(private http: HttpClient) {}

  getDeals(filters?: { stage?: string; sector?: string; dealType?: string }): Observable<Deal[]> {
    let params = new HttpParams();
    if (filters?.stage) params = params.set('stage', filters.stage);
    if (filters?.sector) params = params.set('sector', filters.sector);
    if (filters?.dealType) params = params.set('dealType', filters.dealType);
    return this.http.get<Deal[]>(this.baseUrl, { params });
  }

  getDealById(id: string): Observable<Deal> {
    return this.http.get<Deal>(`${this.baseUrl}/${id}`);
  }

  createDeal(payload: Partial<Deal>): Observable<Deal> {
    return this.http.post<Deal>(this.baseUrl, payload);
  }

  updateDeal(id: string, payload: Partial<Deal>): Observable<Deal> {
    return this.http.put<Deal>(`${this.baseUrl}/${id}`, payload);
  }

  updateStage(id: string, stage: string): Observable<Deal> {
    return this.http.patch<Deal>(`${this.baseUrl}/${id}/stage`, { stage });
  }

  addNote(id: string, note: string): Observable<Deal> {
    return this.http.post<Deal>(`${this.baseUrl}/${id}/notes`, { note });
  }

  // ✅ ADMIN only
  updateDealValue(id: string, dealValue: number): Observable<Deal> {
    return this.http.patch<Deal>(`${this.baseUrl}/${id}/value`, { dealValue });
  }

  // ✅ ADMIN only
  deleteDeal(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  
}

