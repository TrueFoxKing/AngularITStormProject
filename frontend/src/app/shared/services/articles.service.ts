import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ArticlesType} from "../../../types/articles.type";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) {
  }


  getTopArticles(): Observable<ArticlesType[]> {
    return this.http.get<ArticlesType[]>(environment.api + 'articles/top');
  }

  getAllArticles(): Observable<{ count: number, pages: number, items: ArticlesType[]}> {
    return this.http.get<{ count: number, pages: number, items: ArticlesType[]}>(environment.api + 'articles');
  }

  getRelatedArticles(): Observable<ArticlesType[]> {
    return this.http.get<ArticlesType[]>(environment.api + 'articles/related');// + имя артикля
  }


}
