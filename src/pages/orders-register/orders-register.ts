import { Component } from '@angular/core';
import { CarOrder, NewOrder, Brand, Model } from '../interfaces/interfaces';
import { CarsService } from "../../services/cars.service";
import { ViewController } from "ionic-angular";

@Component({
    selector:'orders-register',
    templateUrl:'orders-register.html',
})

export class OrdersRegister{
    cars:any;
    brands:string[];

    models:string[] = [];
    localModels:string[] = [];

    isCompleteBrand:boolean = false;
    isCompleteModel:boolean = false;
    

    rows:any = {hide1:true, hide2:false, hide3:false, hide4:false};

    NEWCAR:NewOrder = {brand:'', model:'', number:''};
    constructor(private ordersCtrl:CarsService, private viewCtrl:ViewController){
        this.initializeCars()
    }
    consol(){
        console.log('hello');
    }

    checkModelButton(model, val){
        this.NEWCAR.brand = val;
        this.models = model.models;
    }
    //get cars from service
    initializeCars() {
        this.ordersCtrl.getResults()
        .subscribe(data=>{
            this.cars = data;
        });
     }
     getBrands(ev: any){
        this.initializeCars();
        let val = ev.target.value;
        if (val && val.trim() != '' ) {
            this.brands = this.cars.filter((item) => {
                return (item.value.toLowerCase().startsWith(val.toLowerCase()));
            })
        }else{
            this.brands = []
        }
        console.log(this.NEWCAR)
     }
     getModels(ev: any){
        let val = ev.target.value;
        if (val && val.trim() != '' && this.models.length) {
            this.localModels = this.models.filter((item:any) => {
                return (item.value.toLowerCase().startsWith(val.toLowerCase()));
            })
        }else{
            this.localModels = []
        }
        console.log(this.NEWCAR)
    }
    
    closeRegisterPage(){
        let data = this.NEWCAR
          this.viewCtrl.dismiss(data);
          console.log(data)
    }
}

