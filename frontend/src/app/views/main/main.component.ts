import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ArticlesService} from "../../shared/services/articles.service";
import {ArticlesType} from "../../../types/articles.type";
import {OwlOptions} from "ngx-owl-carousel-o";
import {OurServicesType} from "../../../types/our-services.type";
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../shared/services/request.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {MatSelectChange} from '@angular/material/select';
import {RequestsTypeEnum} from "../../../types/requests.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  topArticles: ArticlesType[] = [];

  constructor(private articlesService: ArticlesService,
              private fb: FormBuilder,
              private requestService: RequestService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.articlesService.getTopArticles()
      .subscribe((data: ArticlesType[]) => {

        this.topArticles = data;
      })
  }

  customOptions: OwlOptions = {
    items: 1,
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 1500,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  }
  reviews = [
    {
      name: 'Станислав',
      image: 'review1.png',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.',
    },
    {
      name: 'Алёна',
      image: 'review2.png',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.',
    },
    {
      name: 'Мария',
      image: 'review3.png',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!',
    },
  ]
  customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  };
  servicesList: OurServicesType[] = [
    {
      image: 'website-creating.png',
      subtitle: 'Создание сайтов',
      text: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      price: '7 500',
    },
    {
      image: 'promotion.png',
      subtitle: 'Продвижение',
      text: 'Вам нужен качественный SMM-специалист или грамотный таргетолог?\n' +
        '          Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      price: '3 500',
    },
    {
      image: 'advertisement.png',
      subtitle: 'Реклама',
      text: 'Без рекламы не может обойтись ни один бизнес или специалист.\n' +
        '          Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      price: '1 000',
    },
    {
      image: 'copywriting.png',
      subtitle: 'Копирайтинг',
      text: 'Наши копирайтеры готовы написать Вам любые продающие текста,\n' +
        '          которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      price: '750',
    },
  ];
  @ViewChild('popUpSuccess') popUpSuccess!: TemplateRef<ElementRef>;
  @ViewChild('popUp') popUp!: TemplateRef<ElementRef>;
  orderServiceForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[А-ЯЁ][а-яё]*(\s[А-ЯЁ][а-яё]*)*$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
  });
  selectedServiceValue = this.servicesList[0].subtitle
  orderRequest: RequestsTypeEnum = RequestsTypeEnum.order;
  orderErrorRequest: boolean = false;

  callMeBack(selectedOption: string): void {
    // при клике на "подбронее" открывается попап и подставляется опция из кликнутого блока с карточки услуг
    this.selectedServiceValue = selectedOption;
    this.dialog.open(this.popUp);
  }

  data(value: MatSelectChange): void {
    // Отслеживает изменения  выбраной опции в попапе
    this.selectedServiceValue = value.value;
  }

  sendOrderRequest(requestType: RequestsTypeEnum): void {
    if (this.orderServiceForm.valid && this.orderServiceForm.value.name && this.orderServiceForm.value.phone && this.selectedServiceValue) {
      let requestData = {
        name: this.orderServiceForm.value.name,
        phone: this.orderServiceForm.value.phone,
        type: requestType,
        service: this.selectedServiceValue
      }
      console.log(requestData);
      this.requestService.sendUserRequest(requestData)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message);
              throw new Error(data.message);
            }
            this.dialog.closeAll();
            this.dialog.open(this.popUpSuccess);
            this.orderServiceForm.reset();
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && (errorResponse.error.message)) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this.orderErrorRequest = true;
              this._snackBar.open('Ошибка отправки заявки. Попробуйте ещё раз чуть позже');
            }
          }
        });
    }
  }


  close(): void {
    this.dialog.closeAll();
    this.orderServiceForm.reset();
  }
}
