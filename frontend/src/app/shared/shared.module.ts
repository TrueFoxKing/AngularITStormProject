import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlogCardComponent} from "./components/blog-card/blog-card.component";
import {RouterModule} from "@angular/router";
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { CommentBlockComponent } from './components/comment-block/comment-block.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [BlogCardComponent, CategoryFilterComponent, CommentBlockComponent, LoaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BlogCardComponent,
    CategoryFilterComponent,
    CommentBlockComponent,
    LoaderComponent,
  ]
})
export class SharedModule { }
