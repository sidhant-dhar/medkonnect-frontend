import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public isCtrlorCmdKeyClicked(event: KeyboardEvent): boolean {
    const ctrlCmdKeyCodes = [65, 67, 86, 88];
    if (
      (event.ctrlKey && ctrlCmdKeyCodes.includes(event['keyCode'])) ||  // Allow Ctrl+A,C,V,X
      (event.metaKey && ctrlCmdKeyCodes.includes(event['keyCode'])) ||  // Allow Cmd+A,C,V,X
      [8, 9, 13, 27, 32, 46].includes(event['keyCode']) ||              // Allow Delete, Backspace, Tab, Space, Escape, Enter
      (event['keyCode'] >= 35 && event['keyCode'] <= 39)                // Home, End, Left, Right
    ) {
      return true;
    }
    return false;
  }
}
