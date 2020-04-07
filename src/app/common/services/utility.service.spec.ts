import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  let utils: UtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    utils = TestBed.get(UtilityService);
  });

  it('should be created', () => {
    expect(utils).toBeTruthy();
  });

  it(`should return true if cmd/ctrl+A,C,X,V or space, tab, enter, escape, enter, home, end, arrow buttons are clicked
  else returns false`, () => {
    const e1 = {
      keyCode: 32,
      ctrlKey: false,
      metaKey: false
    } as KeyboardEvent;
    expect(utils.isCtrlorCmdKeyClicked(e1)).toBeTruthy();
    const e2 = {
      keyCode: 12,
      ctrlKey: false,
      metaKey: false
    } as KeyboardEvent;
    expect(utils.isCtrlorCmdKeyClicked(e2)).toBeFalsy();
    const e3 = {
      keyCode: 65,
      ctrlKey: true,
      metaKey: false
    } as KeyboardEvent;
    expect(utils.isCtrlorCmdKeyClicked(e3)).toBeTruthy();
    const e4 = {
      keyCode: 65,
      ctrlKey: false,
      metaKey: true
    } as KeyboardEvent;
    expect(utils.isCtrlorCmdKeyClicked(e4)).toBeTruthy();
    const e5 = {
      keyCode: 35,
      ctrlKey: false,
      metaKey: false
    } as KeyboardEvent;
    expect(utils.isCtrlorCmdKeyClicked(e5)).toBeTruthy();
  });
});
