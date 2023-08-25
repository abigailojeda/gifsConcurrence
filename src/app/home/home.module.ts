import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { GifsListComponent } from './components/gifs-list/gifs-list.component';
import { GifsSearchComponent } from './components/gifs-search/gifs-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EmptyComponent } from './components/empty/empty.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component'; // Importar FormsModule


@NgModule({
  declarations: [
    HomeComponent,
    GifsListComponent,
    GifsSearchComponent,
    EmptyComponent,
    LoadingComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModule { }
