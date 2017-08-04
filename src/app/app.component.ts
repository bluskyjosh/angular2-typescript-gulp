import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {NavigatorService } from './_services/index';

@Component({
    selector: "app",
    styleUrls: ['../css/app.css'],
    templateUrl: "./app/app.html",
    encapsulation: ViewEncapsulation.None

})


export class AppComponent implements OnInit {

    private showNavigation: boolean = true;

     _sidebarOptions = {
        opened: false,
        mode: 'over',
        dock: false,
        dockSize: '0px',
        position: 'left',
        autoCollapseHeight: 0,
        autoCollapseWidth: 500,
        animate: true,
        sidebarClass: 'sidebar',
        ariaLabel: 'Sidebar Menu',
        trapFocus: false,
        autoFocus: true,
        showBackdrop: false,
        closeOnClickBackdrop: false,
        closeOnClickOutside: true,
        keyClose: false,
        keyCode: 27
    };

    constructor(private navigatorService: NavigatorService) { }

    ngOnInit() {
        this._sidebarOptions.opened = false;
        this.navigatorService.displayNavigation.subscribe(
            res => this.showNavigation = res );
        this.navigatorService.closeNavigation.subscribe(res => this._sidebarOptions.opened = res );
    }

    private _toggleSidebar() {
        this._sidebarOptions.opened = !this._sidebarOptions.opened;
    }
}