import { Component, OnInit } from "@angular/core";
import { DatashareService } from "../datashare.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-selectgadgets",
  templateUrl: "./selectgadgets.component.html",
  styleUrls: ["./selectgadgets.component.css"]
})
export class SelectgadgetsComponent implements OnInit {
  allplanets = [];
  allVehicles = [];
  planetsToShow = [];
  vehiclesToShow = [];
  selectedPlanet = [];
  selectedVehicles = [];
  totalTime: number = 0;
  selectedPlanetDistance = [0, 0, 0, 0];

  constructor(private dataShare: DatashareService, private router: Router) {}

  ngOnInit() {
    this.dataShare.result = {};
    this.dataShare.timeTaken = 0;
    this.getPlanet();
    this.getVehicle();
  }

  vehicleSelected(name, i) {
    this.incrementCount(i);
    this.decrementCount(name, i);
    this.selectedVehicles[i] = name;
  }

  incrementCount(index) {
    const name = this.selectedVehicles[index];
    if (name) {
      let position = this.getVehicleIndex(name);
      if (position != -1) {
        this.totalTime -=
          this.selectedPlanet[index].distance /
          this.vehiclesToShow[position].speed;
        this.vehiclesToShow[position]["total_no"] += 1;
      }
    }
  }

  decrementCount(name, i) {
    if (name) {
      let index = this.getVehicleIndex(name);
      if (index != -1) {
        this.totalTime +=
          this.selectedPlanet[i].distance / this.vehiclesToShow[index].speed;
        this.vehiclesToShow[index]["total_no"] -= 1;
      }
    }
  }

  getPlanet() {
    this.dataShare.getPlanetsData().subscribe(
      planets => {
        this.allplanets = planets;
        this.planetsToShow = planets;
      },
      err => {
        console.error(err);
      }
    );
  }

  getVehicle() {
    this.dataShare.getVehiclesData().subscribe(
      vehicles => {
        this.allVehicles = vehicles;
        this.vehiclesToShow = vehicles;
      },
      err => {
        console.error(err);
      }
    );
  }

  changePlanet(name, i) {
    if (this.selectedPlanet[i]) {
      if (this.selectedVehicles[i]) {
        let index = this.getVehicleIndex(this.selectedVehicles[i]);
        this.totalTime -=
          this.selectedPlanet[i].distance / this.vehiclesToShow[index].speed;
        this.totalTime += name.distance / this.vehiclesToShow[index].speed;
        this.selectedPlanet[i] = name;
      }
    } else {
      this.selectedPlanet[i] = name;
    }
    this.selectedPlanetDistance[i] = name.distance;
  }

  getVehicleIndex(vehicleName): number {
    let index = this.vehiclesToShow.findIndex(vehicle => {
      return vehicle.name === vehicleName;
    });
    return index;
  }

  findFalcon() {
    let names = [];
    this.selectedPlanet.map(planet => {
      if (planet.name) {
        names.push(planet.name);
      }
    });
    let obj = {
      planet_names: names,
      vehicle_names: this.selectedVehicles
    };
    this.dataShare.checkStatus(obj).subscribe(
      data => {
        this.dataShare.result = data;
        this.dataShare.timeTaken = this.totalTime;
        this.router.navigate(["/result"]);
      },
      err => {
        console.error(err);
      }
    );
  }
}
