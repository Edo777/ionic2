import {Component} from "@angular/core";
import {NavParams, LoadingController, ToastController} from "ionic-angular";
import {ApiService} from "../../services/api.service";
import {TranslateService} from "../../translate/translate.service";
import {Keyboard} from "@ionic-native/keyboard";

@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})

export class Settings {
  pageName: string;
  customerDetails: any;
  phone: any;
  email: any;
  name: any;
  prom_code: any;

  constructor(private navParams: NavParams,
              private api: ApiService,
              private loadingCtrl: LoadingController,
              private translate: TranslateService,
              private toastCtrl: ToastController,
              private keyBoard: Keyboard) {
    this.pageName = this.navParams.get('pageName');
    setTimeout(() => {
      let loading = this.loadingCtrl.create({
        content: this.translate.translateImportant("Խնդրում ենք սպասել․․․", 'Please wait...')
      });
      loading.present();

      this.api.getCustomerDetails().subscribe(
        (data) => {
          this.customerDetails = data[0];
          this.phone = this.customerDetails.phone;
          this.email = this.customerDetails.email != "undefined" ? this.customerDetails.email : "";
          this.name = this.customerDetails.name;
          this.prom_code = this.customerDetails.id;//promo_code
          loading.dismiss();
        },
        (error) => {
          loading.dismiss();
        },
        () => {

        }
      )
    }, 100)

  }

  ngOnInit() {
    this.keyboardEnterButton()

  }

  keyboardEnterButton() {
    var elems = document.getElementsByTagName('ion-input');
    for (let i = 0; i < elems.length; i++) {
      elems[i].addEventListener('keypress', (event: any) => {
        if (event.key == "Enter") {
          this.keyBoard.close()
        }
      })
    }

  }

  change() {
    let loading = this.loadingCtrl.create({
      content: this.translate.translateImportant("Խնդրում ենք սպասել․․․", 'Please wait...')
    })
    loading.present()
    this.api.updateCustomerName(this.name, this.email).subscribe(
      (data) => {
        loading.dismiss()
        this.showToast(data.message)


      },
      (error) => {
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
