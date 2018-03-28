import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'
import { ApiService } from "./api.service";
import { LoadingController } from "ionic-angular";
import { TranslateService } from "../translate/translate.service";


@Injectable()
export class CarsService {
  public ok:boolean = false;
  private cars:any = []
  hasResult:boolean = false;
  constructor(private api:ApiService, private loadingCtrl:LoadingController, private serv:TranslateService) {
      this.api.getAllcars().subscribe(
        (data)=>{
            this.cars = data;
            this.ok = true;
            console.log(this.cars)
        },
        (error) => {
            this.ok = false;
        }
    )

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
