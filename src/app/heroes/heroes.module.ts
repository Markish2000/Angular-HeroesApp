// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Modules
import { HeroesRoutingModule } from './heroes-routing.module';
import { MaterialModule } from '../material/material.module';

// Components
import { CardComponent } from './components/card/card.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

// Pipes
import { HeroImagePipe } from './pipes/hero-image.pipe';

@NgModule({
  declarations: [
    // Components
    CardComponent,
    HeroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,

    // Pipes
    HeroImagePipe,
  ],
  imports: [CommonModule, HeroesRoutingModule, MaterialModule],
})
export class HeroesModule {}
