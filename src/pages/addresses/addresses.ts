import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
import { MobiWash } from "../../services/barrel.service";

@Component({
    selector:'addresses',
    templateUrl:'addresses.html',
})

export class Addresses {
    pageName:string;
    addresses:string[];
    constructor(private navParams: NavParams, private mobiwash:MobiWash){
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
}