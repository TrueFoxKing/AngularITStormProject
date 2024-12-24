import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ArticlesType} from "../../../types/articles.type";
import {ActiveParamsType} from "../../../types/active-params.type";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) {
  }


  getTopArticles(): Observable<ArticlesType[]> {
    return this.http.get<ArticlesType[]>(environment.api + 'articles/top');
  }

  getAllArticles(params: ActiveParamsType): Observable<{ count: number, pages: number, items: ArticlesType[]}> {
    return this.http.get<{ count: number, pages: number, items: ArticlesType[]}>(environment.api + 'articles', {
      params: params
    });
  }

  getArticle(url: string): Observable<ArticlesType> {
    return this.http.get<ArticlesType>(environment.api + 'articles/' + url);
  }

  getRelatedArticles(url: string): Observable<ArticlesType[]> {
    return this.http.get<ArticlesType[]>(environment.api + 'articles/related/' + url);
  }


}
