import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
// My components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { FooterComponent } from './footer/footer.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';

// Para las fechas con formato DD/MM/AAA
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

const CUSTOM_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};


const rutas: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'form', component: SimpleFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MoviesListComponent,
    FooterComponent,
    MovieDetailComponent,
    SimpleFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
