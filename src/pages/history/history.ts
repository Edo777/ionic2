import { Component, OnInit, DoCheck } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { MobiWash, CarsService } from "../../services/barrel.service";
import { SearchCars } from "../interfaces/interfaces";
import {ModalController} from 'ionic-angular';
import { AddCars } from "../barrel";




@Component({
    selector:'history-page',
    templateUrl:'history.html',
    
})
export class HistoryPage implements OnInit{
    
    //models
    localModels: any[];
    models: any[];

    closeSerachBrands: boolean = true;
    closeSerachModels:boolean = true;
    pageName:string;
    brands:any[];
    cars:any[] = [];
    dataJson:any[];
    addNewCar:any = {};
    isAddNewCar:boolean = false;
    more:boolean[];
    constructor(
        private modalCtrl:ModalController,
        private navParams: NavParams, 
        private mobiWash:MobiWash,
        private ordersCtrl:CarsService
    ){}      
    ngOnInit(){
        this.pageName = this.navParams.get('pageName');   
        this.cars = this.mobiWash.getCars();
        this.more = new Array(this.cars.length);
        this.initializeCars();
    }
    initializeCars() {
        this.ordersCtrl.getResults()
        .subscribe(data=>{
            this.dataJson = data;
        });
     }
    removeCar(i){
        this.mobiWash.removeCar(i);
        this.cars = this.mobiWash.getCars()
    }
    addCar(){
        this.isAddNewCar = !this.isAddNewCar;
        
        this.addNewCar = {
            brand: this.addNewCar.brand.trim(),
            model: this.addNewCar.model.trim(),
            number: this.addNewCar.number.trim()
        }
        if(this.addNewCar.brand.length < 1 || this.addNewCar.model.length < 1 || this.addNewCar.number.length < 1){
            return;
        }
        
        this.mobiWash.addCar(this.addNewCar);
        this.cars = this.mobiWash.getCars()
    }

 

    createNewCars(){
        var modal=this.modalCtrl.create(AddCars);
        modal.onDidDismiss((data) =>{
            if(data){
                this.addNewCar = data;
                this.addCar();
            }
        })
        modal.present();
    }
}