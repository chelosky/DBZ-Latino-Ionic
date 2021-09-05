import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private nativeHttp: HTTP
    ) { }

  get<T>(url: string, httpParams?: any): Observable<HttpResponse<T>>{
    const httpHeaders: HttpHeaders = this.getHeaders();

    return this.http.get<T>(url,
      {
        headers: httpHeaders,
        params: httpParams,
        observe: 'response'
      })
  }

  post<T>(url: string, data: any): Observable<HttpResponse<T>>{
    const httpHeaders: HttpHeaders = this.getHeaders();

    return this.http.post<T>(url,data,
      {
        headers: httpHeaders,
        observe: 'response'
      })
  }

  put<T>(url: string, data: any): Observable<HttpResponse<T>>{
    const httpHeaders: HttpHeaders = this.getHeaders();

    return this.http.put<T>(url,data,
      {
        headers: httpHeaders,
        observe: 'response'
      })
  }

  getHeaders(): HttpHeaders{
    let httpHeaders: HttpHeaders = new HttpHeaders();

    // if(token){
    //   httpHeaders = httpHeaders.append('Authorization','Bearer ' + token);
    // }

    return httpHeaders;
  }

  downloadFile(url: string, path: string, body: any = {}, headers: any = {}):Promise<any>{
    return new Promise((resolve, reject) => {
      this.nativeHttp.downloadFile(url, body, headers, path)
        .then( async (response) => {
          resolve(response);
        }).catch(err => {
          reject(err);
        });
    })
  }
}
