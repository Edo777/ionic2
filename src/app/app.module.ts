import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';

//components
import { MyApp } from './app.component';
import {
    HomePage ,
    UserAccount,
    MenuComponent,
    HistoryPage,
    HeaderComponent,
    AboutUs,
    OrdersRegister,
    AddCars,
    Addresses,
    AddNewAddress,
    OrdersPage,
    MapGoogle,
    OrdersList,
    CompleteOrder,
    OrderAddress,
    OrdersHistory,
    NewOrders,
    OldOrders,
    Settings,
    PhoneCall,
    OrderInfo,
    ServicesAndPrices

  } from '../pages/barrel';

//pipes

import { Translate } from "../pipes/translate";
import { CarFormatter } from "../pipes/car-formatter";

//modules

import { HttpModule } from "@angular/http";

//services
import { CarsService, Local, MobiWash } from "../services/barrel.service";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { NativeGeocoder } from "@ionic-native/native-geocoder";

import { TranslateService } from "../translate/translate.service";
import { ApiService } from "../services/api.service";
import { Keyboard } from "@ionic-native/keyboard";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserAccount,
    MenuComponent,
    HistoryPage,
    HeaderComponent,
    AboutUs,
    OrdersRegister,
    AddCars,
    Addresses,
    AddNewAddress,
    OrdersPage,
    MapGoogle,
    OrdersList,
    CompleteOrder,
    OrderAddress,
    OrdersHistory,
    NewOrders,
    OldOrders,
    Settings,
    Translate,
    PhoneCall,
    CarFormatter,
    OrderInfo,
    ServicesAndPrices
  ],
  imports: [
    BrowserModule,
    FormsModule,

    HttpModule,
    IonicModule.forRoot(MyApp,{
      mode: 'md',
      tabsPlacement: 'top',
      platforms: {
          ios: {
            backButtonText: '',
            iconMode: 'ios',
          },
          android:{
            backButtonText: '',
          }
       }
			})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserAccount,
    MenuComponent,
    HistoryPage,
    HeaderComponent,
    AboutUs,
    OrdersRegister,
    AddCars,
    Addresses,
    AddNewAddress,
    OrdersPage,
    MapGoogle,
    OrdersList,
    CompleteOrder,
    OrderAddress,
    OrdersHistory,
    NewOrders,
    OldOrders,
    Settings,
    PhoneCall,
    OrderInfo,
    ServicesAndPrices
  ],
  providers: [
    Geolocation,
    CarsService,
    NativeGeocoder,
    Local,
    MobiWash,
    Camera,
    StatusBar,
    SplashScreen,
    TranslateService,
    ApiService,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
