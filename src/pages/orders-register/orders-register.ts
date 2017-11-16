import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker,
 LatLng
} from '@ionic-native/google-maps';

import { Component, ViewChild, ElementRef } from '@angular/core';
import { CarOrder, NewOrder, Brand, Model } from '../interfaces/interfaces';
import { CarsService } from "../../services/cars.service";
import { ViewController, Platform } from "ionic-angular";



@Component({
    selector:'orders-register',
    templateUrl:'orders-register.html',
})

export class OrdersRegister{

    cars:any;
    brands:string[];

    models:string[] = [];
    localModels:string[] = [];

    isCompleteBrand:boolean = false;
    isCompleteModel:boolean = false;
    
    /////////////////////////////
    public map:GoogleMap;
    public mapRendered:Boolean = false;

    ////////////////////////////
    rows:any = {hide1:true, hide2:false, hide3:false, hide4:false};

    NEWCAR:NewOrder = {brand:'', model:'', number:''};

    
    constructor(
        private ordersCtrl:CarsService, 
        private viewCtrl:ViewController,
        public plat:Platform
    ){
        this.initializeCars()
        this.plat.ready().then(() => {
            this.loadMap();
        })
    }

    

    consol(){
        console.log('hello');
    }

    
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

    //map

    ionViewDidLoad(){
        this.loadMap();
    }
 
    loadMap(){
        let location = new LatLng(47.6062, -122.3321);
        this.map = new GoogleMap('map' , {
            camera: {
                target:{
                    LatLng:location,
                },
                'tilt': 30,
                'zoom': 15,
                'bearing': 50
            }
        });
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('bhbdhbshbuhdfuhfu')
            this.mapRendered = true;
        })
    }
    getMyLocation(){
        this.map.getMyLocation().then( (location) => {
            let msg = ["i am here\n",
            "latitude:" + location.latLng.lat,
            "longitude:" + location.latLng.lng].join('\n');
            let position:CameraPosition<any> = {
                target:location.latLng,
                zoom:15
            }
            this.map.moveCamera(position);
            let markerOptions:MarkerOptions = {
                'position': location.latLng,
                'title': msg
            };
            this.map.addMarker(markerOptions).then((marker:Marker) => {
                marker.showInfoWindow();
            })
        }) 
    }       
}

