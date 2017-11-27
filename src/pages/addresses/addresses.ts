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
    createNewAddress(){
       var modalAddress=this.modalCtrl.create(AddNewAddress);
       modalAddress.onDidDismiss((data)=>{
           if(data){
               this.mobiwash.addAddress(data);
               this.addresses = this.mobiwash.getAddresses();
           }
       })
        modalAddress.present()

    }
    //loading
   
}