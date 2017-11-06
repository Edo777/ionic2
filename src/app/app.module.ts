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
    AboutUs, OrdersRegister } from '../pages/barrel';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserAccount,
    MenuComponent,
    HistoryPage,
    HeaderComponent,
    AboutUs,
    OrdersRegister
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
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
    OrdersRegister

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
