import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { CarOrder, NewOrder, Brand, Model } from '../interfaces/interfaces';
import { CarsService } from "../../services/cars.service";
import { ViewController, Platform, Content, Nav, NavController, App, AlertController, NavParams, LoadingController, ToastController } from "ionic-angular";
import { Keyboard } from "@ionic-native/keyboard";
import { MobiWash } from "../../services/barrel.service";
import { AddNewAddress, CompleteOrder } from "../barrel"
import { TranslateService } from "../../translate/translate.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";





@Component({
    selector:'orders-register',
    templateUrl:'orders-register.html',
    providers:[Keyboard]
})

export class OrdersRegister implements OnInit,AfterViewInit{
    //edit order
    private orderEdit:any;
    
    private modelName; brandName; carNumber; service; qim; nano;
    private prices;
    private todo: FormGroup;

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
    CAR:NewOrder = {make_id:'', model_id:'', car_number:'',  service: "", type:""};
    selectedPrice = [0,0,0]
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
        private loadingCtrl:LoadingController,
        private formBuilder: FormBuilder,
        private toastCtrl:ToastController,
        private keyBoard:Keyboard
        
    ){
        this.initializeCars();
        this.todo = this.formBuilder.group({
            make_id: ['', Validators.required],
            model_id: ['',Validators.required],
            car_number:['',Validators.required],
        });
    }

    keyboardEnterButton(){
     var elems = document.getElementsByTagName('ion-input');
     for(let i = 0; i < elems.length; i++){
          elems[i].addEventListener('keypress', (event:any) =>{
            if(event.key == "Enter"){
              this.keyBoard.close()
            }
        })
     }
      
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
        this.isHasDataWhenModalOpen();
        this.keyboardEnterButton();
        this.prices = [
            [1999, 2999, 3999],
            [1499, 1999, 2999],
            [999, 1499, 1999],
            [6999,7999,8999], 
            [1499, 1499,1499]
        ]
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
    ngAfterContentChecked(){
        this.keyboardEnterButton();
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
        if (val && val.trim() != '' && this.models) {
            this.localModels = this.models.filter((item:any) => {
                return (item.name.toLowerCase().startsWith(val.toLowerCase()));
            })
        }else{
            this.localModels = []
        }
    }
    
    completeRegisterPage(){
        console.log(this.todo)
        this.CAR = this.todo.value;
        
        this.carTypeControl();
        this.viewCtrl.dismiss(this.CAR);
        
    }

    ///////////////////////////

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
    pr(){
        console.log("q", this.qim)
    }
   
    radioDisable(id){
        
    }
    calcPrice(){
            setTimeout( () => {
                this.content.scrollToBottom();
            }, 100)
            for(let i=0;i<3;i++){
                if(this.service){
                    this.selectedPrice[i]=this.prices[this.service-1][i]+0
                }
                if(this.qim){
                    this.selectedPrice[i] += this.prices[3][i];
                }
                if(this.nano){
                    this.selectedPrice[i] += (this.prices[4][i] - 499);
                }else{
                    
                }
            }          
    }
    private carTypeControl(){
        
        this.CAR["make_id"] = this.brandName;
        this.CAR["model_id"] = this.modelName;
        this.CAR["service"] = this.service;
        if(this.qim){
            this.CAR["service"] += ",5"
        }
        if(this.nano){
            this.CAR["service"] += ",4"
        }
        this.CAR["type"] = "new";
        for(let brand of this.cars){
            if(brand.name.toLowerCase() == this.brandName.toLowerCase()){
               
                for(let model of brand.models){
                    if(model.name.toLowerCase() == this.modelName.toLowerCase()){
                        
                        this.CAR["make_id"] = brand.id;
                        this.CAR["model_id"] = model.id;
                        delete this.CAR["type"];
                        break;
                    }
                };
                break;
            }         
        };
    }

    isHasDataWhenModalOpen(){
        let orderEdit = this.params.data["orderEdit"];
        if(orderEdit){
            
            this.orderEdit = orderEdit;
            this.rows.hide2 = true;
            this.rows.hide3 = true;
            this.rows.hide4 = true;
            this.carNumber = this.orderEdit.car_number;
            this.service = parseInt(this.orderEdit.service);
            if(this.orderEdit.service.length == 3){
                this.nano = true;
            }else if(this.orderEdit.service.length == 5){
                this.nano = true;
                this.qim = true;
            }
            if(orderEdit.type == "new"){
                
                let brand = this.cars.find((element) => orderEdit.make_id.toLowerCase() == element.name.toLowerCase());
                if(brand){
                    this.models = brand.models;
                    console.log("this.models ", this.models)
                }
                this.brandName = this.orderEdit.make_id;
                this.modelName = this.orderEdit.model_id;
            }else{
            
               let brand = this.cars.find((element) => orderEdit.make_id == element.id);
               let model = brand.models.find((element) => orderEdit.model_id == element.id);
               console.log("brand ",brand.models)
               this.brandName = brand.name;
               this.modelName = model.name;
               
               this.models = brand.models;
               
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
            if(inp[i].type == "new"){
                    alert.addInput({
                    type:'radio',
                    value:inp[i],
                    label:inp[i].make_id + ' ' + inp[i].model_id + ' ' + inp[i].car_number,
                })
            }else{
                 let brand = this.cars.find((element) => inp[i].make_id == element.id);
                 if(!brand){
                     return
                 }
                 let model = brand.models.find((element) => inp[i].model_id == element.id)
                 
                 alert.addInput({
                    type:'radio',
                    value:inp[i],
                    label:brand.name + ' ' + model.name + ' ' + inp[i].car_number,
                 })
             }
        }
        alert.addButton({
            text: 'Ok',
            handler:(data) => {
                //////////////////////////
                console.log(data)
                if(data){
                    let brand = this.cars.find((element)=>element.id == data.make_id);
                    if(brand){
                        this.models = brand.models;
                    }
                    this.carNumber = data.car_number;
                    this.rows.hide2 = true;
                    this.rows.hide3 = true;
                    this.rows.hide4 = true;
                    if(data.type == "new"){
                        this.brandName = data.make_id;
                        this.modelName = data.model_id;
                    }else{
                        let brand = this.cars.find((element)=>element.id==data.make_id)
                        console.log(brand)
                        let model = brand.models.find((element)=>element.id==data.model_id)
                        this.models = brand.models;
                        this.brandName = brand.name;
                        this.modelName = model.name;
                    }            
                }              
            }
        })
        alert.present();
      }
}

