import { Injectable } from "@angular/core";
import { Local } from "./barrel.service";
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

/////////////////////////////////


/////////////////////////////////
    addUser(){
        if(!this.localService.get("addresses")){
            this.localService.set("addresses", []);
            this.localService.set("cars", []);
        }
    }

    setPhoneAndId(phone_number, id){
        this.api.setId(id);
        this.localService.set("phone_number", Number(phone_number));
        this.localService.set("id", Number(id));
    }
/////////////////////////////////

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
}
