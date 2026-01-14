import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
//Cuando hay mas de un input se recomienda ya usar formularios reactivos
@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
})
export class BasicPageComponent {
  fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    name: [
      '',
      Validators.required,
      Validators.minLength(3) /**Validadores sincronos */ /**,Validadores asincronos []*/,
    ],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  isValidField(fieldName: string): boolean | null | undefined {
    return this.myForm.get(fieldName)?.errors && this.myForm.get(fieldName)?.touched;
  }

  getFieldError(fieldName: string): string | null {
    if (!this.myForm.get(fieldName)) return null;
    const errors = this.myForm.get(fieldName)?.errors ?? {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `Valor minimo de ${errors['min'].min}`;
      }
    }
    return null;
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      console.log('[myForm] ', this.myForm.value);
      return;
    }
  }

  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });
}
