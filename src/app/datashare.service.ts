import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DatashareService {
  readonly getPlanetsUrl = "https://findfalcone.herokuapp.com/planets";
  readonly getVehcilesUrl = "https://findfalcone.herokuapp.com/vehicles";
  result = {};
  timeTaken = 0;
  constructor(private http: HttpClient) {}

  getPlanetsData(): Observable<any> {
    return this.http.get<any>(this.getPlanetsUrl);
  }
  getVehiclesData(): Observable<any> {
    return this.http.get<any>(this.getVehcilesUrl);
  }
  checkStatus(data) {
    console.log(data);
    const planetNames = [
      "Donlon",
      "Enchai",
      "Jebing",
      "Sapir",
      "Lerbin",
      "Pingasor"
    ];
    const randomPlanet =
      planetNames[Math.floor(Math.random() * planetNames.length)];
    if (data["planet_names"].includes(randomPlanet)) {
      return of({ planet_name: randomPlanet, status: "success" });
    } else {
      return of({ status: "false" });
    }
  }
}
