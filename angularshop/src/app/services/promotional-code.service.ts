// src/app/services/promotional-code.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromotionalCodeService {
  private apiUrl = `${environment.apiUrl}/promo-codes`;

  constructor(private http: HttpClient) {}

  validatePromoCode(code: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${code}`);
  }
}
