import { Component, OnInit } from "@angular/core";
import { DatashareService } from "../datashare.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"]
})
export class ResultComponent implements OnInit {
  result = {};
  timeTaken: number = 0;
  constructor(private dataShare: DatashareService, private router: Router) {}

  ngOnInit() {
    if (this.dataShare.result && this.dataShare.result.hasOwnProperty('status') && this.dataShare.timeTaken) {
      this.result = this.dataShare.result;
      this.timeTaken = this.dataShare.timeTaken;
    } else {
      this.router.navigate(["/select"]);
    }
  }

  startAgain(){
    this.router.navigate(["/select"]);
  }
}
