import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from '../manga.service';
import { Chapter } from '../chapterListApiClasses/chapter.class';
import { coverAttributes } from '../coverApiClasses/coverAttributes.class';
import { Cover } from '../coverApiClasses/cover.class';
import { coverData } from '../coverApiClasses/coverData.class';
import { Router } from '@angular/router';

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
  myCoverArtURL: any;
  myCoverFileName = "";
  myCoverAttributes: coverAttributes = new coverAttributes("", "", "", 0, "", "");
  myCover: Cover = new Cover("", "", this.myCoverAttributes, [])
  myCoverData: coverData = new coverData("", "", this.myCover);
  myPageNumber: number = 0;


  constructor(private route: ActivatedRoute, private mangaService: MangaService, private router: Router) { }

    ngOnInit(): void {
    this.mangaTitle = this.route.snapshot.params['title'];
    this.mangaId = this.route.snapshot.params['id'];
    this.mangaCoverArtId = this.route.snapshot.params['coverArtId'];
    this.mangaService.getCoverFileName(this.mangaId, this.mangaCoverArtId).subscribe(data => {
      this.myCoverData = data;
      this.myCoverFileName = this.myCoverData.data.attributes.fileName;
      this.myCoverArtURL = 'https://uploads.mangadex.org/covers/' + this.mangaId + '/' + this.myCoverFileName + '.512.jpg'

    })

    this.mangaService.setChapterList(this.mangaId);
    this.myChapterArray = this.mangaService.getChapterList();

  }

  onChapterClick(myChapter: Chapter) {
    const chapterId = myChapter.id;
    const chapterNumberNew = this.myChapterArray.indexOf(myChapter);
    this.router.navigate(['/manga', this.mangaId, chapterNumberNew, chapterId, this.myPageNumber]);
  }



  }
