import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'
import { ApiService } from "./api.service";


@Injectable()
export class CarsService {

  cars:any
  constructor(private api:ApiService) {
    this.api.getAllcars().subscribe(data=>{
      this.cars = data;
      console.log(this.cars)
    })
  }
 
  getResults() {
    return this.cars || [];
  }
}