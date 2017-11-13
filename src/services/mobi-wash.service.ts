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
            index = data.findIndex(i => tel == i.telNumber);
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
        let isUser = data.filter(i => i.telNumber === tel);
        if(isUser.length){
            this.getActiveUserId(tel, data);
            return;
        }
        let user:User = {
            id:data.length,
            name: username,
            telNumber: tel,
            car:[],
            address :[]   
        }
        this.activeId = user.id;
        data.push(user);
        this.localService.set('data', data);
    }
/////////////////////////////////
    
/////////////////////////////////
    removeUser(){
        let data:string[] = this.localService.get("data");
        data.splice(this.activeId,1);
        this.idControl(data);
        this.localService.set('data', data);
        console.log('item = ', this.activeId)
    }

/////////////////////////////////

    addCar(carInfo:any){
        let data = this.localService.get("data") || [];
        //Armenuhi jan es greci me haty du naye ktesnis. Konkret sik el kanchel em en modal-y pakelu jamanak.
        //kparzvi vabshe petq che id-n drsic tesaneli exni iran private kenem u drsic menak funkcianery kkanchem
        //logic 
        data[this.activeId].car.push(carInfo);

        this.localService.set('data', data);
    }
/////////////////////////////////
    addAddress(id:number, address:any){
        this.localService.set('oldaddreses' + id, address);
    }
/////////////////////////////////
    removeCar(){
        
    }
/////////////////////////////////
}