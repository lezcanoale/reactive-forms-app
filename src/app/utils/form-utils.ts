import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}
export class FormUtils {
  //Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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
        case 'email':
          return `Debe ser formato email`;
        case 'pattern':
          if (errors['pattern'].requiredPatterm === FormUtils.emailPattern) {
            return 'El valor ingresado no luce como un correo electronico';
          }
          return 'El error de patron contra expresion regular';
        case 'emailTaken':
          return 'Email ya en uso.';
        case 'usernameTaken':
          return 'Username en uso';
        default:
          return 'Error no controlado';
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

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value === field2Value
        ? null
        : {
            passwordNotEqual: true,
          };
    };
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();

    const formValue = control.value;

    if (formValue === 'hola@gmail.com') {
      return {
        emailTaken: true,
      };
    }

    return null;
  }

  static checkingNickname(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value;
    if (formValue === 'alezcano') {
      return { usernameTaken: true };
    }
    return null;
  }
}
