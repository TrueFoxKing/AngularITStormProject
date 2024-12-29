import {Component, Input, OnInit} from '@angular/core';
import {CommentType} from "../../../../types/single-article.type";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentsService} from "../../services/comments.service";
import {ActionForCommentType} from "../../../../types/action-for-comment.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GetActionsForCommentType} from "../../../../types/get-actions-for-comment.type";

@Component({
  selector: 'comment-block',
  templateUrl: './comment-block.component.html',
  styleUrls: ['./comment-block.component.scss']
})

export class CommentBlockComponent implements OnInit {

  @Input() comment!: CommentType;
  isLogged: boolean = false;

  constructor(private authService: AuthService,
              private commentsService: CommentsService,
              private _snackBar: MatSnackBar) {
    this.isLogged = this.authService.getIsLoggedIn();
    // this.comment = {
    //   id: '',
    //   text: '',
    //   date: '',
    //   likesCount: 0,
    //   dislikesCount: 0,
    //   user: {
    //     id: '',
    //     name: ''
    //   }
    // }
  }

  commentActionLike: ActionForCommentType = ActionForCommentType.like;
  commentActionDislike: ActionForCommentType = ActionForCommentType.dislike;
  commentActionViolate: ActionForCommentType = ActionForCommentType.violate;
  likesCount: number = 0;
  activeLike: boolean = false;
  dislikesCount: number = 0;
  activeDislike: boolean = false;

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    if (this.isLogged) {
      this.commentsService.getActionsForComment(this.comment.id)
        .subscribe((data: GetActionsForCommentType[]) => {
          data.forEach((comment: GetActionsForCommentType) => {
            if (comment.comment === this.comment.id) {
              if (comment.action === this.commentActionLike) {
                this.activeLike = true;
                this.likesCount = 1;
              }
              if (comment.action === this.commentActionDislike) {
                this.activeDislike = true;
                this.dislikesCount = 1;
              }
            }
          });
        });
    }
  }


  commentActionButtons(commentId: string, action: ActionForCommentType): void {
    if (this.isLogged) {
      this.commentsService.applyAction(commentId, action)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (!data.error) {
              if (action === this.commentActionLike) {
                this._snackBar.open('Ваш голос учтен');
                this.activeDislike = false;
                this.activeLike = !this.activeLike;
                if (this.activeLike) {
                  this.likesCount = 1;
                } else {
                  if (!this.activeLike) {
                    this.likesCount = 0;
                  }
                }
              }
              else  {
                if (action === this.commentActionDislike) {
                  this.likesCount = 0;
                }
              }
              if (action === this.commentActionDislike) {
                this._snackBar.open('Ващ голос учтен');
                this.activeLike = false;
                this.activeDislike = !this.activeDislike;

                if (this.activeDislike) {
                  this.dislikesCount = 1;
                } else  {
                  if (!this.activeDislike) {
                    this.dislikesCount = 0;
                  }
                }
              } else  {
                if (action === this.commentActionLike) {
                  this.dislikesCount = 0;
                }
              }
              if (action === this.commentActionViolate) {
                this._snackBar.open('Жалоба отправлена');
              }
            }
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open('Жалоба уже отправлена');
            }
          }
        });
    } else {
      this._snackBar.open('Для совершения действия необходимо войти в систему или зарегистрироваться');
    }

  }

}
