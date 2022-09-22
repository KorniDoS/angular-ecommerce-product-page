import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuItems: string[] = [];
  toggledMenu: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.menuItems = ['Collections', 'Men', 'Women', 'About', 'Contact'];
  }

  openMenu(){
    this.toggledMenu = true;
  }

  closeMenu(){
    this.toggledMenu = false;
  }
}
