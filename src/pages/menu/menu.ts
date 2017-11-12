import { Component, ViewChild } from "@angular/core";
import { NavController, Nav, NavParams } from 'ionic-angular';
import { UserAccount, HomePage, HistoryPage, AboutUs } from '../barrel'

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
    pages:Pages[] = [
        { pageName:'Պատվերի գրանցում', component: UserAccount},
        { pageName:'Իմ մեքենաները', component: HistoryPage},
        { pageName:'Մեր մասին', component: AboutUs},                
        { pageName:'Դուրս գալ', component: HomePage}
    ]
    constructor(private navCtrl:NavController, public params:NavParams){

    }
    bgChange(page){
        return page.component == this.activePage;
    }
    openPage(page:Pages){
        if(page.component === HomePage){
            this.navCtrl.setRoot(HomePage);
            localStorage.removeItem('userInfo');
            return;
        }
        this.activePage = page.component;
        this.nav.setRoot(page.component, {pageName:page.pageName});
    }
}