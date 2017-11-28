import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { CarOrder, NewOrder, Brand, Model } from '../interfaces/interfaces';
import { CarsService } from "../../services/cars.service";
import { ViewController, Platform, Content, Nav, NavController, App } from "ionic-angular";
import { Keyboard } from "@ionic-native/keyboard";
import { MobiWash } from "../../services/barrel.service";
import { AddNewAddress, CompleteOrder } from "../barrel"




@Component({
    selector:'orders-register',
    templateUrl:'orders-register.html',
    providers:[Keyboard]
})

export class OrdersRegister implements OnInit,AfterViewInit{
    cars:any;
    brands:string[];
    models:string[] = [];
    localModels:string[] = [];
    //serach area closer
    isCompleteBrand:boolean = false;
    //serach area closer
    isCompleteModel:boolean = false;
    rows:any = {hide1:true, hide2:false, hide3:false, hide4:false, hide5:false};
    NEWCAR:NewOrder = {brand:'', model:'', number:'',  type:''};

     @ViewChild( Content ) content: Content;
    constructor(
        private ordersCtrl:CarsService, 
        private viewCtrl:ViewController,
        public keyboard: Keyboard,
        public platform:Platform,
        private mobiWash:MobiWash,
        private nav:NavController
    ){
        this.initializeCars();
    }
    ngAfterViewInit(){
        this.keyboard.onKeyboardShow().subscribe(
            (event)=>{ 
                if(this.content._scroll){
                   
                }
            },
            (err) => {
                console.log(err);
            }
        )
    }
    ngOnInit(){
        
    }
    /////////////////////////
    
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
    }
    completeRegisterPage(){
        this.viewCtrl.dismiss(this.NEWCAR)   
    }
    closeRegisterPage(){
        this.viewCtrl.dismiss()
    }

    //////////////////////////////////
    //for constrol errors in time click ok
    completeBlur(id){
        if(id === 1 && this.NEWCAR.brand != ''){
            this.isCompleteBrand = false;
            this.rows.hide2 = true;
        }else if(id === 2 && this.NEWCAR.model != ''){
            this.isCompleteModel = false;
            this.rows.hide3 = true;
        }else if(id === 3 && this.NEWCAR.number != ''){
            this.rows.hide4 = true
        }
    }
    /////////////////////////////////////
    completeFocus(ev, id?){
        if(id === 1){
            this.isCompleteBrand = true;
        }else if(id === 2){
            this.isCompleteModel = true;  
        }
    }
    ngOnDestroy(){
        console.log('deleted')
    }
    cons(event){
        console.log(event)
    }
    
}

