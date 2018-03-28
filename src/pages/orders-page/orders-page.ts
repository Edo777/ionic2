import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserAccount} from "../barrel";

@Component({
  template: '<ion-nav #myNav [root]="rootPage"></ion-nav>'
})
export class OrdersPage {
  @ViewChild('myNav') nav: NavController
  private rootPage: any = UserAccount;
}
