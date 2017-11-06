import { Component } from "@angular/core";



/*
    interface Car{
        number:string;
        model:string;
        sedan:string;
    }
*/

@Component({
    selector:'user-account',
    templateUrl:'user-account.component.html'
})

export class UserAccount{   
    //newCar:Car[];
    
    pageName:string = 'Իմ մեքենաները';

    constructor(){
        
    }
}