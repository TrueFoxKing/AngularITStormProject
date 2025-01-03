import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RequestsType, RequestsTypeEnum} from "../../../../types/requests.type";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private requestService: RequestService,
              private _snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
  }

  @ViewChild('popUpSuccess') popUpSuccess!: TemplateRef<ElementRef>;
  @ViewChild('popUp') popUp!: TemplateRef<ElementRef>;
  consultingForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[А-ЯЁ][а-яё]*(\s[А-ЯЁ][а-яё]*)*$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
  });
  consultationRequest: RequestsTypeEnum = RequestsTypeEnum.consultation;

  callMeBack(): void {
    this.dialog.open(this.popUp)
  }

// TODO : логику для оптравки формы
  sendConsultingRequest(requestType: RequestsTypeEnum): void {
    if (this.consultingForm.valid && this.consultingForm.value.name && this.consultingForm.value.phone) {
      let requestData: RequestsType = {
        name: this.consultingForm.value.name,
        phone: this.consultingForm.value.phone,
        type: requestType
      }

      this.requestService.sendUserRequest(requestData)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message);
              throw new Error(data.message);
            }
            this.dialog.closeAll();
            this.dialog.open(this.popUpSuccess);
            this.consultingForm.reset();
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && (errorResponse.error.message)) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка отправки заявки. Попробуйте ещё раз чуть позже');
            }
          }
        });
    }
  }

  close(): void {
    this.dialog.closeAll();
    this.consultingForm.reset();
  }

}
