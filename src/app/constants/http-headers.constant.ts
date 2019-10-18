import { HttpHeaders } from '@angular/common/http';

export const DEFAULT_HTTP_OPTION = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
