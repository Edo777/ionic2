import { Component } from '@angular/core';
import { ApiService } from "../../../services/api.service";


@Component({
    selector:"old-orders",
    templateUrl: "old-orders.html"
})

export class OldOrders{
    data
    constructor(
        private api:ApiService
    ){

    }
     ionViewWillEnter(){
            this.api.getOrders("active").subscribe(data=>{
                this.data= data
            },error=>{

            })
        }
}
