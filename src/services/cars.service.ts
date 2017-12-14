import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'
import { ApiService } from "./api.service";
import { NewOrder } from "../pages/interfaces/interfaces";


@Injectable()
export class CarsService {
  
  cars:any
  constructor(private api:ApiService) {
    this.api.getAllcars().subscribe(data=>{
      this.cars = data;
      console.log(this.cars)
    })
  }


  getCarName(id){
      for(let car of this.cars){
         if(car.id == id){
           return car.name;
         }
      }
  }

  getCarModel(brandId, modelId){
    for(let car of this.cars){
         if(car.id == brandId){
            for(let model of car.models){
              if(model.id == modelId){
                 return model.name;
              }
            }
         }
      }
  }

  getResults() {
    return this.cars || [];
  }
}
