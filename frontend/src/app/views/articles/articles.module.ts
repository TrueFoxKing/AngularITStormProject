import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { ArticleComponent } from './article/article.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    CatalogComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
