import { Component, OnInit, HostListener } from '@angular/core';
import { MangaService } from '../manga.service';
import { ActivatedRoute } from '@angular/router';
import { chapterData } from '../chapterClasses/chapterData.class';
import { chapterAttributes } from '../chapterClasses/chapterAttributes.class';
import { chapterRelationships } from '../chapterClasses/chapterRelationships.class';
import { chapterApiResponse } from '../chapterClasses/chapterApiResponse.class';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Chapter } from '../chapterListApiClasses/chapter.class';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-manga-page',
  templateUrl: './manga-page.component.html',
  styleUrls: ['./manga-page.component.css']
})
export class MangaPageComponent implements OnInit {
  myChapterArray: Array<Chapter> = [];
  myChapterRelationships: chapterRelationships = new chapterRelationships("", "");
  myChapterAttributes: chapterAttributes = new chapterAttributes("", "", "", "", "", "", [], [], "", 0, "", "", "");
  myChapterData: chapterData = new chapterData("", "", this.myChapterAttributes, this.myChapterRelationships);
  myChapterApiResponse: chapterApiResponse = new chapterApiResponse("", this.myChapterData);
  chapterImg: string = "";
  chapterImg2: string = "";
  myPageArray: Array<string> = [];
  myPageNumber: number = 0;
  myChapterNumber: number = 0;
  myMangaId = "";

  myChapterId: string = "";
  myChapterHash: string = "";
  myBaseUrl: string = "";
  private ngUnsubscribe = new Subject();

  myPageImages: Array<string> = [];
  myCurrentImg: string = "";
  myNextImg: string = "";

  constructor(private mangaService: MangaService, private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    console.log("page loaded");
   
    this.myChapterId = this.route.snapshot.params['chapterId'];
    const pageNumberString = this.route.snapshot.params['pageNumber'];
    this.myMangaId = this.route.snapshot.params['mangaId'];
    this.mangaService.setChapterList(this.myMangaId);
    this.myPageNumber = parseInt(pageNumberString);
    this.getChapter();

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  nextPage() {
    const chapterId = this.route.snapshot.params['chapterId'];
    const pageNumberString = this.route.snapshot.params['pageNumber'];
    this.myChapterNumber = this.route.snapshot.params['chapterNumber'];
    this.myMangaId = this.route.snapshot.params['mangaId'];
    this.myPageNumber = parseInt(pageNumberString);
    if (this.myPageNumber + 1 < this.myPageArray.length) {
      this.myPageNumber = this.myPageNumber + 1;
      this.router.navigate(['/manga', this.myMangaId, this.myChapterNumber, chapterId, this.myPageNumber]);
      this.reloadPages();
    }
    else if (this.myPageNumber + 1 == this.myPageArray.length)
    {
      this.nextChapter();

    }
  
  }

  lastPage() {
    const chapterId = this.route.snapshot.params['chapterId'];
    const pageNumberString = this.route.snapshot.params['pageNumber'];
    this.myChapterNumber = this.route.snapshot.params['chapterNumber'];
    this.myMangaId = this.route.snapshot.params['mangaId'];
    this.myPageNumber = parseInt(pageNumberString);
    if (this.myPageNumber - 1 >= 0) {
      this.myPageNumber = this.myPageNumber - 1;
      this.router.navigate(['/manga', this.myMangaId, this.myChapterNumber, chapterId, this.myPageNumber]);
      this.reloadPages();
    }
    else if (this.myChapterNumber > 0 && this.myPageNumber - 1 < 0) {
      this.lastChapter();
    }
  
  }

  nextChapter() {
    this.myChapterId = this.route.snapshot.params['chapterId'];
    this.myPageArray = [];
    //this.myPageImages = [];
    this.myPageNumber = 0
    this.myChapterNumber = this.route.snapshot.params['chapterNumber'];
    this.myChapterNumber++;
    this.myChapterArray = this.mangaService.getChapterList();

    this.myChapterId = this.myChapterArray[this.myChapterNumber - 1].id;

    this.mangaService.getChapter(this.myChapterId).subscribe(data => {
      this.myChapterApiResponse = data;
      this.myChapterId = this.myChapterApiResponse.data.id;
      this.myChapterHash = this.myChapterApiResponse.data.attributes.hash;
      for (let x = 0; x < this.myChapterApiResponse.data.attributes.data.length; x++) {
        this.myPageArray.push(this.myChapterApiResponse.data.attributes.data[x]);
      }

      const chapterData = this.myChapterApiResponse.data.attributes.data[this.myPageNumber];
      //const chapterDataSaver = this.myChapterApiResponse.data.attributes.dataSaver[2];

      const atHomeUrl = 'https://api.mangadex.org/at-home/server/' + this.myChapterId

      this.http.get<{ result: string, baseUrl: string }>(atHomeUrl).subscribe(data => {
        this.myBaseUrl = data.baseUrl;
        this.chapterImg = this.myBaseUrl + '/' + 'data' + '/' + this.myChapterHash + '/' + chapterData
        this.loadNextFivePages();
      });

      this.router.navigate(['/manga', this.myMangaId, this.myChapterNumber, this.myChapterId, this.myPageNumber]);
      this.reloadPages();

    })
  }


  lastChapter() {
    const chapterId = this.route.snapshot.params['chapterId'];
    this.myPageArray = [];
    
    this.myChapterNumber = this.route.snapshot.params['chapterNumber'];
    this.myChapterNumber--;
    this.myChapterArray = this.mangaService.getChapterList();
    console.log(this.myChapterArray);

    this.myChapterId = this.myChapterArray[this.myChapterNumber].id;

    this.mangaService.getChapter(this.myChapterId).subscribe(data => {
      this.myChapterApiResponse = data;
      this.myChapterId = this.myChapterApiResponse.data.id;
      this.myChapterHash = this.myChapterApiResponse.data.attributes.hash;
      for (let x = 0; x < this.myChapterApiResponse.data.attributes.data.length; x++) {
        this.myPageArray.push(this.myChapterApiResponse.data.attributes.data[x]);
      }

      this.myPageNumber = this.myPageArray.length - 1;
      console.log("last chapter page number first: " + this.myPageNumber);
      const chapterData = this.myChapterApiResponse.data.attributes.data[this.myPageNumber];
      //const chapterDataSaver = this.myChapterApiResponse.data.attributes.dataSaver[2];

      const atHomeUrl = 'https://api.mangadex.org/at-home/server/' + this.myChapterId

      this.http.get<{ result: string, baseUrl: string }>(atHomeUrl).subscribe(data => {
        this.myBaseUrl = data.baseUrl;
        this.chapterImg = this.myBaseUrl + '/' + 'data' + '/' + this.myChapterHash + '/' + chapterData
      });

      this.router.navigate(['/manga', this.myMangaId, this.myChapterNumber, chapterId, this.myPageNumber]);
      this.reloadPages();

    })

    //this.myPageNumber = this.myPageArray.length;
    //console.log("last chapter page number: " + this.myPageNumber);


  }

  @HostListener('window:keyup.arrowright', ['$event'])
  keyEventRight(event: KeyboardEvent) {
    this.nextPage();
  }


  @HostListener('window:keyup.arrowleft', ['$event'])
  keyEventLeft(event: KeyboardEvent) {
    this.lastPage();
  }

  reloadPages() {

    this.chapterImg = this.myBaseUrl + '/' + 'data' + '/' + this.myChapterHash + '/' + this.myPageArray[this.myPageNumber]
    //this.myNextImg = this.myBaseUrl + '/' + 'data' + '/' + this.myChapterHash + '/' + this.myPageArray[this.myPageNumber + 1]
    this.loadNextPage();
 
  }

  getChapter() {

    this.mangaService.getChapter(this.myChapterId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.myChapterApiResponse = data;
      this.myChapterId = this.myChapterApiResponse.data.id;
      this.myChapterHash = this.myChapterApiResponse.data.attributes.hash;
      for (let x = 0; x < this.myChapterApiResponse.data.attributes.data.length; x++) {
        this.myPageArray.push(this.myChapterApiResponse.data.attributes.data[x]);
      }

      const chapterData = this.myChapterApiResponse.data.attributes.data[this.myPageNumber];
      //const chapterDataSaver = this.myChapterApiResponse.data.attributes.dataSaver[2];

      const atHomeUrl = 'https://api.mangadex.org/at-home/server/' + this.myChapterId

      this.http.get<{ result: string, baseUrl: string }>(atHomeUrl).subscribe(data => {
        this.myBaseUrl = data.baseUrl;
        this.chapterImg = this.myBaseUrl + '/' + 'data' + '/' + this.myChapterHash + '/' + chapterData
        this.loadNextFivePages();
       
      });

    })

  }

  //loadNextFivePages() {

  //  let y = 0;

  //      for (let x = this.myPageNumber; x < this.myPageArray.length - 1 && y < 5; x++) {
  //        var myChapImg = new Image();
  //        myChapImg.src = this.myBaseUrl + '/' + 'data' + '/' + this.myChapterHash + '/' + this.myChapterApiResponse.data.attributes.data[x]
  //        this.myPageImages.push(myChapImg.src)
  //        y++
  //      }

  //}

  loadNextFivePages() {

    let y = 0;

  
    for (let x = this.myPageNumber; x < this.myPageArray.length - 1 && y < 5; x++) {
      var myChapImg = new Image();
      myChapImg.src = this.myBaseUrl + '/' + 'data' + '/' + this.myChapterHash + '/' + this.myChapterApiResponse.data.attributes.data[x]
      console.log(myChapImg.src);
      this.myPageImages.push(myChapImg.src);
      y++;
    }

  }



  loadNextPage() {


    if (this.myPageNumber + 4 < this.myPageArray.length - 1) {
      var myChapImg = new Image();
      myChapImg.src = this.myBaseUrl + '/' + 'data' + '/' + this.myChapterHash + '/' + this.myChapterApiResponse.data.attributes.data[this.myPageNumber + 4];
      if (this.myPageImages.length < 11) {
        this.myPageImages.push(myChapImg.src);
      }
      else {
        this.myPageImages.shift();
        this.myPageImages.push(myChapImg.src);
        console.log(this.myPageImages.length);
      }
      
    }
  }
  
}



