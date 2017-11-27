import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { OrdersPage } from "../barrel";

@Component({
    selector:'complete-order',
    templateUrl:'complete-order.html'
})

export class CompleteOrder{
    constructor(private nav:NavController){
        
    }
    goToStart(){
        this.nav.setRoot(OrdersPage)
    }
}