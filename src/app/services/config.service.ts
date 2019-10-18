import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) {}
  get DEFAULT_HTTP_OPTIONS() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  makeUrl(subUrl: string) {
    return `${environment.urls.baseUrl}/${subUrl}`;
  }
}
