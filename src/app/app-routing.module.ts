import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';
import { HomeComponent } from './home/home.component';
import { ReaderComponent } from './reader/reader.component';
import { MangaPageComponent } from './manga-page/manga-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'searchResult', component: SearchResultComponent },
  { path: 'reader', component: ReaderComponent },
  { path: 'reader/:title/:id/:coverArtId', component: ReaderComponent },
  { path: 'manga/:chapterId', component: MangaPageComponent },
  { path: 'manga/:mangaId/:chapterNumber/:chapterId/:pageNumber', component: MangaPageComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
