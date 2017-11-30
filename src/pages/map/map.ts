import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, NgZone, Input } from '@angular/core';
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
import { ViewController, NavController } from "ionic-angular";
import { NativeGeocoder, NativeGeocoderReverseResult } from "@ionic-native/native-geocoder";
import { Geolocation } from '@ionic-native/geolocation';
import { OrdersPage } from "../barrel";

declare var google;

@Component({
    selector:'map',
    templateUrl:'map.html',
    styles:
    [`
        #map {
            height: 100vw;
            width: 100%;
        }
    `],
    providers:[Geolocation,GoogleMaps]
})
export class MapGoogle implements OnInit{
    constructor(
        private viewCtrl:ViewController,
        private googleMaps: GoogleMaps,
        public geolocation: Geolocation, 
        private nativeGeocoder: NativeGeocoder,
        private nav:NavController,
        private ngZone:NgZone
    ){
           
    }
    newAddress:any = {
        address:"",
        lng:0,
        lat:0        
    };
    map:any;
    @ViewChild('map') mapElement:ElementRef;
    @Output() close = new EventEmitter<any>()
    @Input() address:any;
    ngOnInit(){
        this.loadMap(); 
    }
    ngOnChanges(){
        if(this.address){
            this.newAddress = this.address;
            if(this.address.lat != 0 && this.address.lng != 0){
                this.setNewMarker(this.address.lat, this.address.lng);
            }
            
        }
    }

    loadMap(){
        let latLng = new google.maps.LatLng(40.788546, 43.840966);
        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
    
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        this.getLatLng();
        console.log(this.map)
    }

   getLatLng(){
        this.map.addListener('click', (event) => {
                    let latitude = event.latLng.lat();
                    let longitude = event.latLng.lng();
                    this.getMyPosition(latitude, longitude);
                    console.log(latitude, longitude)
                
                });
            
    }
    private marker:any;


    getMyPosition(lat:number = 40.788546, lng:number = 43.840966){
    
       if(!this.marker){
            var marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.BOUNCE,
                position: new LatLng(lat, lng)
            });
            this.marker = marker;
       }
         
        this.marker.setPosition({
            lat:lat,
            lng:lng
        });
        this.mapAnimate(lat, lng);
        this.nativeGeocoder.reverseGeocode(lat,lng)
            .then((result: NativeGeocoderReverseResult) => {
                this.ngZone.run(()=>{
                    console.log(result)
                    this.newAddress.address = result.thoroughfare;
                    this.newAddress.lat = lat;
                    this.newAddress.lng = lng;
                    this.emit()
                })
                
            })
            .catch((error: any) => console.log(error));
        
        }
        /////////////////////////////
        private setNewMarker(lat, lng){
             if(!this.marker){
                 var marker = new google.maps.Marker({
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    position: new LatLng(lat, lng)
                    });
                this.marker = marker;
                }
         
                this.marker.setPosition({
                    lat:lat,
                    lng:lng
                });
                this.mapAnimate(lat, lng)
        }

        private mapAnimate(lat, lng){
            window.setTimeout(() => {
                this.map.panTo(new google.maps.LatLng(lat, lng));
            }, 100);
        }
        //////////////////////////
        emit(){
            this.close.emit(this.newAddress);
        }
        changeInput(){
            this.close.emit(this.newAddress);
        }
        ngOnDestroy(){
            console.log('deleted');
        }
}