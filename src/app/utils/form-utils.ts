import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  //

  static isValidField(form: FormGroup, fieldName: string): boolean | null | undefined {
    return form.get(fieldName)?.errors && form.get(fieldName)?.touched;
  }

  static getTextError(errors: ValidationErrors) {
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

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.get(fieldName)) return null;
    const errors = form.get(fieldName)?.errors ?? {};
    return this.getTextError(errors);
  }

  static isValidFieldArray(formArray: FormArray, index: number): Boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};
    return this.getTextError(errors);
  }
}
