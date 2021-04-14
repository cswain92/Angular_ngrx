import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  baseUrl: String = /*environment.apiUrl */ 'https://jsonplaceholder.typicode.com/';

  headers: HttpHeaders;

  dataTableLoaderTracker: boolean = true;

  globalLoaderShow: BehaviorSubject<boolean>;
  globalLoaderShow_: Observable<any>;
  globalRouterLoaderShow: BehaviorSubject<boolean>;
  globalRouterLoaderShow_: Observable<any>;

  public tableDataGet: BehaviorSubject<any>;
  public tableDataGet_: Observable<any>;
  public urls: Array<any> = []
  public imgFiles: Array<any> = [];

  constructor(private http: HttpClient) {
      this.headers = new HttpHeaders();
      let savedKey = localStorage.getItem('authorizeToken');
      if (savedKey !== null) {
          this.headers = new HttpHeaders({
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Token ' + savedKey
          })
      }
      this.globalRouterLoaderShow = new BehaviorSubject(false);
      this.globalRouterLoaderShow_ = this.globalRouterLoaderShow.asObservable();


      this.globalLoaderShow = new BehaviorSubject(false);
      this.globalLoaderShow_ = this.globalLoaderShow.asObservable();

      this.tableDataGet = new BehaviorSubject(false);
      this.tableDataGet_ = this.tableDataGet.asObservable();
  }

  get(url) {
      this.headers = new HttpHeaders();
      let savedKey = localStorage.getItem('authorizeToken');
      if (savedKey !== null) {
          this.headers = new HttpHeaders({
              'Authorization': 'Token ' + savedKey
          })
      }
      return this.http.get(this.baseUrl + url, { headers: this.headers });
  }
  getNavsoft(url) {
      this.headers = new HttpHeaders();
      let savedKey = localStorage.getItem('authorizeToken');
      if (savedKey !== null) {
          this.headers = new HttpHeaders({
              'Authorization': 'Token ' + savedKey
          })
      }
      return this.http.get(this.baseUrl + url);
  }
  post(url, data) {
      this.headers = new HttpHeaders();
      let savedKey = localStorage.getItem('authorizeToken');
      if (savedKey !== null) {
          this.headers = new HttpHeaders({
              'Authorization': 'Token ' + savedKey
          })
      }
      return this.http.post(this.baseUrl + url, data, { headers: this.headers });
  }
  put(url?: any, data?: any) {
      this.headers = new HttpHeaders();
      let savedKey = localStorage.getItem('authorizeToken');
      if (savedKey !== null) {
          this.headers = new HttpHeaders({
              'Authorization': 'Token ' + savedKey
          })
      }
      return this.http.put(this.baseUrl + url, data, { headers: this.headers });
  }
  delete(url) {
      this.headers = new HttpHeaders();
      let savedKey = localStorage.getItem('authorizeToken');
      if (savedKey !== null) {
          this.headers = new HttpHeaders({
              'Authorization': 'Token ' + savedKey
          })
      }
      return this.http.delete(this.baseUrl + url, { headers: this.headers });
  }
  loginPost(url, data) {
      return this.http.post(this.baseUrl + url, data);
  }
  setGlobalLaoder(payload: any) {
      this.globalLoaderShow.next(payload);
  }
  setGlobalRouterLaoder(payload: any) {
      this.globalRouterLoaderShow.next(payload);
  }

  setTableData() {
      this.tableDataGet.next('');
  }

  random(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  getBase64ImageFromURL(url: string) {
      return Observable.create((observer: any) => {
          let img = new Image();
          img.crossOrigin = 'Anonymous';
          img.src = url;
          if (!img.complete) {
              img.onload = () => {
                  observer.next(this.getBase64Image(img));
                  observer.complete();
              };
              img.onerror = (err) => {
                  observer.error(err);
              };
          } else {
              observer.next(this.getBase64Image(img));
              observer.complete();
          }
      });
  }

  getBase64Image(img: HTMLImageElement) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  getEncode(str: any) {
      var authorizeToken = localStorage.getItem('authorizeToken');
      var encription = btoa(str + authorizeToken);
      return encription;
  }

  getDecode(str: any) {
      var authorizeToken = localStorage.getItem('authorizeToken');
      let decription: any = atob(str);
      decription = decription.split(authorizeToken);
      return decription[0];
  }

}
