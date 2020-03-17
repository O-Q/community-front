import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor() { }
  get DEFAULT_HTTP_OPTIONS() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  makeUrl(
    subUrl: string,
    args: {
      params?: { [_: string]: string | number };
      queries?: { [_: string]: string | number };
    } = { params: {}, queries: {} }
  ) {
    const { params, queries } = args;
    for (const k in params) {
      if (params.hasOwnProperty(k)) {
        subUrl = subUrl.replace(`:${k}`, params[k].toString());
      }
    }

    const queryParams: string[] = [];
    for (const k in queries) {
      if (queries.hasOwnProperty(k)) {
        queryParams.push(`${k}=${queries[k]}`);
      }
    }

    if (queryParams.length) {
      return `${environment.urls.baseUrl}/${subUrl}?${queryParams.join('&')}`;
    } else {
      return `${environment.urls.baseUrl}/${subUrl}`;
    }
  }
}
