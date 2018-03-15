import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { MenuComponent, OrdersHistory, CompleteOrder } from "../barrel";
import { MobiWash } from "../../services/barrel.service";
import { TranslateService } from "../../translate/translate.service";
import { ApiService } from "../../services/api.service";
import { CarsService } from "../../services/cars.service";
import { Keyboard } from '@ionic-native/keyboard';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
    
   activeLng:any;
   localActiveLng:string;
   activeLngText:string;
   activeFlag:string;

  isComplete:boolean = false;
  name:string = '';
  phoneNumber:string = '';
  refCode=""
  email:string;
  
  constructor(
    public navCtrl: NavController, 
    private mobiWash:MobiWash, 
    private serv:TranslateService,
    private api:ApiService,
    private toastCtrl:ToastController,
    private loadingCtrl:LoadingController,
    private carsService:CarsService,
    private keyBoard:Keyboard
  ) {
    this.activeLng = this.serv.getActiveLng();
    
  }
  ngOnInit(){
     this.localActiveLng = this.activeLng.lng;
     this.activeLngText = this.activeLng.text;
     this.activeFlag = this.activeLng.flag;
     if(localStorage.getItem("phone_number")){
        this.api.setId(localStorage.getItem("id"))
        this.api.setPhoneNumber(localStorage.getItem("phone_number"));
        console.log(this.api.getId())
        this.navCtrl.setRoot(MenuComponent);
        
        this.api.getCustomerDetails(71).subscribe((data) =>{
          console.log("dataaaaaaaaaa", data)
        }) 
        //this.navCtrl.push(CompleteOrder)
     }
      this.keyboardEnterButton()

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

  ngDoCheck(){
    if(this.name != '' && this.phoneNumber.length === 8){
      this.isComplete = true;
    }else{
       this.isComplete = false;
    }
  }
  
  changeLng(){
        this.activeLngText = this.serv.translateImportant("Հայերեն", "English");
        if(this.localActiveLng == "en"){
            this.localActiveLng = "arm"
            this.activeFlag = 'assets/imgs/english.png'
        }else{
            this.localActiveLng = "en";
            this.activeFlag = 'assets/imgs/drosh.jpg';
        }
        let getter = {
          lng:this.localActiveLng,
          text:this.activeLngText,
          flag:this.activeFlag
        }
        this.serv.setActiveLng(getter);
    }



  createAccount(){
    //this.navCtrl.setRoot(MenuComponent);

      let loading = this.loadingCtrl.create({
            content: this.serv.translateImportant("Խնդրում ենք սպասել․․․", 'Please wait...')
        });
      loading.present();
      this.phoneNumber = '+374' + this.phoneNumber;
      this.api.registration(this.name,this.phoneNumber,this.email,this.refCode,"qwertyuoiuytred5343468757").subscribe( 
      
      (data)=>{
        
        console.log(data)
        if(this.carsService.ok && (data["status"]=="ok" || data["status"] == "success")){
          //mobiwash service
          this.mobiWash.addUser();
          this.mobiWash.setPhoneAndId(this.phoneNumber, data["data"].id)
          //api service
          this.api.setId(data["data"].id);
          this.api.setPhoneNumber(this.phoneNumber);
          setTimeout(() => {
            loading.dismiss();
            this.navCtrl.setRoot(MenuComponent);
          }, 1000)
          
        }else {
          setTimeout(() => {
            loading.dismiss();
          }, 1000)
          let message = this.serv.translateImportant("Բացակայում է ինտերնետ կապը","No internet connection")
          this.showToast(message);
        }
    },
      (error)=>{
        let message = this.serv.translateImportant("Բացակայում է ինտերնետ կապը","No internet connection")
        setTimeout(() => {
          loading.dismiss();
        }, 1000)
        this.showToast(message);
    })
    
    
    
    
    
    //this.navCtrl.setRoot(OrdersHistory);
    
  }
  phoneNumberControl:boolean = false;
 

  showToast(err) {
    let toast = this.toastCtrl.create({
      message: `${err}`,
      duration: 2000,
      position: "top"
    });

    toast.present(toast);
  }


}