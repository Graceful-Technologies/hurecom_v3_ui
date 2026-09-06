import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../tokens/api.token';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);

  private buildUrl(url: string): string {
    return `${this.baseUrl}${url}`;
  }

  get<T>(url: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }

    return this.http.get<T>(this.buildUrl(url), { params: httpParams });
  }

  search<T>(url: string, payload: any): Observable<T> {
    return this.http.post<T>(this.buildUrl(url), payload);
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.buildUrl(url), body);
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.buildUrl(url), body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.buildUrl(url));
  }

  upload<T>(url: string, formData: FormData): Observable<T> {
    return this.http.post<T>(this.buildUrl(url), formData);
  }

  download(url: string): Observable<HttpResponse<Blob>> {
    return this.http.get(this.buildUrl(url), { observe: 'response', responseType: 'blob' });
  }
}
