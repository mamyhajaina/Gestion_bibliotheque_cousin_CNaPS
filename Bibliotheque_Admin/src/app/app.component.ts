import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AccountService } from './modules/general/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private isLoginSubscription: Subscription | null = null;
  config: any;
  constructor(
    private spinner: NgxSpinnerService,
    private account: AccountService,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.isLoginSubscription = this.account.firstLogin.subscribe((res) => {
      if (res) {
        this.spinner.show('principalSpinner');
      } else {
        this.spinner.hide('principalSpinner');
      }
    });

    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache');

    this.httpClient
      .get<any>('/assets/config.json', { headers })
      .subscribe((config) => {
        this.config = config;
        console.log('App version : ' + config.version);
      });
  }
  ngOnDestroy(): void {
    this.isLoginSubscription?.unsubscribe();
  }
}
