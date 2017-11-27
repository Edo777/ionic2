import { Component, ViewChild } from "@angular/core";
import { NavController, Nav, NavParams, AlertController } from 'ionic-angular';
import { UserAccount, HomePage, HistoryPage, AboutUs, Addresses, OrdersPage } from '../barrel'
import { MobiWash } from "../../services/barrel.service";

interface Pages{
    pageName: string,
    component:any
}

@Component({
    selector:'menu-page',
    templateUrl:'menu.html',
})

export class MenuComponent{
    @ViewChild(Nav) nav:Nav;
    rootPage = UserAccount;
    activePage:any = UserAccount;
    id:number;
    pages:Pages[] = [
        { pageName:'Պատվերի գրանցում', component: OrdersPage},
        { pageName:'Իմ մեքենաները', component: HistoryPage},
        { pageName:'Իմ հասցեները', component: Addresses},
        { pageName:'Կարգավորումներ', component: AboutUs},                
        { pageName:'Դուրս գալ', component: HomePage}
    ]
    constructor(
        private navCtrl:NavController, 
        public params:NavParams, 
        private mobiWash:MobiWash,
        private alertCtrl:AlertController
    ){
        
    }
    bgChange(page){
        return page.component == this.activePage;
    }
    openPage(page:Pages){
        if(page.component === HomePage){
            this.outUser()
            //this.mobiWash.removeUser();
            //this.navCtrl.setRoot(HomePage);
            return;
        }
        this.activePage = page.component;
        this.nav.setRoot(page.component, {pageName:page.pageName});
    }

    outUser() {
        let confirm = this.alertCtrl.create({
          enableBackdropDismiss:false,
          title: 'MobiWash',
          message: 'Ընտրեք ի՞նչ եք ցանկանում ',
          buttons: [
            {
              text: 'Ջնջել',
              handler: () => {
                this.mobiWash.removeUser();
                this.navCtrl.setRoot(HomePage);
              }
            },
            {
              text: 'Դուրս գալ',
              handler: () => {
                this.navCtrl.setRoot(HomePage);
              }
            },
            {
                text: 'Մնալ',
                handler: () => {}
              }
          ]
        });
        confirm.present();
    }
}