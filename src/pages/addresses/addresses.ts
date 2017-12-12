import { Component } from '@angular/core';
import { NavParams, ModalController, ViewController, LoadingController } from "ionic-angular";
import { MobiWash } from "../../services/barrel.service";
import { AddNewAddress } from "../barrel";

@Component({
    selector:'addresses',
    templateUrl:'addresses.html',
})

export class Addresses {
    pageName:string;
    addresses:string[];
    constructor(
        private navParams: NavParams,
        private mobiwash:MobiWash,
        private modalCtrl:ModalController,
        private viewCtrl:ViewController,
        
    ){
        this.pageName = this.navParams.get('pageName');
    }
    ngOnInit(){
        this.getAddresses();
    }
    getAddresses(){
        this.addresses = this.mobiwash.getAddresses();
        console.log(this.addresses);
    }
    removeAddress(i){
        this.mobiwash.removeAddress(i);
        this.addresses = this.mobiwash.getAddresses()
    }
    createNewAddress(address?:any, index?:number){
       var modalAddress;
       if(address){
            modalAddress=this.modalCtrl.create(AddNewAddress, {"address" :address});
       }else{
            modalAddress = this.modalCtrl.create(AddNewAddress);
       } 
       
       modalAddress.onWillDismiss((data)=>{
           if(data){
               if(data[1]){
                   this.mobiwash.editAddress(index, data[0]);
                   this.addresses = this.mobiwash.getAddresses();
               }else{
                    this.mobiwash.addAddress(data[0]);
                    this.addresses = this.mobiwash.getAddresses();
               }
               
           }
       })
        modalAddress.present()

    }
    //loading
   
}