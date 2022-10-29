import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css'],
})
export class SimpleFormComponent implements OnInit {

  nombreFormControl: FormControl;
  apellidoFormControl: FormControl;
  fechaFormControl: FormControl;

  formGroup: FormGroup;

  moreThan18Validator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      
      const isOlder = this.hasMoreThan18(control.value);
      return !isOlder ? {notOlder: {value: control.value}} : null;
    };
  }

  hasMoreThan18(value: string) {
    const today = new Date()
    const bod = new Date(value);

    
    let years = today.getFullYear() - bod.getFullYear();
    if (years < 18) {
      return false
    };
    
    const months = today.getMonth() - bod.getMonth();
    const days = today.getDate() - bod.getDate();
    if (months < 0 || (months == 0 && days < 0)) years--;

    return years >= 18
  }

  constructor() { 
    this.nombreFormControl = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("[a-zA-ZñÑáÁéÉíÍóÓúÚ ]*")]);
    this.apellidoFormControl = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("[a-zA-ZñÑáÁéÉíÍóÓúÚ ]*")]);
    this.fechaFormControl = new FormControl('', [Validators.required, this.moreThan18Validator()]);
    this.formGroup = new FormGroup({
      nombre: this.nombreFormControl,
      apellidos: this.apellidoFormControl,
      fechaNacimiento: this.fechaFormControl,
    });
  }

  ngOnInit(): void {
    
  }

  handleSubmit() {
    console.log('Valores del formulario')
    console.log(this.nombreFormControl.getRawValue(), this.apellidoFormControl.getRawValue(), this.fechaFormControl.getRawValue());
    
    if (this.formGroup.valid) {
      this.formGroup.reset();
    }
  }

}
