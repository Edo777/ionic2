import { Injectable } from "@angular/core";
import { Local } from "./barrel.service";
import { User } from "../pages/interfaces/interfaces";

@Injectable()

export class MobiWash{
    public activeId:number;
    constructor(private localService:Local){}

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
    //for id
    private idControl(data){
        for(let i = 0; i < data.length; i++){
            data[i].id = i;
        }
    }

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

    

    removeUser(){
        let data:any[] = this.localService.get("data");
        data.splice(this.activeId,1);
        this.idControl(data);
        this.localService.set('data', data);
        console.log('item = ', this.activeId)
    }

    addCar(id:number, car:any){
        this.localService.set('oldcars' + id, car);
    }
    addAddress(id:number, address:any){
        this.localService.set('oldaddreses' + id, address);
    }
    removeCar(){
        
    }
}