import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import { TranslateService } from "../../../../translate/translate.service";

@Component({
    selector:"order-info",
    templateUrl:"order-info.html"
})
export class OrderInfo{
    private info:any;
    private cars = []
    constructor(
        private params:NavParams,
        private viewCtrl:ViewController,
        private serv:TranslateService,
    ){}

    ngOnInit(){
        this.info = this.params.data["info"];
        for(let i = 0; i < this.info.cars.length; i++){
            let currentCar = {
                make_id:this.info.cars[i].car_make,
                model_id:this.info.cars[i].car_model,
                car_number:this.info.cars[i].car_number,
                service:this.info.cars[i].service_id,
                type:"new"
            }
            if(!this.info.cars[i].type){
                delete currentCar.type
            }
            this.cars.push(currentCar);
        }
        console.log(this.info);
    }

    close(){
        this.viewCtrl.dismiss();
    }
}