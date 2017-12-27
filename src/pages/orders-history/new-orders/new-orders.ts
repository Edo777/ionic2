import { Component } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { ToastController, LoadingController, InfiniteScroll, Platform, NavController, App, ModalController } from "ionic-angular";
import { TranslateService } from "../../../translate/translate.service";
import { OrdersRegister, OrdersList } from "../../barrel";
import { OrderInfo } from '../barrel-orders';


@Component({
    selector:"new-orders",
    templateUrl: "new-orders.html"
})

export class NewOrders{

    data = [];
    data2 = [];
    viewHeight:number;
    isComnplete:boolean = true;;
    constructor(
        private api:ApiService,
        private toastCtrl:ToastController,
        private serv:TranslateService,
        private loadingCtrl:LoadingController,
        private platform: Platform,
        private navCtrl:NavController,
        private app:App,
        private modal:ModalController

    ){}
    //life cicle ionic
    ionViewWillEnter(){
        this.viewHeight = this.platform.height(); 
        this.data2 = []
        let loading;
        
        loading = this.loadingCtrl.create({
            content: this.serv.translateImportant("Խնդրում եմ սպասել․․․", 'Please wait...')
        });
        loading.present();
     
        
                 
        this.api.getOrders("active").subscribe(
                (data)=>{
                    
                    this.data = data;
                    
                    this.viewHeight = Math.floor(this.viewHeight/100)
                    console.log("height", this.viewHeight)
                    if(this.viewHeight > this.data.length){
                       for(let i = 0; i < this.data.length; i++){
                            this.data2.push(this.data[i])
                        }
                    }else{
                        for(let i = 0; i < this.viewHeight; i++){
                         this.data2.push(this.data[i])
                        }
                    }
                    
                    
                },(error)=>{
                    loading.dismiss()
                },
                () => {
                    loading.dismiss()
                }
            
            ) 
    }
         
         doInfinite(infiniteScroll: InfiniteScroll) {
             if(this.data.length != this.data2.length){
                setTimeout(() => {
                 let currentLength = this.data2.length;
                 let loadingLength = currentLength + this.viewHeight;
                 if(loadingLength > this.data.length){
                    loadingLength = this.data.length;
                 }
                this.api.getOrders("active").subscribe((data) => {
                    
                    for ( let i = currentLength; i < loadingLength; i++) {
                        this.data2.push( this.data[i] );
                    }

                    infiniteScroll.complete();
                 });
             }, 2000)
             }else{
                 infiniteScroll.complete();
             }
             
        }

        copy(item){
            
           console.log("item = ", item)
            let cars = [];
            for(let i = 0; i < item.cars.length; i++){
               
                let currentCar = {
                    make_id:item.cars[i].car_make,
                    model_id:item.cars[i].car_model,
                    car_number:item.cars[i].car_number,
                    service:item.cars[i].service_id,
                    type:"new"
                }
                if(!item.cars[i].type){
                    delete currentCar.type
                }
                cars.push(currentCar);
            }
            
           (this.app.getActiveNav().parent).parent.push(OrdersList,{"cars" : cars}) 
        }

    updateOrder(item, status){
      let loading = this.loadingCtrl.create({
                content: this.serv.translateImportant("Խնդրում եմ սպասել․․․", 'Please wait...')
            });
            loading.present();
        this.api.updateOrder(item, status).subscribe(
            (data) => {
                let viewLength = this.data2.length;
                this.api.getOrders("active").subscribe(
                    (data) => {
                        this.data2 = []
                        this.data = data;
                        for(let i = 0; i < viewLength; i++){
                            this.data2.push(this.data[i]);
                        }
                    },
                    (error) =>{
                        loading.dismiss()
                    },
                    () => {
                        loading.dismiss()
                    }
                )
            }
        )
    }

     some(item, i){
         this.data.splice(i, 1);
         item.close()
     }
     more(info){
         var modal = this.modal.create(OrderInfo, {"info" : info});
         modal.present()
     }
    
      
}
