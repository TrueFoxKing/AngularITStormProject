import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './shared/layout/layout.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {MainComponent} from './views/main/main.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {BlogCardComponent} from './shared/components/blog-card/blog-card.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogComponent} from './shared/components/dialog/dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PolicyComponent} from './views/policy/policy.component';
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    DialogComponent,
    PolicyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    CarouselModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
