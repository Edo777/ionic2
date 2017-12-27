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
import { Keyboard } from "@ionic-native/keyboard";

declare var google;

@Component({
    selector:'map',
    templateUrl:'map.html',
    styles:
    [`
        #map {
            height: 200px;
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
        private ngZone:NgZone,
        private keyBoard:Keyboard
    ){
           
    }
    newAddress:any = {
        address:"",
        long:0,
        lat:0        
    };
    map:any;
    marker:any;
    @ViewChild('map') mapElement:ElementRef;
    @Output() close = new EventEmitter<any>()
    @Input() address:any;
    @Input() isNew:boolean;



    ngOnInit(){
         this.loadMap();
        
        if(this.isNew == false){
            console.log(this.address)
            this.ngZone.run(() => {
                this.newAddress = this.address;
                
                this.setNewMarker(this.address.lat, this.address.long)
                this.emitForAddressChange()
            
            })
             return
        }
        console.log("ancav")
        this.geolocation.getCurrentPosition().then((position) => {   
                    this.newAddress.long = position.coords.longitude;
                    this.newAddress.lat = position.coords.latitude;
                    this.nativeGeocoder.reverseGeocode(position.coords.latitude,position.coords.longitude)
                    .then((result: NativeGeocoderReverseResult) => {
                        let locality = result.locality || '';
                        let subLocality = result.subLocality || '';
                        let thoroughfare = result.thoroughfare || '';
                        
                        this.ngZone.run(() => {
                            this.newAddress.address = locality + ' '+ subLocality + ' ' + thoroughfare;
                            this.setNewMarker(position.coords.latitude, position.coords.longitude);            
                            this.emitForAddressChange()
                        })
                        
                    })
                    .catch((error: any) => console.log(error));
                    this.emitForAddressChange()
                
            }).catch((err) => {
                console.log(err)
            })
            //keyboard close
            this.keyboardEnterButton();
        
    }


    keyboardEnterButton(){
     var elems = document.getElementsByTagName('ion-input');
     for(let i = 0; i < elems.length; i++){
          elems[i].addEventListener('keypress', (event:any) =>{
            if(event.key == "Enter"){
              this.keyBoard.close()
            }
        })
     }
      
   }

    ngOnChanges(){
        if(this.address){
            this.ngZone.run(() => {
                this.newAddress = this.address;
                if(this.address.lat != 0 && this.address.long != 0){
                    
                        this.setNewMarker(this.address.lat, this.address.long);
                         this.emitForAddressChange()
                    }

            } )
           
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
        this.marker = new google.maps.Marker({
                    map: this.map,
                    animation: google.maps.Animation.DROP
        });
        console.log(this.map)
    }

   getLatLng(){
        this.map.addListener('click', (event) => {
                    let latitude = event.latLng.lat();
                    let longitude = event.latLng.lng();                   
                    this.getMyPosition(latitude, longitude);
                    console.log(latitude, longitude)
                    console.log(this.marker)
                });
            
    }
    


    getMyPosition(lat, long){
        this.marker.setPosition({
            lat:lat,
            lng:long
        });
        this.mapAnimate(lat, long);
        this.nativeGeocoder.reverseGeocode(lat,long)
            .then((result: NativeGeocoderReverseResult) => {
                let locality = result.locality || '';
                let subLocality = result.subLocality || '';
                let thoroughfare = result.thoroughfare;
                this.ngZone.run(()=>{
                    console.log(result)
                    this.newAddress.address = locality + ' '+ subLocality + ' ' + thoroughfare;
                    this.newAddress.lat = lat;
                    this.newAddress.long = long;
                    this.emitForAddressChange()
                })
                
            })
            .catch((error: any) => console.log(error));
        
        }
        /////////////////////////////
        private setNewMarker(lat, long){
                if(!this.marker) return;
                this.marker.setPosition({
                    lat:lat,
                    lng:long
                });
                this.mapAnimate(lat, long)
        }

        private mapAnimate(lat, long){
            window.setTimeout(() => {
                this.map.panTo(new google.maps.LatLng(lat, long));
            }, 100);
        }
        //////////////////////////
        emitForAddressChange(){
            this.close.emit(this.newAddress);
        }
        changeInput(){
            this.close.emit(this.newAddress);
        }
        ngOnDestroy(){
            console.log('deleted');
        }
}