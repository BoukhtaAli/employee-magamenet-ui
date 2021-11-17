import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector : "[maxSizeSelector]",
  providers : [
    {
      provide: NG_VALIDATORS,
      useExisting: MaxLengthDirective,
      multi: true
    }
  ]
})
export class MaxLengthDirective implements Validator{

  @Input('maxSizeSelector') inputSize = "";

  validate(control: AbstractControl): ValidationErrors | null {

    const value = control.value;

    if(value!== undefined && value !== null){
      return value.length > parseInt(this.inputSize) ? {maxSizeSelector:true} : null;
    }

    return null;
  }
}
