import { Component} from "@angular/core";
import { NavParams, LoadingController, ToastController } from "ionic-angular";
import { MobiWash } from "../../services/barrel.service";
import { ApiService } from "../../services/api.service";
import { TranslateService } from "../../translate/translate.service";

@Component({
    selector:'settings',
    templateUrl:'settings.html'
})

export class Settings{
    pageName:string;
    customerDetails:any;
    phone:any;
    email:any;
    name:any;
    prom_code:any;
    constructor(private navParams: NavParams, private api:ApiService, private loadingCtrl:LoadingController, private translate:TranslateService, private toastCtrl:ToastController){
        this.pageName = this.navParams.get('pageName');
        setTimeout(() => {
            let loading = this.loadingCtrl.create({
            content: this.translate.translateImportant("Խնդրում եմ սպասել․․․", 'Please wait...')
        });
        loading.present();
        
        this.api.getCustomerDetails().subscribe(

                (data) => {
                    this.customerDetails = data[0];
                    this.phone = this.customerDetails.phone
                    this.email = this.customerDetails.email;
                    this.name = this.customerDetails.name
                    this.prom_code = this.customerDetails.promo_code;
                    loading.dismiss();
                    console.log("sasdad", data)
                },
                (error) =>{
                    loading.dismiss();
                    console.log("hellooo")
                },
                () =>{

                }
            )
        }, 100)
        
    }
    ngOnInit(){
        
            
    }

    change(){
        let loading = this.loadingCtrl.create({
            content: this.translate.translateImportant("Խնդրում եմ սպասել․․․", 'Please wait...')
        })
        loading.present()
        this.api.updateCustomerName(this.name, this.email).subscribe(
            (data) => {
                loading.dismiss()
                this.showToast(data.message)
                console.log(data)
               
            },
            (error)=>{
                loading.dismiss()
                this.showToast("error")
            }
        )
    }

    showToast(err) {
    let toast = this.toastCtrl.create({
      message: err,
      duration: 3000,
      position: "bottom"
    });

    toast.present(toast);
  }
    
}