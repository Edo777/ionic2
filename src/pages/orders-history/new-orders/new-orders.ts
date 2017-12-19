import { Component } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { ToastController, LoadingController } from "ionic-angular";
import { TranslateService } from "../../../translate/translate.service";


@Component({
    selector:"new-orders",
    templateUrl: "new-orders.html"
})

export class NewOrders{

    data = []
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
                    this.data= data;
                    loading.dismiss()
                },(error)=>{
                    loading.dismiss()
                })
    }

        copy(item){
            console.log(item);
        }


     some(item, i){
         this.data.splice(i, 1);
         item.close()
     }
      
}
