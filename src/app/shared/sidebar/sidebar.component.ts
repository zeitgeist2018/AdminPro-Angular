import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
  providers: [SidebarService]
})
export class SidebarComponent implements OnInit {

  constructor(private _sidebarService: SidebarService) { }

  ngOnInit() {
  }

}
