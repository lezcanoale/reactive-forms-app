import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPageComponent {
  //Tarea
  /**
   *name-> obligatorio
   *email-> obligatorio y un email (Validators.email?)
   *username-> obligatorio, minLength 6
   *password-> obligatorio, minLength 6
   *password2-> obligatorio
   */

  fb = inject(FormBuilder);

  formUtils = FormUtils;

  registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern(this.formUtils.emailPattern)],
        [this.formUtils.checkingServerResponse],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [this.formUtils.isFieldOneEqualFieldTwo('password', 'password2')],
    }
  );

  onSubmit() {
    this.registerForm.markAllAsTouched();
  }
}
