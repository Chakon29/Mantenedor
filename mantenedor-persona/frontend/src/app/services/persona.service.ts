// persona.service.ts
import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/personas/';
  }
  
  getListPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.myAppUrl}${this.myApiUrl}`);
  } 
  deletePersona(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  savePersona(persona: Persona):Observable<void>{
   return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, persona)
  }
}
