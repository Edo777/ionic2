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

    pageName:string;
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


    createNewCars(car?:any){
        var modal=this.modalCtrl.create(AddCars, {"car" :car});
        modal.onWillDismiss((data) =>{
            if(data){
                this.addNewCar = data;
                this.addCar();
            }
        })
        modal.present();
    }
}