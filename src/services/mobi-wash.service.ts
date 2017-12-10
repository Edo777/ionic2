import { Injectable } from "@angular/core";
import { Local } from "./barrel.service";
import { User } from "../pages/interfaces/interfaces";

@Injectable()

export class MobiWash{
    private customer_id:number;
    constructor(private localService:Local){}
/////////////////////////////////
    //inicializacia customer_id
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
    addUser(username:string, tel:string){
        
        let data = this.localService.get("data") || [];
        let isUser = data.filter((i) => i.customer_phone === tel);
        if(isUser.length){
            this.getActiveUserId(tel, data);
            return;
        }
        let user:User = {
            id:data.length,
            name: username,
            customer_phone: tel,
            car:[],
            address :[],
            order:[]
        }
        this.customer_id = user.id;
        data.push(user);
        this.localService.set('data', data);
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
        let data = this.localService.get("data") || [];
        let isNewCar = data[this.customer_id].car.findIndex((i) => {
            return (i.brand === carInfo.brand) && (i.model === carInfo.model) && (i.number === carInfo.number);
        });
        if(isNewCar >= 0){
            return;
        }
        data[this.customer_id].car.push(carInfo);
        this.localService.set('data', data);
    }

////////////////////////////////////

    editCar(oldIndex, newCar){
        let data = this.localService.get("data") || [];
        data[this.customer_id].car.splice(oldIndex, 1, newCar);
        this.localService.set('data', data);
    }

///////////////////////////////////

    removeCar(i:number){
        let data = this.localService.get("data") || [];
        
        data[this.customer_id].car.splice(i, 1);
        this.localService.set('data', data);
    }
    
///////////////////////////////////

    getCars(){
        let data = this.localService.get("data");
        return data[this.customer_id].car;        
    }
    
/////////////////////////////////
    addAddress(address:any){
        let data = this.localService.get("data") || [];
        let isNewAddress = data[this.customer_id].address.findIndex((i) => {
            return (i.address === address.address)
        });
        if(isNewAddress >= 0){
            return;
        }
        data[this.customer_id].address.push(address);
        this.localService.set('data', data);
    }
/////////////////////////////////
    getAddresses(){
        let data = this.localService.get("data");
        return data[this.customer_id].address || [];
    }
/////////////////////////////////
    removeAddress(i:number){
        let data = this.localService.get("data") || [];
        
        data[this.customer_id].address.splice(i, 1);
        this.localService.set('data', data);
    }
////////////////////////////////////
    addOrder(ord:any){
        let data = this.localService.get("data") || [];
        data[this.customer_id].order.push(ord);
        this.localService.set('data', data);
    }
    getOrder(){
        let data=this.localService.get('data');
        return data[this.customer_id].order
    }
    removeOrder(i:number){
        let data=this.localService.get('data');
        data[this.customer_id].order.splice(i,1);
        this.localService.set('data',data)
    }
}