import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";
import { showMoreCommentType} from "../../../types/single-article.type";
import {GetActionsForCommentType} from "../../../types/get-actions-for-comment.type";
import {ActionForCommentType} from "../../../types/action-for-comment.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  // Запрос на загрузку комментариев к статье.
  // Передаем количество комментариев, которые надо пропустить, а также id статьи
  getComments(offsetCount: number, articleId: string): Observable<showMoreCommentType> {
    return this.http.get<showMoreCommentType>(environment.api + 'comments?offset=' + offsetCount + '&article=' + articleId);
  }

  // Запрос на добавление нового комментария. Необходимо передавать авторизационный заголовок с access токеном.
  // В ответ получаем DefaultResponse
  addComments(text: string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text, article
    });
  }

  // Запрос на применение действия для комментария. Возможные варианты для action в body: like, dislike, violate
  // Необходимо передавать авторизационный заголовок с access токеном
  applyAction(commentId: string, action: ActionForCommentType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + commentId + '/apply-action', {
      action
    });
  }

  // Запрос на получение действий пользователя для всех комментариев в рамках одной статьи.
  // Необходимо передавать авторизационный заголовок с access токеном.
  // В ответ получаем DefaultResponse в случае неудачи, либо же массив действий пользователя(кроме violate)для комментариев.
  getActionsForComment(commentId: string): Observable<GetActionsForCommentType[]> {
    return this.http.get<GetActionsForCommentType[]>(environment.api + 'comments/' + commentId + '/actions');
  }

}
