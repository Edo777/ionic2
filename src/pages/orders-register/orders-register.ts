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
import { ViewController, Platform, ToastController, Content } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';
import { Keyboard } from "@ionic-native/keyboard";



declare var google;

@Component({
    selector:'orders-register',
    templateUrl:'orders-register.html',
    providers:[Geolocation,GoogleMaps,Keyboard]
})

export class OrdersRegister{

    cars:any;
    brands:string[];
    models:string[] = [];
    localModels:string[] = [];
    //serach area closer
    isCompleteBrand:boolean = false;
    //serach area closer
    isCompleteModel:boolean = false;
    rows:any = {hide1:true, hide2:false, hide3:false, hide4:false, hide5:false};
    NEWCAR:NewOrder = {brand:'', model:'', number:'', address:'', type:'', promCode:''};
    @ViewChild(Content) content: Content;
    constructor(
        private ordersCtrl:CarsService, 
        private viewCtrl:ViewController,
        private googleMaps: GoogleMaps,
        public geolocation: Geolocation, 
        private nativeGeocoder: NativeGeocoder,
        private keyboard: Keyboard
        
    ){
        this.initializeCars();
        this.keyboard.onKeyboardShow().subscribe(
            (next)=>{
                this.content.scrollToBottom()
            }
        )
    }
    ngDoCheck(){
        this.isAllComplete();
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
        //close and open map area
        private changeMap:boolean = false;
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
           if(id === 1 && this.NEWCAR.brand != ''){
               this.isCompleteBrand = false;
               this.rows.hide2 = !this.rows.hide2;
           }else if(id === 2 && this.NEWCAR.model != ''){
               this.isCompleteModel = false;
               this.rows.hide3 = !this.rows.hide3;
           }else if(id === 3 && this.NEWCAR.number != ''){
                this.rows.hide4 = !this.rows.hide4
           }else if(id === 4 && this.NEWCAR.address != ''){
                this.rows.hide5 = !this.rows.hide5
            } 
        }
        //is all complete?
        private allComplete:boolean = false;
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

