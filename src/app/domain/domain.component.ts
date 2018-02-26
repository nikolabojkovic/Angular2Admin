import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { DOMAIN_PAGES_MENU } from './domain.menu';

@Component({
    selector: 'app-domain',
    templateUrl: './domain.component.html',
    styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
    constructor(
        private _menuService: BaMenuService
    ) { }

    ngOnInit() { 
        this._menuService.updateMenuByRoutes(<Routes>DOMAIN_PAGES_MENU);
    }
}