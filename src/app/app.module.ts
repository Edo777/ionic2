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
    OrderAddress
  } from '../pages/barrel';
//pipes
import { FilterPipe } from "../pipes/loop-pipe";

//modules

import { HttpModule, Http } from "@angular/http";

//services
import { CarsService, Local, MobiWash } from "../services/barrel.service";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { NativeGeocoder } from "@ionic-native/native-geocoder";




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
    FilterPipe,
    AddCars,
    Addresses,
    AddNewAddress,
    OrdersPage,
    MapGoogle,
    OrdersList,
    CompleteOrder,
    OrderAddress
  ],
  imports: [
    BrowserModule,
    FormsModule,

    HttpModule,
    IonicModule.forRoot(MyApp,{ 
      platforms: {
          ios: {
            backButtonText: ' Հետ',
            iconMode: 'ios',
          },
          android:{
            backButtonText: ' Հետ',
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
    OrderAddress
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
