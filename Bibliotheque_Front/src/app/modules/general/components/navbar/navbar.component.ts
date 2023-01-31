import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';
import { User } from '../../model/user';
import { Subscription } from 'rxjs';
import { NavItem } from '../../model/nav-item';
import { StateService } from '../../services/state.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public isCollapsed = true;
  private userSubscription: Subscription | null = null;
  subsState: Subscription = new Subscription();
  items: NavItem[] = [];
  user: User | null = null;
  FILE_SERVER: string = environment.FILE_SERVER;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private account: AccountService,
    private state: StateService,
    private httpClient: HttpClient
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }
  config: any;
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.subsState.unsubscribe();
  }
  ngOnInit() {
    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache');

    this.httpClient
      .get<any>('/assets/config.json', { headers })
      .subscribe((config) => {
        this.config = config;
      });
    this.subsState = this.state.nav.subscribe((res) => {
      this.items = res as NavItem[];
    });
    this.userSubscription = this.account.user.subscribe((res) => {
      if (res != null) {
        this.user = res;
      } else if (res == null && this.account.getMatricule() != null) {
        this.getAgent();
      }
    });
    const navbar: HTMLElement = this.element.nativeElement;

    const test = navbar.getElementsByClassName('navbar-toggler');

    setTimeout(() => {
      this.toggleButton = test[1];
      this.router.events.subscribe((event) => {
        this.sidebarClose();

        var $layer: any = document.getElementsByClassName('close-layer')[0];
        if ($layer) {
          $layer.remove();
          this.mobile_menu_visible = 0;
        }
      });
    });
  }

  deconex() {
    this.account.logout();
  }

  getAgent() {
    let userInput: User = {
      matricule: this.account.getMatricule(),
    };
    this.account.getAgentActif(userInput).subscribe((res: any) => {
      console.log(' this.dataTobackInfoAgent.matricule', res);
      this.user = res[0] as User;
      this.account.setUser(this.user);
    });
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;

    const html = document.getElementsByTagName('html')[0];

    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }
  sidebarToggle() {
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName('html')[0];

    if (this.mobile_menu_visible == 1) {
      html.classList.remove('nav-open');
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer: any = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');

      if (html.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (html.classList.contains('off-canvas-sidebar')) {
        document
          .getElementsByClassName('wrapper-full-page')[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);
      let mobile_menu_visible = this.mobile_menu_visible;
      $layer.onclick = function () {
        //asign a function
        html.classList.remove('nav-open');
        mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      html.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  }
}
