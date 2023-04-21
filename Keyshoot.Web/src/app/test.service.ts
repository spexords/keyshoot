import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  apiUrl = environment.apiUrl + 'test'

  constructor(private http: HttpClient) { }

  getTestMessage(): Observable<string> {
    console.log(this.apiUrl)
    return this.http.get(this.apiUrl, {responseType: 'text'});
  }
}
