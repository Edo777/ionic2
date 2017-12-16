import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { CarOrder, NewOrder, Brand, Model } from '../interfaces/interfaces';
import { CarsService } from "../../services/cars.service";
import { ViewController, Platform, Content, Nav, NavController, App, AlertController, NavParams, LoadingController } from "ionic-angular";
import { Keyboard } from "@ionic-native/keyboard";
import { MobiWash } from "../../services/barrel.service";
import { AddNewAddress, CompleteOrder } from "../barrel"
import { TranslateService } from "../../translate/translate.service";




@Component({
    selector:'orders-register',
    templateUrl:'orders-register.html',
    providers:[Keyboard]
})

export class OrdersRegister implements OnInit,AfterViewInit{
    //edit order
    private orderEdit:any;

    private modelName; brandName; carNumber; service;


    historyCars:any;
    cars = [];
    brands:string[];
    models:string[] = [];
    localModels:string[] = [];
    //serach area closer
    isCompleteBrand:boolean = false;
    //serach area closer
    isCompleteModel:boolean = false;
    rows:any = {hide1:true, hide2:false, hide3:false, hide4:false, hide5:false};
    CAR:NewOrder = {make_id:'', model_id:'', car_number:'',  service:0, type:""};

     @ViewChild( Content ) content: Content;
    constructor(
        private ordersCtrl:CarsService, 
        private viewCtrl:ViewController,
        public keyboard: Keyboard,
        public platform:Platform,
        private mobiWash:MobiWash,
        private nav:NavController,
        private alertCtrl:AlertController,
        private params:NavParams,
        private ngZone:NgZone,
        private serv:TranslateService,
        private loadingCtrl:LoadingController
        
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

        this.historyCars = this.mobiWash.getCars();
        this.isHasDataWhenModalOpen()
    }
    /////////////////////////
    
    checkBrandButton(brand, val){
        this.brandName = brand.name;
        this.CAR.make_id = brand.id;
        this.models = brand.models;
    }
    checkModelButton(mod){
        this.modelName = mod.name;
        this.CAR.model_id = mod.id;
    }
    //get cars from service
    initializeCars() {
        this.cars = this.ordersCtrl.getResults()  
     }
    ionViewWillEnter(){
       
        this.cars = this.ordersCtrl.getResults()
       
    }
     getBrands(ev: any){
        this.initializeCars();
        let val = ev.target.value;
        if (val && val.trim() != '' ) {
            this.brands = this.cars.filter((item) => {
                return (item.name.toLowerCase().startsWith(val.toLowerCase()));
            })
        }else{
            this.brands = []
        }
        console.log(this.brands)
     }
     getModels(ev: any){
        let val = ev.target.value;
        if (val && val.trim() != '' && this.models.length) {
            this.localModels = this.models.filter((item:any) => {
                return (item.name.toLowerCase().startsWith(val.toLowerCase()));
            })
        }else{
            this.localModels = []
        }
    }
    
    completeRegisterPage(){
        this.carTypeControl();
        console.log(this.CAR)
        this.viewCtrl.dismiss(this.CAR);  
    }
    closeRegisterPage(){
        this.viewCtrl.dismiss()
    }

    //////////////////////////////////
    //for constrol errors in time click ok

    completeBlur(id){
        if(id === 1 && this.brandName != ''){
            this.isCompleteBrand = false;
            this.rows.hide2 = true;
            console.log(this.CAR)
        }else if(id === 2){
            this.isCompleteModel = false;
            this.rows.hide3 = true;
        }else if(id === 3){
            this.CAR["car_number"] = this.carNumber;
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
    ///////////////////////////////
    private carTypeControl(){
        this.CAR["make_id"] = this.brandName;
        this.CAR["model_id"] = this.modelName;
        this.CAR["service"] = Number(this.service);
        this.CAR["type"] = "new";
        for(let brand of this.cars){
            if(brand.name.toLowerCase() == this.brandName.toLowerCase()){
                console.log("yes brand")
                for(let model of brand.models){
                    if(model.name.toLowerCase() == this.modelName.toLowerCase()){
                        console.log("yes model")
                        this.CAR["make_id"] = Number(brand.id);
                        this.CAR["model_id"] = Number(model.id);
                        delete this.CAR["type"];
                        break;
                    }
                };
                break;
            }         
        };
    }
   
    isHasDataWhenModalOpen(){
        if(this.params.data["orderEdit"]){
            this.orderEdit = this.params.data["orderEdit"];
            this.rows.hide2 = true;
            this.rows.hide3 = true;
            this.rows.hide4 = true;
            this.carNumber = this.orderEdit.car_number;
            this.service = this.orderEdit.service;
            if(this.params.data["orderEdit"].type){
                this.brandName = this.orderEdit.make_id;
                this.modelName = this.orderEdit.model_id;
            }else{
               let brand = this.cars.find((element) => this.params.data["orderEdit"].make_id == element.id);
               let model = brand.models.find((element) => this.params.data["orderEdit"].model_id == element.id);
               this.brandName = brand.name;
               this.modelName = model.name;
            }
        }
    }
    /////////////////////////////
    //alert
    ////////////////////////////
    
    presentPrompt() {
        let inp = this.historyCars;
        let alert = this.alertCtrl.create();
        for(let i = 0; i < inp.length; i++){
            alert.addInput({
                type:'radio',
                value:inp[i],
                label:inp[i].make_id+ ' ' + inp[i].model_id + ' ' + inp[i].car_number,
            })
        }
        alert.addButton({
            text: 'Ok',
            handler:(data) => {
                if(data){
                    this.rows.hide2 = true;
                    this.rows.hide3 = true;
                    this.rows.hide4 = true;
                    this.CAR.make_id = data.make_id;
                    this.CAR.model_id = data.model_id;
                    this.CAR.car_number = data.car_number;
                    
                }
            }
        })
        alert.present();
      }
}

