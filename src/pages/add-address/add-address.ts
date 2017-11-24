import { Component, ViewChild, ElementRef } from '@angular/core';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker,
 LatLng,
 ILatLng,

} from '@ionic-native/google-maps';
import { ViewController } from "ionic-angular";

@Component({
    selector:'add-address',
    templateUrl:'add-address.html'
})
export class AddNewAddress{
    constructor(
        private viewCtrl:ViewController
    ){}
    newAddress:any;
    @ViewChild('map') mapElement:ElementRef;


     closeRegister(){
        this.viewCtrl.dismiss()
    }
}