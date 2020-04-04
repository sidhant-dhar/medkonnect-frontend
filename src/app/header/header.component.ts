import { Component, OnInit, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime
} from 'rxjs/operators';


@Component({
  selector: 'ncov-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  scrolled = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
      this.scrolled = $event.srcElement.scrollTop >= 150;
      console.log(this.scrolled);
  }
  constructor() { }

  ngOnInit() {
  }

}
