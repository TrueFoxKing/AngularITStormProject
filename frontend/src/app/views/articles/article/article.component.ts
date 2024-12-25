import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../../../shared/services/articles.service";
import {ArticlesType} from "../../../../types/articles.type";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {SingleArticleType} from "../../../../types/single-article.type";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article!: SingleArticleType
  relatedArticles: ArticlesType[] = [];
  serverStaticPath = environment.serverStaticPath;
  isLogged: boolean = false;

  constructor(private articlesService: ArticlesService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {

    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    this.activatedRoute.params.subscribe(params => {
      this.articlesService.getArticle(params['url'])
        .subscribe((data: SingleArticleType) => {
          this.article = data;
        })
      this.articlesService.getRelatedArticles(params['url'])
        .subscribe((data: ArticlesType[]) => {
          this.relatedArticles = data;
        })
    });

  }

  publishComment() {
    // TODO: логику добавления комента
  }

}
