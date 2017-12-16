import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'
import { ApiService } from "./api.service";
import { NewOrder } from "../pages/interfaces/interfaces";
import { LoadingController } from "ionic-angular";
import { TranslateService } from "../translate/translate.service";


@Injectable()
export class CarsService {
  
  cars:any
  hasResult:boolean = false;
  constructor(private api:ApiService, private loadingCtrl:LoadingController, private serv:TranslateService) {
    let loading = this.loadingCtrl.create({
      content: this.serv.translateImportant("Խնդրում եմ սպասել․․․", 'Please wait...')
    });
    loading.present();
    this.api.getAllcars().subscribe(data=>{
      loading.dismiss()
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
