import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker,
 LatLng,

} from '@ionic-native/google-maps';

import { Component, ViewChild, ElementRef } from '@angular/core';
import { CarOrder, NewOrder, Brand, Model } from '../interfaces/interfaces';
import { CarsService } from "../../services/cars.service";
import { ViewController, Platform } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
    selector:'orders-register',
    templateUrl:'orders-register.html',
    providers:[Geolocation]
})

export class OrdersRegister{

    cars:any;
    brands:string[];

    models:string[] = [];
    localModels:string[] = [];

    isCompleteBrand:boolean = false;
    isCompleteModel:boolean = false;
    
    /////////////////////////////
 
    ////////////////////////////
    rows:any = {hide1:true, hide2:false, hide3:false, hide4:false};

    NEWCAR:NewOrder = {brand:'', model:'', number:''};

    
    constructor(
        private ordersCtrl:CarsService, 
        private viewCtrl:ViewController,
        public geolocation: Geolocation
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
    }
    ngDoCheck(){
        this.loadMap();
    }
 

  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
 
  }
getMyPosition(){
 
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        
                
        
        this.addInfoWindow(marker, 'content');
    
    }
    addInfoWindow(marker, content){
    
    let infoWindow = new google.maps.InfoWindow({
        content: content
    });
    
    google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
    });
    
    }
}

