import {Component, Input} from '@angular/core';

@Component({
  selector: 'absolute-header',
  template:
      `
    <ion-header mode="md">
      <ion-navbar mode="md">
        <button mode="md" ion-button menuToggle icon-only *ngIf="pageName?.length">
          <ion-icon md="ios-menu" ios="ios-menu"></ion-icon>
        </button>
        <h1 no-margin *ngIf="pageName?.length">
          <span>{{ pageName | translate}}</span>
        </h1>
      </ion-navbar>
    </ion-header>
  `,
  styles: [`
    h1 {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      font-size: 0.9em;
    }

    span {
      margin: 0 auto;
      font-weight: 700;
      width: 60%;
      text-align: center;

    }

  `]
})

export class HeaderComponent {
  @Input() pageName;

  constructor() {

  }

}
