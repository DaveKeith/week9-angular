import Person from '../models/person.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import { map } from 'rxjs/operators';

@Injectable()
export class PersonService {

  api_url = 'http://localhost:3000';
  personUrl = `${this.api_url}/api/person`;

  constructor(private http: HttpClient) { }


  createPerson(person: Person): Observable<any>{
    return this.http.post(`${this.personUrl}`, person);
  }


  getPersons(): Observable<Person[]>{
    return this.http.get(this.personUrl)
      .pipe(map(res  => {
        return res["data"].docs as Person[];
      }))
  }
    
  getPersonByID(id:string):any{
      let getUrl = `${this.personUrl}/?_id=${id}`
      return this.http.get(getUrl)
    }


  editPerson(person:Person){
      let editUrl = `${this.personUrl}/${person._id}`
      return this.http.put(editUrl, person);
    }


  deletePerson(id:string):any{
      let deleteUrl = `${this.personUrl}/${id}`
      return this.http.delete(deleteUrl)
      .pipe(map(res  => {
        return res;
      }))
    }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
