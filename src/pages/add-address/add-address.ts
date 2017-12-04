import { Component, ViewChild, ElementRef } from '@angular/core';
import { ViewController, NavController, LoadingController } from "ionic-angular";
import { NativeGeocoder, NativeGeocoderReverseResult } from "@ionic-native/native-geocoder";
import { Geolocation } from '@ionic-native/geolocation';
import { OrdersPage, MapGoogle } from "../barrel";
import { TranslateService } from "../../translate/translate.service";

declare var google;

@Component({
    selector:'add-address',
    templateUrl:'add-address.html',
})
export class AddNewAddress{
    newAddress:any;
    @ViewChild('map') map:MapGoogle;
    constructor(
        private viewCtrl:ViewController,
        private nav:NavController,
        public loadingCtrl: LoadingController,
        private translateService:TranslateService
    ){}
    ngOnInit(){
        this.presentLoadingDefault()
    }
    
    closeRegister(){
        this.viewCtrl.dismiss(this.newAddress);
    }

    presentLoadingDefault() {
        let loading = this.loadingCtrl.create({
            content: this.translateService.translateImportant("Խնդրում եմ սպասել․․․", 'Please wait...')
        });

        loading.present();

        setTimeout(() => {
            loading.dismiss();
        }, 2000);
    }
    setNewAddress(a){
        this.newAddress=a
    }
}