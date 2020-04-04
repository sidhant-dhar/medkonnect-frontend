import { Component, AfterViewInit, HostBinding } from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime
} from 'rxjs/operators';

import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

enum Direction {
  Up = 'Up',
  Down = 'Down'
}


enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

@Component({
  selector: 'ncov-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements AfterViewInit {

  // private isVisible = true;
  // constructor() { }

  // ngAfterViewInit() {
  //   const scroll$ = fromEvent(window, 'scroll').pipe(
  //     throttleTime(10),
  //     map(() => window.pageYOffset),
  //     pairwise(),
  //     map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
  //     distinctUntilChanged(),
  //     share()
  //   );
  //   console.log(scroll$);

  //   const scrollUp$ = scroll$.pipe(
  //     filter(direction => direction === Direction.Up)
  //   );
  //   const scrollDown$ = scroll$.pipe(
  //     filter(direction => direction === Direction.Down)
  //   );
  //   scrollUp$.subscribe(() => (this.isVisible = true));
  //   scrollDown$.subscribe(() => (this.isVisible = false));

  // }

  private isVisible = true;

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );
    console.log(scroll$);

    const goingUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    goingUp$.subscribe(() => (this.isVisible = true));
    goingDown$.subscribe(() => (this.isVisible = false));

    console.log(this.isVisible);
  }

}
