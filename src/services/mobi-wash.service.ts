import { Injectable } from "@angular/core";
import { Local } from "./barrel.service";
import { User } from "../pages/interfaces/interfaces";
import { CarsService } from "./cars.service";
import { ApiService } from "./api.service";

@Injectable()

export class MobiWash{
    private customer_id:number;
    private allCars = [];
    customerDetails:any;
    constructor(private localService:Local, private api:ApiService){
       this.api.getAllcars().subscribe(
           (data) => {
               this.allCars = data;
           }
       )
    }
/////////////////////////////////
    //inicializacia customer_id
    public setActiveUser(id){
        this.customer_id = id;

    }
    //active
    
    private getActiveUserId(tel:any, data:any){
        let index;
        if(data.length != 0){
            index = data.findIndex((i) => tel == i.customer_phone);
            if(index >= 0){
                this.customer_id = data[index].id;
                 console.log('item = ', this.customer_id)
            }else{
                this.customer_id = data[length-1].id;
                 console.log('item length -1 = ', this.customer_id)
            }
        }
    }
/////////////////////////////////
    //for id
    private idControl(data){
        for(let i = 0; i < data.length; i++){
            data[i].id = i;
        }
    }
/////////////////////////////////
    addUser(){
        if(!this.localService.get("addresses")){
            this.localService.set("addresses", []);
            this.localService.set("cars", []);
        }
    }
    
    setPhoneAndId(phone_number, id){
        this.api.setId(id);
        this.localService.set("phone_number", phone_number);
        this.localService.set("id", Number(id));
    }
/////////////////////////////////

    removeUser(){
        let data:string[] = this.localService.get("data");
        data.splice(this.customer_id,1);
        this.idControl(data);
        this.localService.set('data', data);
        console.log('item = ', this.customer_id);
    }
    
/////////////////////////////////
    
    addCar(carInfo:any){
        let cars = this.localService.get("cars") || [];
        
        if(Array.isArray(carInfo)){
            for(let i = 0; i < carInfo.length; i++){
            let newCurrentCar = true;
            let currentCar= carInfo[i];
                for(let j = 0; j < cars.length; j++){
                    if((currentCar.make_id == cars[j].make_id) && (currentCar.model_id == cars[j].model_id) && (currentCar.car_number == cars[j].car_number)){
                        newCurrentCar = false;
                        break;
                    }
                }
                if(newCurrentCar){
                    cars.push(currentCar)
                }
          }
        }else{
            let newCar = true;
            for(let j = 0; j < cars.length; j++){
                if((carInfo.make_id == cars[j].make_id) && (carInfo.model_id == cars[j].model_id) && (carInfo.car_number == cars[j].car_number)){
                    newCar = false;
                    break;
                }
            }
            if(newCar){
                cars.push(carInfo)
            }
        }
        this.localService.set("cars", cars);
    }

////////////////////////////////////

    editCar(oldIndex, newCar){
        let cars = this.localService.get("cars") || [];
        cars.splice(oldIndex, 1, newCar);
        this.localService.set('cars', cars);
    }

///////////////////////////////////

    removeCar(i:number){
        let cars = this.localService.get("cars") || [];
        
        cars.splice(i, 1);
        
        this.localService.set('cars', cars);
    }
    
///////////////////////////////////

    getCars(){
        let cars = this.localService.get("cars");
        /*
        for(let i = 0; i < cars.length; i++){
            if(!cars[i].type){
                console.log((this.allCars).length)
                for(let j = 0; j < this.allCars.length; j++){
                    if((cars[i].make_id) == this.allCars[j].id){
                        let models = this.allCars[j].models;
                        for(let k = 0; k < models.length; k++){
                            if(models[k].id == cars[i].model_id){
                                cars[i]["models"] = models;
                                cars[i].model_id = models[k].name;
                                cars[i].make_id = this.allCars[j].name;
                                break;
                            }
                        }
                    }
                }
            }
        }
        console.log(cars)
        */
        return cars;
    }
///////////////////////////////////

editAddress(oldIndex, newAddress){
    let addresses = this.localService.get("addresses") || [];
    addresses.splice(oldIndex, 1, newAddress);
    this.localService.set("addresses", addresses);
}
    
/////////////////////////////////
addAddress(a:any){
    let addresses = this.localService.get("addresses");
    if (addresses.length == 0){
        addresses.push(a);
        this.localService.set('addresses', addresses);
    }else{
        let isNewAddress = addresses.findIndex((i) => {
            return ((i.address === a.address) && (i.long == a.long) && (i.lat == a.lat))
        });
        if(isNewAddress >= 0){
            return;
        }
        addresses.push(a)
        this.localService.set('addresses', addresses);
    }
}
/////////////////////////////////
    getAddresses(){
        let addresses = this.localService.get("addresses") || [];
        return addresses
    }
/////////////////////////////////
    removeAddress(i:number){
        let addresses = this.localService.get("addresses") || [];
        addresses.splice(i, 1);
        this.localService.set('addresses', addresses);
    }
////////////////////////////////////
    addOrder(ord:any){
        let data = this.localService.get("data") || [];
        data[this.customer_id].order.push(ord);
        this.localService.set('data', data);
    }
    getOrder(){
        let data=this.localService.get('data');
        return [];
       // return data[this.customer_id].order
    }
    removeOrder(i:number){
        let data=this.localService.get('data');
        data[this.customer_id].order.splice(i,1);
        this.localService.set('data',data)
    }

}