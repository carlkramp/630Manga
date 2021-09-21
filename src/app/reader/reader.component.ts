import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from '../manga.service';
import { Chapter } from '../chapterListApiClasses/chapter.class';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  mangaTitle: string = "";
  mangaId: string = "";
  mangaCoverArtId: string = "";
  myChapterArray: Array<Chapter> = [];
  myCoverArtURL = "";
  myCoverFileName = "";


  constructor(private route: ActivatedRoute, private mangaService: MangaService) { }

  ngOnInit(): void {

    this.mangaTitle = this.route.snapshot.params['title'];
    this.mangaId = this.route.snapshot.params['id'];
    this.mangaCoverArtId = this.route.snapshot.params['coverArtId'];
    console.log(this.mangaCoverArtId);
    const myFileName = this.mangaService.setCoverFileName(this.mangaCoverArtId);
    console.log(myFileName);
    this.myCoverFileName = this.mangaService.getCoverFileName();
    console.log(this.myCoverFileName);

    this.mangaService.setChapterList(this.mangaId);
    this.myChapterArray = this.mangaService.getChapterList();
  
    //this.myCoverArtURL = 'https://uploads.mangadex.org/covers/' + this.mangaId + '/' + this.myCoverFileName + '.512.jpg'
    this.myCoverArtURL = 'https://uploads.mangadex.org/covers/' + this.mangaId + '/' + this.mangaCoverArtId + '.512.jpg'
  }



  }
