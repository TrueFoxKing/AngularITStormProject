import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlogCardComponent} from "./components/blog-card/blog-card.component";
import {RouterModule} from "@angular/router";
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';



@NgModule({
  declarations: [BlogCardComponent, CategoryFilterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BlogCardComponent,
    CategoryFilterComponent,
  ]
})
export class SharedModule { }
