import { Component } from '@angular/core';
import { CarOrder, NewOrder, Brand, Model } from '../interfaces/interfaces';
import { CompleteTestService } from "../../services/cars.service";
import { ViewController } from "ionic-angular";

@Component({
    selector:'orders-register',
    templateUrl:'orders-register.html',
})

export class OrdersRegister{
    
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
    NEWORDER:NewOrder = {brand:'', model:'', address:''};

    constructor(private completeTestService:CompleteTestService, private viewCtrl:ViewController){
        this.initializeCars()
    }

    //get cars from service
    initializeCars() {
        this.completeTestService.getResults()
        .subscribe(data=>{
            this.cars = data;
        });;
     }

    

    BrandFn : Brand = {
        //set new order brand in  this.NEWORDER.brand
        completeBrand:()=>{
            this.NEWORDER.brand = this.activeCarBrand;
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
            this.NEWORDER.model = this.activeCarModel;
            console.log(this.NEWORDER);
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
          this.viewCtrl.dismiss(this.NEWORDER);
    }
    

}

