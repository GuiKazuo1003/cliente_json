import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cliente } from './client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = "http://localhost:3000/clients";

  constructor(private http: HttpClient) { }

  getClients(): Observable<cliente[]> {
   
    return this.http.get<cliente[]>(this.url);
  }
  save(client: cliente): Observable<cliente> {
    return this.http.post<cliente>(this.url, client);
  }
  remove(client : cliente):Observable<void>{ //se fosse para devolver apenas um cliente: Observable<Client
    return this.http.delete<void>(`${this.url}/${client.id}`);
  }
  uptade(client : cliente):Observable<cliente> {
    return this.http.put<cliente>(`${this.url}/${client.id}`, client);
  }
}
