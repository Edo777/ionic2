import { Component } from '@angular/core';
import { CarOrder, NewOrder, Brand, Model } from '../interfaces/interfaces';
import { CarsService } from "../../services/cars.service";
import { ViewController } from "ionic-angular";

@Component({
    selector:'orders-register',
    templateUrl:'orders-register.html',
})

export class OrdersRegister{
    //old or new cars
    isWantOldCar:boolean = false;
    isWantNewCar:boolean = false;
    arr:any;
    //for old orders
    isTrue:boolean = false;

    //model & brands
    brands: string[];
    constModels:any;
    localModels:any;

    //variable who get the value from data.json
    cars:any; 

    //car params
    activeCarBrand:string;
    activeCarModel:string;

    //variable who close the searchlist after complete brand
    isBrandComplete:boolean = false;
    isModelComplete: boolean = false;
    //object of order
    NEWCAR:NewOrder = {brand:'', model:'', address:''};
    OLDCAR:NewOrder = {brand:'', model:''}
    constructor(private ordersCtrl:CarsService, private viewCtrl:ViewController){
        this.initializeCars()
    }
    consol(){
        console.log('hello');
    }
    
    //get cars from service
    initializeCars() {
        this.ordersCtrl.getResults()
        .subscribe(data=>{
            this.cars = data;
        });
     }

    

    BrandFn : Brand = {
        //set new order brand in  this.NEWORDER.brand
        completeBrand:()=>{
            this.NEWCAR.brand = this.activeCarBrand;
            this.OLDCAR.brand = this.activeCarBrand;
        },
        //set the brand in value input
        setBrand:(val)=>{
            this.constModels = val.models;
            this.activeCarBrand = val.value;
            this.isBrandComplete = true;
        },
        // searchbar logic get brands
        getBrands: (ev: any) =>{
            this.isBrandComplete = false;
            this.initializeCars();
            let val = ev.target.value;
            if (val && val.trim() != '') {
                this.brands = this.cars.filter((item) => {
                    return (item.value.toLowerCase().startsWith(val.toLowerCase()));
                })
            }else{
                this.brands = []
            }
        }
    }
   
    ModelFn : Model = {
        //set new order model in  this.NEWORDER.model
        completeModel:() => {
            this.NEWCAR.model = this.activeCarModel;
            this.OLDCAR.model = this.activeCarModel;
            console.log(this.NEWCAR);
        },
        //set the car's model
        setModel: (val) => {
            this.activeCarModel = val.value;
            this.isModelComplete = true;
        },

        // searchbar logic Get models
        getModels: (ev: any) => {
            this.isModelComplete = false;
            let val = ev.target.value;
            if (val && val.trim() != '') {
                this.localModels = this.constModels.filter((item)=>{
                    return (item.value.toLowerCase().startsWith(val.toLowerCase()));
                })
            }else{
                this.localModels = [];
            }
        }
    }
    
    closeRegisterPage(){
        let data = {
            NEWCAR: this.NEWCAR, 
            OLDCAR: this.OLDCAR
        };
          this.viewCtrl.dismiss(data);
          console.log(data)
    }
}

