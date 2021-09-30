import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from '../manga.service';
import { Manga } from '../manga.class';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchInput: string = "";
  mangaList: Array<Manga> = [];
  myFileName: any;

  constructor(private mangaService: MangaService, private router: Router) { }

  ngOnInit(): void {
    this.mangaList = this.mangaService.getMangaList();
  }

  onSubmit(): void {

    if ((document.getElementById("myTitle") as HTMLInputElement).value != null) {
      let title = (document.getElementById("myTitle") as HTMLInputElement).value;
      this.mangaService.setSearchInput(title);
    }

    this.mangaService.setMangaList(this.mangaService.getSearchInput())
    this.mangaList = this.mangaService.getMangaList();
   
    
  }

  onTitleClick(myManga: Manga) {
    this.router.navigate(['/reader', myManga.title, myManga.id, myManga.coverArtId]);
  }

}



