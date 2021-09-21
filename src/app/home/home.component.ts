import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from '../manga.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private mangaService: MangaService) { }

  ngOnInit(): void {
    
  }

  onSubmit() {
    if ((document.getElementById("myTitle") as HTMLInputElement).value != null) {
      let title = (document.getElementById("myTitle") as HTMLInputElement).value;
      this.mangaService.setSearchInput(title);
    }
    this.mangaService.setMangaList(this.mangaService.getSearchInput());
    this.router.navigate(['/searchResult']);
  }
}
