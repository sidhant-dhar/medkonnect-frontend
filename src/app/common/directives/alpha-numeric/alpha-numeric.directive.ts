import { Directive, HostListener } from '@angular/core';
import { RegexPatterns } from '../../regex/regex.patterns';
import { UtilityService } from '../../services/utility.service';

@Directive({
  selector: '[ncovAlphaNumeric]'
})
export class AlphaNumericDirective {

  public readonly patterns = RegexPatterns;

  constructor(
    private readonly utils: UtilityService
  ) { }

  @HostListener('keydown', ['$event'])
  public allowAlphaNumericOnKeyDown(event: KeyboardEvent): void {
    const regex = new RegExp(this.patterns.alphaNumeric);
    if (!regex.test(event.key) && !this.utils.isCtrlorCmdKeyClicked(event)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  public allowAlphaNumericOnPaste(event: ClipboardEvent): void {
    const regex = new RegExp(this.patterns.alphaNumeric);
    const clipboardData = event.clipboardData.getData('text/plain');
    if (!regex.test(clipboardData)) {
      event.preventDefault();
    }
  }

}
