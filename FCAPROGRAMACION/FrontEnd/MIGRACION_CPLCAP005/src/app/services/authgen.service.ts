import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserJwt } from '../models/common/userJwt';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthgenService {

  constructor(private httpClient: HttpClient) { }

  genToken(user: UserJwt): Observable<any> {
    const url = `${environment.FCAPROGAPI002}auth/Token`;
    return this.httpClient.post(url, user);
  }
}
