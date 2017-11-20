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

import { Component, ViewChild, ElementRef } from '@angular/core';
import { CarOrder, NewOrder, Brand, Model } from '../interfaces/interfaces';
import { CarsService } from "../../services/cars.service";
import { ViewController, Platform, ToastController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';



declare var google;

@Component({
    selector:'orders-register',
    templateUrl:'orders-register.html',
    providers:[Geolocation,GoogleMaps]
})

export class OrdersRegister{

    cars:any;
    brands:string[];
    models:string[] = [];
    localModels:string[] = [];
    isCompleteBrand:boolean = false;
    isCompleteModel:boolean = false;
    rows:any = {hide1:true, hide2:false, hide3:false, hide4:false};
    NEWCAR:NewOrder = {brand:'', model:'', number:''};

    constructor(
        private ordersCtrl:CarsService, 
        private viewCtrl:ViewController,
        private googleMaps: GoogleMaps,
        public geolocation: Geolocation, 
        private nativeGeocoder: NativeGeocoder
    ){
        this.initializeCars();
    }
    
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    checkModelButton(model, val){
        this.NEWCAR.brand = val;
        this.models = model.models;
    }
    //get cars from service
    initializeCars() {
        this.ordersCtrl.getResults()
        .subscribe(data=>{
            this.cars = data;
        });
     }
     getBrands(ev: any){
        this.initializeCars();
        let val = ev.target.value;
        if (val && val.trim() != '' ) {
            this.brands = this.cars.filter((item) => {
                return (item.value.toLowerCase().startsWith(val.toLowerCase()));
            })
        }else{
            this.brands = []
        }
        console.log(this.NEWCAR)
     }
     getModels(ev: any){
        let val = ev.target.value;
        if (val && val.trim() != '' && this.models.length) {
            this.localModels = this.models.filter((item:any) => {
                return (item.value.toLowerCase().startsWith(val.toLowerCase()));
            })
        }else{
            this.localModels = []
        }
    }
    
    closeRegisterPage(){
         let data = this.NEWCAR
          this.viewCtrl.dismiss(data);
          console.log(data)
    }

    ionViewDidLoad(){
         this.loadMap();
         this.getLatLng();
    }
    

    
  loadMap(){
 
 //   this.geolocation.getCurrentPosition().then((position) => {
 //40.794403, 43.839536
      let latLng = new google.maps.LatLng(40.788546, 43.840966);
      let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      console.log(this.map)

 //   }, (err) => {
  //    console.log(err);
 //   });
 
  }
    getLatLng(){
        this.map.addListener('click', (event) => {
                let latitude = event.latLng.lat();
                let longitude = event.latLng.lng();
                this.getMyPosition(latitude, longitude);
                console.log(latitude, longitude)
                });
            
    }
    //////////////////////
    private marker:any;
    ///////////////////
    getMyPosition(lat:number = 40.788546, lng:number = 43.840966){
        
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
          

        this.nativeGeocoder.reverseGeocode(lat, lng)
            .then((result: NativeGeocoderReverseResult) => this.addInfoWindow(this.marker, `${result.locality} ${result.thoroughfare}`))
            .catch((error: any) => console.log(error));

        
    
    }

    addInfoWindow(marker, content){
    
    let infoWindow = new google.maps.InfoWindow({
        content: content
    });
    //stex bdi enenq
    google.maps.event.addListener(marker, 'click', (event) => {
        console.log('helloooooooo', event);
        infoWindow.open(this.map, marker);
    });
    
    }

}

