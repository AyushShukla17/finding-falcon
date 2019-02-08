import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  readonly getPlanetsUrl = "https://findfalcone.herokuapp.com/planets";
  readonly getVehcilesUrl = "https://findfalcone.herokuapp.com/vehicles";
  constructor( private http:HttpClient) { 
  }

  getPlanetsData():Observable<any>{
   return this.http.get<any>(this.getPlanetsUrl)
  }
  getVehiclesData():Observable<any>{
    return this.http.get<any>(this.getVehcilesUrl)
   }

}
