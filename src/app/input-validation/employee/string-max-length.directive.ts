import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector : "[maxSizeSelector]",
  providers : [
    {
      provide: NG_VALIDATORS,
      useExisting: FirstNameLengthDirective,
      multi: true
    }
  ]
})
export class FirstNameLengthDirective implements Validator{

  @Input('maxSizeSelector') inputSize = "";

  validate(control: AbstractControl): ValidationErrors | null {

    const value = control.value;

    if(value!== undefined && value !== null){
      return value.length > parseInt(this.inputSize) ? {maxSizeSelector:true} : null;
    }

    return null;
  }
}
