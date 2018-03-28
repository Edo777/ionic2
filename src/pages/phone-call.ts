import {Component} from "@angular/core";
import {CallNumber} from '@ionic-native/call-number';

@Component({
  selector: 'phone-call',
  template:
      `
    <button ion-button full (tap)="call()"> {{"connect_admin" | translate}}</button>
  `,
  providers: [CallNumber]
})
export class PhoneCall {
  constructor(private callNumber: CallNumber) {

  }

  call() {
    this.callNumber.callNumber("+37455950905", true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }
}
