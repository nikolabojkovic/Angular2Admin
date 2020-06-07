import { Component } from '@angular/core';

import { GlobalState } from '../../../global.state';
import { Router } from '@angular/router';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
// tslint:disable-next-line:component-class-suffix
export class BaPageTop {

  isScrolled: boolean = false;
  isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState, private router: Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  signOut() {
    localStorage.removeItem('Authentication');
    this.router.navigate(["login"]);
  }
}
