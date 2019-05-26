import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


getWifiApiData(term: any) {
  return this.http.get(`https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=wifi-punkter&rows=200&q=${term}`);
}

}
