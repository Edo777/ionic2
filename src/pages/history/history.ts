import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { MobiWash } from "../../services/barrel.service";



@Component({
    selector:'history-page',
    templateUrl:'history.html',
    
})
export class HistoryPage implements OnInit{
    pageName:string;
    cars:any[];
    addNewCar:any = {brand: '', model:'', number:''}
    isAddNewCar:boolean = false;
    more:boolean[];
    constructor(private navParams: NavParams, private mobiWash:MobiWash){}      
    ngOnInit(){
        this.pageName = this.navParams.get('pageName');   
        this.cars = this.mobiWash.getCars();
        this.more = new Array(this.cars.length);
    }
    
    removeCar(i){
        this.mobiWash.removeCar(i);
        this.cars = this.mobiWash.getCars()
    }
    addCar(){
        console.log(this.more);
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
        this.addNewCar = {brand: '', model:'', number:''};
        this.cars = this.mobiWash.getCars()
    }
}