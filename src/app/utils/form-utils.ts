import { FormGroup } from '@angular/forms';

export class FormUtils {
  //

  static isValidField(form: FormGroup, fieldName: string): boolean | null | undefined {
    return form.get(fieldName)?.errors && form.get(fieldName)?.touched;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.get(fieldName)) return null;
    const errors = form.get(fieldName)?.errors ?? {};
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
}
