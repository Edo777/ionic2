import { Component, OnInit, DoCheck } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { MobiWash, CarsService } from "../../services/barrel.service";
import { SearchCars } from "../interfaces/interfaces";
import { ModalController, AlertController } from 'ionic-angular';
import { AddCars } from "../barrel";




@Component({
    selector:'history-page',
    templateUrl:'history.html',
    
})
export class HistoryPage implements OnInit{
    
    //models

    pageName:string;
    cars:any[] = [];
    addNewCar:any = {};
    isAddNewCar:boolean = false;
    constructor(
        private modalCtrl:ModalController,
        private navParams: NavParams, 
        private mobiWash:MobiWash,
        private carsCtrl:CarsService,
        private alertCtrl:AlertController
    ){}      
    ngOnInit(){
        this.pageName = this.navParams.get('pageName');   
        this.cars = this.mobiWash.getCars();
    }
    
    //alert delete
        deleteConfirm(i, item) {
            let alert = this.alertCtrl.create({
                title: 'Wobi Wash',
                message: 'Դուք ցանկանում եք ջնջել?',
                buttons: [
                {
                    text: 'Մերժել',
                    role: 'Cancel',
                    handler: () => {
                        item.close()
                    }
                },
                {
                    text: 'Հաստատել',
                    handler: () => {
                        this.removeCar(i);
                    }
                }
                ]
            });
            alert.present();
            }

    removeCar(i){
        this.mobiWash.removeCar(i);
        this.cars = this.mobiWash.getCars()
    }
    addCar(){
        this.mobiWash.addCar(this.addNewCar);
        this.cars = this.mobiWash.getCars()
        console.log(this.cars)
    }



    createNewCars(car?:any, index?:number){
        var modal = this.modalCtrl.create(AddCars, {"car" :car});
        modal.onWillDismiss((data) =>{
            console.log(data)
            if(data){
                if(data[1]){
                    this.mobiWash.editCar(index, data[0])
                    this.cars = this.mobiWash.getCars();
                    
                }else{
                    this.addNewCar = data[0];
                    this.addCar();
                    console.log("data ", data)
                }
            }
        })
        modal.present();
    }
}