import { Directive, HostListener } from '@angular/core';
import { RegexPatterns } from '../../regex/regex.patterns';
import { UtilityService } from '../../services/utility.service';

@Directive({
  selector: '[ncovNumeric]'
})
export class NumericDirective {

  public readonly patterns = RegexPatterns;

  constructor(
    private readonly utils: UtilityService
  ) { }

  @HostListener('keydown', ['$event'])
  public allowNumericOnKeyDown(event: KeyboardEvent): void {
    const regex = new RegExp(this.patterns.numeric);
    if ((!regex.test(event.key) && !this.utils.isCtrlorCmdKeyClicked(event)) || event['keyCode'] === 32) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  public allowNumericOnPaste(event: ClipboardEvent): void {
    const regex = new RegExp(this.patterns.numeric);
    const clipboardData = event.clipboardData.getData('text/plain');
    if (!regex.test(clipboardData)) {
      event.preventDefault();
    }
  }

}
