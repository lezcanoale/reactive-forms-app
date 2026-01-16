import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { switchMap, tap } from 'rxjs';
import { CountryResponse } from '../../interfaces/country.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html',
})
export class CountryPageComponent {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);

  countriesByRegion = signal<CountryResponse[]>([]);

  borders = signal<string[]>([]);

  countryForm = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  onFormRegionChanged = effect((cleanUp) => {
    const formRegionChanged = this.onRegionChanged();
    // const formCountryChanged = this.onCountryChanged();
    cleanUp(() => {
      formRegionChanged.unsubscribe();
      // formCountryChanged.unsubscribe();
    });
  });

  onRegionChanged() {
    //primero obtenemos la region seleccionada en el form, cada que cambia
    return this.countryForm
      .get('region')!
      .valueChanges.pipe(
        //reseteamos el form para poder cambiar los valores
        tap(() => this.countryForm.get('country')!.setValue('')),
        tap(() => this.countryForm.get('border')!.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        //propagamos el valor de region para obtener los paises por region con el switchMap
        switchMap((region) => this.countryService.getCountriesByRegion(region!))
      )
      .subscribe((countries) => {
        console.log({ countries });
        this.countriesByRegion.set(countries);
      });
  }

  onCountryFormChanged = effect((cleanUp) => {
    const formCountryChanged = this.onCountryChanged();
    cleanUp(() => {
      formCountryChanged.unsubscribe();
    });
  });

  onCountryChanged() {
    //primero obtenemos la region seleccionada en el form, cada que cambia
    return this.countryForm
      .get('country')!
      .valueChanges.pipe(
        //reseteamos el form para poder cambiar los valores
        tap(() => this.countryForm.get('border')!.setValue('')),
        tap(() => {
          this.borders.set([]);
        }),
        //propagamos el valor de region para obtener los paises por region con el switchMap
        switchMap((code) => this.countryService.getBordersByCode(code!))
      )
      .subscribe((countries) => {
        this.borders.set(countries.borders);
      });
  }
}
