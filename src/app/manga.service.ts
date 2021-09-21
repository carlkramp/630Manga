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
import { map } from 'rxjs/operators';

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



  constructor(private http: HttpClient) { }

  //searchManga() {

  //  return this.http.get<{ results: Array<apiResults>, limit: string, offset: string, total: string }>('https://api.mangadex.org/manga')
  //    .pipe(map(data => {
  //      this.myApiResponse.results = data.results, this.myApiResponse.limit = data.limit,
  //        this.myApiResponse.offset = data.offset, this.myApiResponse.total = data.total;
  //      return this.myApiResponse;
  //    }))

  //}

  //searchMangaByTitle(mySearchInput: string) {
  //  console.log(mySearchInput);
  //  let searchParams = new HttpParams();
  //  searchParams = searchParams.append('title', mySearchInput);

  //  return this.http.get<{ results: Array<apiResults>, limit: string, offset: string, total: string }>('https://api.mangadex.org/manga' ,
  //    {
  //      params: searchParams
  //    }
  //  )
  //    .pipe(map(data => {
  //      this.myApiResponse.results = data.results, this.myApiResponse.limit = data.limit,
  //        this.myApiResponse.offset = data.offset, this.myApiResponse.total = data.total;
  //      return this.myApiResponse;
  //    }))}


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
        console.log(data);
        console.log(this.myApiResponse.data);

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
            console.log(myString);
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

    return this.http.get<{ result: string, volumes: Array<Volume>}>('https://api.mangadex.org/manga/' + mangaId + '/aggregate')
  .subscribe(data => {
    this.myChapterList = data
    console.log(data);

    let x = 1;
    let y = 1;
    let setChapterBoolean = true;


    while (setChapterBoolean == true)
    {
      try {
        this.myChapterList.volumes[x].chapters[y].chapter
      }
      catch (error) {
        break;
      }
      while (setChapterBoolean == true)
      {
            this.myChapter.chapter = this.myChapterList.volumes[x].chapters[y].chapter;
            this.myChapter.count = this.myChapterList.volumes[x].chapters[y].count;
            this.myChapter.id = this.myChapterList.volumes[x].chapters[y].id;
            this.myChapterArray.push(this.myChapter);
            this.myChapter = new Chapter("", 0, "");
            y = y + 0.5;

            try
            {
              this.myChapterList.volumes[x].chapters[y].chapter;
            }
            catch (error)
            {
              if (y % 1 != 0)
              {
                y = y + 0.5;
              }
              else
              {
                break;
              }
            }

            try
            {
              this.myChapterList.volumes[x].chapters[y].chapter;
            }
            catch (error)
            {
              break;
            }

          }
        x++;

        try
        {
          this.myChapterList.volumes[x].chapters[y].chapter
        }
        catch (error)
        {
          break;
        }

    }

    while (setChapterBoolean == true)
    {
        try
        {
          y = y + 0.5;

          try
          {
            this.myChapterList.volumes[x].chapters[y].chapter;
          }
          catch (error) {
            if (y % 1 != 0)
            {
              y = y + 0.5;
            }
            else {
              break;
            }
          }

          try {
            this.myChapterList.volumes.none.chapters[y].chapter;
          }
          catch (error) {
            break;
          }

          this.myChapter.chapter = this.myChapterList.volumes.none.chapters[y].chapter;
          this.myChapter.count = this.myChapterList.volumes.none.chapters[y].count;
          this.myChapter.id = this.myChapterList.volumes.none.chapters[y].id;
          this.myChapterArray.push(this.myChapter);
          this.myChapter = new Chapter("", 0, "");
      
        }
        catch (error)
        {
          console.log(error);
          setChapterBoolean = false;
          break;
        }
    }

    console.log(this.myChapterArray);
    })

   }

  getChapterList() {
    return this.myChapterArray;
  }

  setCoverFileName(mangaId: string, coverId: string) {


    //return this.http.get<{ result: string, response: string, data: Cover }>('https://api.mangadex.org/cover/' + coverId)
    //  .subscribe(data => {
    //    this.myCoverData = data 
    //    this.myCoverFileName = this.myCoverData.data.attributes.fileName;
    //    console.log(this.myCoverFileName);
    //    //this.setCoverFileUrl(mangaId, this.myCoverFileName)
    //    console.log(data);
    //    console.log("file name set");
    //    //return this.myCoverFileName;
    //  })



     //this.http.get<{ result: string, response: string, data: Cover }>('https://api.mangadex.org/cover/' + coverId)
     // .pipe(map(async data => {
     //   this.myCoverData = await data
     //   this.myCoverFileName = this.myCoverData.data.attributes.fileName;
     //   console.log(this.myCoverFileName);
     //   //this.setCoverFileUrl(mangaId, this.myCoverFileName)
     //   console.log(data);
     //   console.log("file name set");
     //   const myCoverUrl = await this.setCoverFileUrl(mangaId, this.myCoverFileName);
     //   console.log(myCoverUrl);
     //   return myCoverUrl;
     // })).subscribe(data => {
     //   console.log(data);
     // })

    return this.http.get<{ result: string, response: string, data: Cover }>('https://api.mangadex.org/cover/' + coverId)
      //(data => {
      //  console.log(data);
      //  this.myCoverData =  data
      //  this.myCoverFileName = this.myCoverData.data.attributes.fileName;
      //  console.log(this.myCoverFileName);
      //  //this.setCoverFileUrl(mangaId, this.myCoverFileName)
      //  console.log(data);
      //  console.log("file name set");
      //  const myCoverUrl =  this.setCoverFileUrl(mangaId, this.myCoverFileName);
      //  console.log(myCoverUrl);
      //  return myCoverUrl;
      //})
  }

  

  getCoverFileName() {
    console.log("file name got");
    return this.myCoverFileName;
  }

  setCoverFileUrl(mangaId: string, coverArtFileName: any) {
    console.log("cover set");
    this.myCoverArtURL = 'https://uploads.mangadex.org/covers/' + mangaId + '/' + coverArtFileName + '.512.jpg';
    return this.myCoverArtURL;
  }

  getCoverFileUrl() {
    console.log("cover got");
    return this.myCoverArtURL;
  }

  }


 //setCover(mangaId: string, coverFileName: string) {
  //  return this.http.get<{ result: string, response: string, data: Cover }>('https://uploads.mangadex.org/covers/' + mangaId + '/' + coverFileName)
  //    .subscribe(data => {
  //      const coverArt = data;
  //    })
  //}

  //getCover() {

  //}

  //getChapter(chapterId: string) {

  //  return this.http.get<{}>('https://api.mangadex.org/chapter/' + chapterId)
  //    .subscribe(data => {

  //      this.myChapterList = data,
  //        this.myChapterList.result = data.result,
  //        this.myChapterList.volumes = data.volumes,
  //        console.log(data);
  //      const myString = JSON.stringify(this.myChapterList.volumes[1].chapters[1].id)
  //      console.log("This is my chapter list:" + this.myChapterList),
  //        console.log("This is my chapter list:" + this.myChapterList.result),
  //        console.log("This is my chapter list:" + myString);
  //      return this.myChapterList;

  //    })
  //}



    //let searchParams = new HttpParams();

    //searchParams = searchParams.append('volume', 'asc');
    //searchParams = searchParams.append('chapter', 'asc');
    //console.log(searchParams);

    //searchParams = searchParams.append('order=volume=enum', 'asc');
    //console.log(searchParams);

    // view manga - https://api.mangadex.org/manga/{id}
    // get manga chapters/volumes https://api.mangadex.org/manga/{id}/aggregate
    // get manga feed https://api.mangadex.org/manga/{id}/feed
    // 32d76d19-8a05-4db0-9fc2-e0b0648fe9d0 - slime ID
