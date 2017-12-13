import { Component } from '@angular/core';
import { ApiService } from "../../../services/api.service";


@Component({
    selector:"new-orders",
    templateUrl: "new-orders.html"
})

export class NewOrders{

    data = []
    constructor(
        private api:ApiService
    ){

    }
     some(item){
         console.log('close')
         item.close()

     }
        ionViewWillEnter(){
            this.api.getOrders("active").subscribe(data=>{
                this.data= data
            },error=>{

            })
        }
}
