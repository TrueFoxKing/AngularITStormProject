import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  sendUserRequest(name: string, phone: string, type: string, service?: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests', {
      name,
      phone,
      type,
      service
    })
  }
}
