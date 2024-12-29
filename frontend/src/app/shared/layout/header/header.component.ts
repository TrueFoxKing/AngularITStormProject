import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserInfoType} from "../../../../types/user-info.type";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
      this.getUserName();
    });
    this.getUserName();

    // this.authService.getUserInfo().subscribe({
    //   next: (data: UserInfoType | DefaultResponseType) => {
    //     if ('error' in data) {
    //       this._snackBar.open('Ошибка загрузки данных пользователя');
    //     } else {
    //       this.userName = data;
    //     }
    //   },
    //   error: (err: Error) => {
    //     console.error('Ошибка получения данных пользователя:', err.message);
    //   },
    // });
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      })
  }

  getUserName(): void {
    if (this.isLogged) {
      this.authService.getUserInfo()
        .subscribe((data:UserInfoType | DefaultResponseType) => {
          this.userName = (data as UserInfoType).name
        })
    }
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/'])
  }

}
