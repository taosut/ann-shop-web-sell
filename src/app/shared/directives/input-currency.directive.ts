import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CurrencyService } from '../services/currency.service';
import { formatNumber } from '@angular/common';

@Directive({
  selector: '[appInputCurrency]'
})
export class InputCurrencyDirective {

  constructor( private currency: CurrencyService, public ngControl: NgControl){ }

  onInputChange(event: string, backspace: boolean) {
    let newVal = event.replace(/\D/g, '');
    if (backspace) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      newVal = '';
    }
    else if (newVal.length < 4) {
      newVal = event.replace(/\D/g, '');
    }
    else {
        newVal = newVal ? formatNumber(+newVal || 0, this.currency.options.locale, this.currency.options.digitsInfo) : "";
    }
    this.ngControl.valueAccessor.writeValue(newVal);
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }
}
