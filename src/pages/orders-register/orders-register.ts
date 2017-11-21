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
    rows:any = {hide1:true, hide2:false, hide3:false, hide4:false, hide5:false};
    NEWCAR:NewOrder = {brand:'', model:'', number:'', address:'', type:'', promCode:''};

    constructor(
        private ordersCtrl:CarsService, 
        private viewCtrl:ViewController,
        private googleMaps: GoogleMaps,
        public geolocation: Geolocation, 
        private nativeGeocoder: NativeGeocoder
    ){
        this.initializeCars();
    }
    ngDoCheck(){
        this.isAllComplete()
    }
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('mapik') inputElement:any;
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
    

    
  loadMap(){
 
 //   this.geolocation.getCurrentPosition().then((position) => 

      let latLng = new google.maps.LatLng(40.788546, 43.840966);
      let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
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
                this.mapChange();
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
            .then((result: NativeGeocoderReverseResult) => {
                this.NEWCAR.address = result.locality;
                this.inputElement.value = result.thoroughfare;
            })
            .catch((error: any) => console.log(error));
        
        }
        //////////////
            private changeMap:boolean = false;
        /////////////
        mapChange(){
            if(document.getElementById('map').style.display == 'block'){
                document.getElementById('map').style.display = 'none';
            }else{
                document.getElementById('map').style.display = 'block';
            }
            
        }

        //////////////////////////////////
        //for constrol errors in time click ok
        complete(id){
           if(id === 1){
               this.isCompleteBrand = false;
               this.rows.hide2 = !this.rows.hide2;
           }else if(id === 2){
               this.isCompleteModel = false;
               this.rows.hide3 = !this.rows.hide3;
           }  
        }
        //is all complete?
        allComplete:boolean = false;
        isAllComplete(){
            for(let i in this.NEWCAR){
                if(this.NEWCAR[i] === ''){
                    this.allComplete = false;
                    return;
                }
                this.allComplete = true;
            }
        }
}

