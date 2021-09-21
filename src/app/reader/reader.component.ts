import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from '../manga.service';
import { Chapter } from '../chapterListApiClasses/chapter.class';
import { coverAttributes } from '../coverApiClasses/coverAttributes.class';
import { Cover } from '../coverApiClasses/cover.class';
import { coverData } from '../coverApiClasses/coverData.class';

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


  constructor(private route: ActivatedRoute, private mangaService: MangaService) { }

    ngOnInit(): void {

    this.mangaTitle = this.route.snapshot.params['title'];
    this.mangaId = this.route.snapshot.params['id'];
    this.mangaCoverArtId = this.route.snapshot.params['coverArtId'];
    console.log(this.mangaCoverArtId);

    const mySubscription = this.mangaService.setCoverFileName(this.mangaId, this.mangaCoverArtId).subscribe(data => {
      this.myCoverData = data;
      this.myCoverFileName = this.myCoverData.data.attributes.fileName;
      console.log(this.myCoverFileName);
      this.myCoverArtURL = 'https://uploads.mangadex.org/covers/' + this.mangaId + '/' + this.myCoverFileName + '.512.jpg'
      console.log(this.myCoverArtURL);

    })

    console.log(this.myCoverArtURL);
    //const myFileName = this.mangaService.setCoverFileName(this.mangaId, this.mangaCoverArtId);
    //console.log(myFileName);
    //this.myCoverFileName = this.mangaService.getCoverFileName();  
    //console.log(this.myCoverFileName);

    this.mangaService.setChapterList(this.mangaId);
    this.myChapterArray = this.mangaService.getChapterList();

    //this.mangaService.setCoverFileUrl(this.mangaId, this.myCoverFileName)
    //this.myCoverArtURL = this.mangaService.getCoverFileUrl();

      

    //const promise = new Promise((resolve, reject) => {
    //  resolve(this.mangaService.setCoverFileName(this.mangaId, this.mangaCoverArtId))
    //});
    //promise.then((res) => {
    //  const fileName = this.mangaService.getCoverFileName();
    //  console.log(res);
    //  this.mangaService.setCoverFileUrl(this.mangaId, res)
    // // I get called: true
    //})
    //  .then((res) => {
    //    this.myCoverArtURL = this.mangaService.getCoverFileUrl();
    //  })
    //promise.catch((err) => {
    //  // This is never called
    //});


     
    //this.myCoverArtURL = 'https://uploads.mangadex.org/covers/' + this.mangaId + '/' + this.mangaCoverArtId + '.512.jpg'
  }



  }
