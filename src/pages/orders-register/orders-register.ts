import { Component } from '@angular/core';
import { CarOrder, NewOrder } from '../interfaces/interfaces';
import { CompleteTestService } from "../../services/cars.service";
import { ViewController } from "ionic-angular";

const ORDER:CarOrder[] = [
    {input:'Մեքենայի մակնիշ', model:'', numbers:0, address:'', sedan:'' , bool:false},
    {input:'Մեքենայի Համարանիշ', model:'', numbers:0, address:'', sedan:'' , bool:false},
    {input:'Հասցե', model:'', numbers:0, address:'', sedan:'' , bool:false },
    {input:'Սեդան', model:'', numbers:0, address:'', sedan:'' , bool:false }
]

@Component({
    selector:'orders-register',
    templateUrl:'orders-register.html',
})

export class OrdersRegister{
    searchQuery: string = '';
    brands: string[];
    models:string[];
    order:CarOrder[] = ORDER;
    //variable who get the value from data.json
    cars:any; 
    //car params
    activeCarBrand:string;
    activeCarModel:string;
    //variable who close the searchlist after complete brand
    isBrandComplete:boolean = false;

    NEWORDER:NewOrder = {brand:'', model:''};

    constructor(private completeTestService:CompleteTestService, private viewCtrl:ViewController){

        this.initializeCars()
    }

    //get cars from service
    initializeCars() {
        this.completeTestService.getResults()
        .subscribe(data=>{
            this.cars = data;
        });;
     }


    conf(i){
        if(i != this.order.length - 1){
            this.order[i+1].bool = true;
        }  
        console.log(this.cars)
    }

    //set new order brand in  this.NEWORDER.brand
    completeBrand(){
        this.NEWORDER.brand = this.activeCarBrand;
    }

    setCar(val){
        this.activeCarBrand = val;
        this.isBrandComplete = true;
    }
    
    //dismiss the modal
    dis(){
          this.viewCtrl.dismiss();
    }

    // searchbar logic
    getBrands(ev: any) {
        this.isBrandComplete = false;
        this.initializeCars();
        
        let val = ev.target.value;

        if (val && val.trim() != '') {
        this.brands = this.cars.filter((item) => {
            return (item.value.toLowerCase().startsWith(val.toLowerCase()));
        })
        }else{
            this.brands = []
        }
    }
    // searchbar logic
    getModels(ev: any) {
        this.initializeCars();
        
        let val = ev.target.value;

        if (val && val.trim() != '') {
        this.models = this.cars.filter((item) => {
            item.models.filter((model) => model.value.toLowerCase().startsWith(val.toLowerCase()));
        })
        }else{
            this.models = []
        }
    }

}

