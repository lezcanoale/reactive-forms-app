import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
})
export class DynamicPageComponent {
  fb = inject(FormBuilder);

  formUtils = FormUtils;

  newFavoriteGame = new FormControl('', Validators.required);

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', [Validators.required]],
        ['Death Stranding', [Validators.required]],
      ],
      Validators.minLength(3)
    ),
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  addFavoriteGame() {
    if (this.newFavoriteGame.invalid) return;
    this.favoriteGames.push(this.fb.control(this.newFavoriteGame.value, Validators.required));
    this.newFavoriteGame.reset();
  }

  deleteFavoriteGame(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
