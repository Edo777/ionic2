import { Injectable } from "@angular/core";
import { Local } from "./barrel.service";
import { User } from "../pages/interfaces/interfaces";

@Injectable()

export class MobiWash{
    private activeId:number;
    constructor(private localService:Local){}
/////////////////////////////////
    //inicializacia activeId
    private getActiveUserId(tel:any, data:any){
        let index;
        if(data.length != 0){
            index = data.findIndex((i) => tel == i.telNumber);
            if(index >= 0){
                this.activeId = data[index].id;
                 console.log('item = ', this.activeId)
            }else{
                this.activeId = data[length-1].id;
                 console.log('item length -1 = ', this.activeId)
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
        let isUser = data.filter((i) => i.telNumber === tel);
        if(isUser.length){
            this.getActiveUserId(tel, data);
            return;
        }
        let user:User = {
            id:data.length,
            name: username,
            telNumber: tel,
            car:[],
            address :[],
            order:[]
        }
        this.activeId = user.id;
        data.push(user);
        this.localService.set('data', data);
    }
    
/////////////////////////////////

    removeUser(){
        let data:string[] = this.localService.get("data");
        data.splice(this.activeId,1);
        this.idControl(data);
        this.localService.set('data', data);
        console.log('item = ', this.activeId);
    }
    
/////////////////////////////////

    addCar(carInfo:any){
        let data = this.localService.get("data") || [];
        let isNewCar = data[this.activeId].car.findIndex((i) => {
            return (i.brand === carInfo.brand) && (i.model === carInfo.model) && (i.number === carInfo.number);
        });
        if(isNewCar >= 0){
            return;
        }
        data[this.activeId].car.push(carInfo);
        this.localService.set('data', data);
    }

////////////////////////////////////

    removeCar(i:number){
        let data = this.localService.get("data") || [];
        
        data[this.activeId].car.splice(i, 1);
        this.localService.set('data', data);
    }
    
///////////////////////////////////

    getCars(){
        let data = this.localService.get("data");
        return data[this.activeId].car;        
    }
    
/////////////////////////////////
    addAddress(address:any){
        let data = this.localService.get("data") || [];
        let isNewAddress = data[this.activeId].address.findIndex((i) => {
            return (i.address === address.address)
        });
        if(isNewAddress >= 0){
            return;
        }
        data[this.activeId].address.push(address);
        this.localService.set('data', data);
    }
/////////////////////////////////
    getAddresses(){
        let data = this.localService.get("data");
        return data[this.activeId].address || [];
    }
/////////////////////////////////
    removeAddress(i:number){
        let data = this.localService.get("data") || [];
        
        data[this.activeId].address.splice(i, 1);
        this.localService.set('data', data);
    }
////////////////////////////////////
    addOrder(ord:any){
        let data = this.localService.get("data") || [];
        data[this.activeId].order.push(ord);
        this.localService.set('data', data);
    }
    getOrder(){
        let data=this.localService.get('data');
        return data[this.activeId].order
    }
    removeOrder(i:number){
        let data=this.localService.get('data');
        data[this.activeId].order.splice(i,1);
        this.localService.set('data',data)
    }
}