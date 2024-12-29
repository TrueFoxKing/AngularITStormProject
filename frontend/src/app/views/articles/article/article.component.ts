import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../../../shared/services/articles.service";
import {ArticlesType} from "../../../../types/articles.type";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {CommentType, showMoreCommentType, SingleArticleType} from "../../../../types/single-article.type";
import {AuthService} from "../../../core/auth/auth.service";
import {forkJoin} from "rxjs";
import {CommentsService} from "../../../shared/services/comments.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoaderService} from "../../../shared/services/loader.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  currentPageUrl: string = 'url'
  article: SingleArticleType = {
    text: '',
    comments: [],
    commentsCount: 0,
    id: '',
    title: '',
    description: '',
    image: '',
    date: '',
    category: '',
    url: ''
  }
  relatedArticles: ArticlesType[] = [];
  serverStaticPath = environment.serverStaticPath;
  isLogged: boolean = false;
  isLoadMoreComments: boolean = false;
  commentText: string = '';
  allCounts: number = 0;
  quantityOfComments: number = 0;
  quantityOfCommentsAfterClick: number = 0;


  constructor(private articlesService: ArticlesService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private commentsService: CommentsService,
              private _snackBar: MatSnackBar,
              private loaderService: LoaderService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {

    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    this.activatedRoute.params.subscribe(params => {
      forkJoin([
        this.articlesService.getArticle(params[this.currentPageUrl]),
        this.articlesService.getRelatedArticles(params[this.currentPageUrl])
      ]).subscribe(([article, relatedArticles]) => {
        this.article = article;
        this.relatedArticles = relatedArticles;
        this.allCounts = article.commentsCount;
        this.quantityOfComments = this.article.comments.length;

        if (this.article.commentsCount > 3) {
          this.isLoadMoreComments = true;
        }

      });
    });
  }

  publishComment(): void {
    // TODO: логику добавления комента
    this.commentsService.addComments(this.commentText, this.article.id)
      .subscribe((data: DefaultResponseType) => {
        if (!data.error) {
          this._snackBar.open('Комментарий успешно добавлен');
          this.commentText = '';

          // после клика на добавить комментарий обновляем данные страницы
          this.activatedRoute.params.subscribe(params => {
            this.articlesService.getArticle(params[this.currentPageUrl])
              .subscribe((data: SingleArticleType) => {
                this.article = data;
                this.allCounts = data.commentsCount;
                this.quantityOfComments = this.article.comments.length;
                if (this.article.commentsCount > 3) {
                  this.isLoadMoreComments = true;
                }
              });
          });

        } else {
          this._snackBar.open('Возникла ошибка. Попробуйте оставить комментарий позже');
        }
      });
    console.log(this.commentText + ' для ' + this.article.title);
  }


  load10MoreComments(): void {
    // TODO: логику загрузки ещё 10 коментов
    this.loaderService.show();
    this.commentsService.getComments(this.quantityOfComments, this.article.id)
      .subscribe((data: showMoreCommentType) => {
        data.comments.forEach((comment: CommentType) => {
          this.article.comments.push(comment);
        });
        // добавил таймаут чтобы было видно лоадер
        setTimeout(() => {
          this.loaderService.hide();
        },500);
        this.quantityOfComments = this.article.comments.length;
        this.quantityOfCommentsAfterClick = this.allCounts - this.quantityOfComments;
        this.isLoadMoreComments = this.quantityOfCommentsAfterClick > 0;
      });
  }

}
