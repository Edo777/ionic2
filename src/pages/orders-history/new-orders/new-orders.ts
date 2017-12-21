import { Component } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { ToastController, LoadingController, InfiniteScroll } from "ionic-angular";
import { TranslateService } from "../../../translate/translate.service";


@Component({
    selector:"new-orders",
    templateUrl: "new-orders.html"
})

export class NewOrders{

    data = [];
    data2 = [];
    isComnplete:boolean = true;;
    constructor(
        private api:ApiService,
        private toastCtrl:ToastController,
        private serv:TranslateService,
        private loadingCtrl:LoadingController
    ){
        let loading;
        setTimeout(() => {
            loading = this.loadingCtrl.create({
                content: this.serv.translateImportant("Խնդրում եմ սպասել․․․", 'Please wait...')
            });
            loading.present();
        })
        
                 
        this.api.getOrders("active").subscribe(
                (data)=>{
                    console.log(data)
                    this.data = data;
                    for(let i = 0; i < 6; i++){
                         this.data2.push(this.data[i])
                    }
                    loading.dismiss()
                },(error)=>{
                    loading.dismiss()
                })   
                          
         }
         
         doInfinite(infiniteScroll: InfiniteScroll) {
             let k = this.data2.length;
                this.api.getOrders("active").subscribe((data) => {
                    
                    for ( let i = k; i < k+6; i++) {
                        this.data2.push( this.data[i] );
                    }

                    infiniteScroll.complete();

                if (this.data2.length > 90) {
                    infiniteScroll.enable(false);
                }
            });
        }

        copy(item){
            console.log(item);
        }


     some(item, i){
         this.data.splice(i, 1);
         item.close()
     }
    
      
}
