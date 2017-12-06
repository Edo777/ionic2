import { Component } from '@angular/core';


@Component({
    selector:"new-orders",
    templateUrl: "new-orders.html"
})

export class NewOrders{
     some(item){
         console.log('close')
         item.close()

     }
}
