import { Component } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { NavParams, NavController } from "ionic-angular";


@Component({
    selector:"old-orders",
    templateUrl: "old-orders.html"
})

export class OldOrders{
    data;
    isHeader = true;
    private NAV:any;
    constructor(
        private api:ApiService,
        private params:NavParams,
        private nav:NavController
    ){
        this.NAV = nav;
        if(this.NAV.tabTitle){
            this.isHeader = false;
        }
    }
     ionViewWillEnter(){
            this.api.getOrders("active").subscribe(data=>{
                this.data= data
            },error=>{

            })
        }
}
