import { Component } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";

@Component({
    selector:"order-info",
    templateUrl:"order-info.html"
})
export class OrderInfo{
    private info:any;
    constructor(
        private params:NavParams,
        private viewCtrl:ViewController
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
            this.info.cars[i] = currentCar;
        }
        console.log(this.info);
    }

    close(){
        this.viewCtrl.dismiss();
    }
}