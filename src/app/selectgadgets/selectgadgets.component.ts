import { Component, OnInit } from "@angular/core";
import { DatashareService } from "../datashare.service";

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
  totalTime:number = 0;
  

  constructor(private dataShare: DatashareService) {}

  ngOnInit() {
    this.getPlanet();
    this.getVehicle();
    
  }

  vehicleSelected(name, i) {
    if(this.checkEligibility(name,i)){
      this.incrementCount(i);
      this.decrementCount(name,i);
      this.selectedVehicles[i] = name;
      // console.log("The total time is:",this.totalTime);
    }else {
      alert("This vehicle can't be selected");
    }
  }

   incrementCount(index){
     const name = this.selectedVehicles[index];
     if(name){
       let position = this.getVehicleIndex(name);
      if (position != -1) {
        this.totalTime -= this.selectedPlanet[index].distance/this.vehiclesToShow[position].speed;
        this.vehiclesToShow[position]["total_no"] += 1;
      }
     }
   }

   decrementCount(name,i){
    if(name){
      let index = this.getVehicleIndex(name);
      if (index != -1) {
        this.totalTime += this.selectedPlanet[i].distance/this.vehiclesToShow[index].speed;
        this.vehiclesToShow[index]["total_no"] -= 1;
      }
    }

   }

   checkEligibility(name,index){
     {
       let position = this.getVehicleIndex(name);
      if(position != -1){
        return (this.vehiclesToShow[position].max_distance >= this.selectedPlanet[index].distance)?true:false;
      }
     }
   }

   getPlanet(){
    this.dataShare.getPlanetsData().subscribe(
      planets => {
        this.allplanets = planets;
        this.planetsToShow = planets;
        console.log("The planets are:", planets);
      },
      err => {
        console.error(err);
      }
    );
   }

   getVehicle(){
    this.dataShare.getVehiclesData().subscribe(
      vehicles => {
        this.allVehicles = vehicles;
        this.vehiclesToShow = vehicles;
        console.log("The vehicles are:", vehicles);
      },
      err => {
        console.error(err);
      }
    );
   }
   
   changePlanet(name,i){
     if(this.selectedPlanet[i]){
      if(this.selectedVehicles[i]){
        let index = this.getVehicleIndex(this.selectedVehicles[i]);
        this.totalTime -= this.selectedPlanet[i].distance/this.vehiclesToShow[index].speed;
        this.totalTime+= name.distance/this.vehiclesToShow[index].speed;
        this.selectedPlanet[i] = name;
      }
     }else {
       this.selectedPlanet[i] = name;
     }
   }

   getVehicleIndex(vehicleName):number{
    let index =this.vehiclesToShow.findIndex(vehicle => {
      return vehicle.name === vehicleName;
    });
    return index;
   }

  findFalcon() {
    console.log(this.selectedPlanet);
    console.log(this.selectedVehicles);
    console.log(this.totalTime);
  }
}
