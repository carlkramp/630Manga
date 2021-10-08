import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiResponse } from './apiClasses/apiResponse.class';
import { Manga } from './manga.class';
import { ChapterListApiResponse } from './chapterListApiClasses/chapterListApiResponse.class';
import { Volume } from './chapterListApiClasses/volume.class';
import { Chapter } from './chapterListApiClasses/chapter.class';
import { apiData } from './apiClasses/apiData.class';
import { noneVolume } from './chapterListApiClasses/noneVolume.class';
import { Cover } from './coverApiClasses/cover.class';
import { coverAttributes } from './coverApiClasses/coverAttributes.class';
import { coverData } from './coverApiClasses/coverData.class';
import { chapterData } from './chapterClasses/chapterData.class';

@Injectable({ providedIn: 'root' })
export class MangaService {
  myApiResponse: apiResponse = new apiResponse("", "", [], "", "", "");
  myNoneVolume: noneVolume = new noneVolume([], 0, "");
  myVolume: Volume = new Volume([], 0, "", this.myNoneVolume);
  searchInput: string = "";
  mangaList: Array<Manga> = [];
  myManga = new Manga("", "", "");
  myChapterList: ChapterListApiResponse = new ChapterListApiResponse("", []);
  myChapter: Chapter = new Chapter("", 0, "");
  myChapterArray: Array<Chapter> = [];
  myCoverAttributes: coverAttributes = new coverAttributes("", "", "", 0, "", "");
  myCover: Cover = new Cover("", "", this.myCoverAttributes, [])
  myCoverData: coverData = new coverData("", "", this.myCover); 
  myCoverFileName: string = "";
  myCoverArtURL: string = "";
  myTranslatedLanguage: Array<string> = [];
  myMangaId = "";



  constructor(private http: HttpClient) { }

  setMangaList(mySearchInput: string) {
    this.mangaList = [];

    let searchParams = new HttpParams();
    searchParams = searchParams.append('title', mySearchInput);

    return this.http.get<{ result: string, response: string, data: Array<apiData>, limit: string, offset: string, total: string }>('https://api.mangadex.org/manga',
      {
        params: searchParams
      }
    )
      .subscribe(data => {
        this.myApiResponse = data

        for (let x = 0; x < this.myApiResponse.data.length; x++) {
          if (JSON.stringify(this.myApiResponse.data[x].attributes.title.en) != null) {
            const myString = JSON.stringify(this.myApiResponse.data[x].attributes.title.en);
            const myLength = myString.length;
            const myString2 = myString.substring(1, myLength - 1);
            let y = 0;
            for (y = 0; y < this.myApiResponse.data[x].relationships.length; y++)
            {
              if (this.myApiResponse.data[x].relationships[y].type == "cover_art")
              {
                break;
              }
            }

            this.myManga = new Manga(myString2, this.myApiResponse.data[x].id, this.myApiResponse.data[x].relationships[y].id);
            this.mangaList.push(this.myManga);
          }
          else if (JSON.stringify(this.myApiResponse.data[x].attributes.title.jp) != null) {
            const myString = JSON.stringify(this.myApiResponse.data[x].attributes.title.jp);
            const myLength = myString.length;
            const myString2 = myString.substring(1, myLength - 1);
            let y = 0;
            for (y = 0; y < this.myApiResponse.data[x].relationships.length; y++) {
              if (this.myApiResponse.data[x].relationships[y].type == "cover_art") {
                break;
              }
            }
            this.myManga = new Manga(myString2, this.myApiResponse.data[x].id, this.myApiResponse.data[x].relationships[y].id);
            this.mangaList.push(this.myManga);
          }
          else {
            console.log("No title found!");
          }
        }

        return this.mangaList;
      })



  }

  getMangaList() {
    return this.mangaList;
  }

  setSearchInput(mySearchInput: string) {
    this.searchInput = mySearchInput
  }

  getSearchInput() {
    return this.searchInput
  }

  setChapterList(mangaId: string) {
    this.myChapterArray = [];
    this.myTranslatedLanguage.push('en');
    let searchParams = new HttpParams();
    let translatedLanguage: Array<string> = ['en'];
    translatedLanguage.forEach((language: string) => {
      searchParams = searchParams.append(`translatedLanguage[]`, language)
    })

    return this.http.get<{ result: string, volumes: Array<Volume> }>('https://api.mangadex.org/manga/' + mangaId + '/aggregate'
      ,
      {
        params: searchParams
      }
    )
      .subscribe(data => {
        this.myChapterList = data

        for (const [key] of Object.entries(this.myChapterList.volumes)) {
          let x = key;

          for (const [key] of Object.entries(this.myChapterList.volumes[x].chapters)) {
            this.myChapter.chapter = this.myChapterList.volumes[x].chapters[key].chapter;
            this.myChapter.count = this.myChapterList.volumes[x].chapters[key].count;
            this.myChapter.id = this.myChapterList.volumes[x].chapters[key].id;
            this.myChapterArray.push(this.myChapter);
            this.myChapter = new Chapter("", 0, "");
          }

        }
        this.myChapterArray.sort(function (a: any, b: any) {
          return a.chapter - b.chapter
        });
      })
}

  getChapterList() {
    return this.myChapterArray;
  }

  getCoverFileName(coverId: string) {

    return this.http.get<{ result: string, response: string, data: Cover }>('https://api.mangadex.org/cover/' + coverId)

  }

  setCoverFileUrl(mangaId: string, coverArtFileName: any) {
    this.myCoverArtURL = 'https://uploads.mangadex.org/covers/' + mangaId + '/' + coverArtFileName + '.512.jpg';
    return this.myCoverArtURL;
  }

  getCoverFileUrl() {
    return this.myCoverArtURL;
  }

  getChapter(chapterId: string) {
    return this.http.get<{ result: string, response: string, data: chapterData }>('https://api.mangadex.org/chapter/' + chapterId)
  }


}


