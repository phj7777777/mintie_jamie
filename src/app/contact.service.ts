import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs-compat/operator/map';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private api = `https://mailthis.to/${environment.email}`

  constructor(private http: HttpClient) { }

  PostMessage( input: any ) {
    return this.http.post(this.api, input, {responseType: 'text'}).pipe(
    )
  }
}
