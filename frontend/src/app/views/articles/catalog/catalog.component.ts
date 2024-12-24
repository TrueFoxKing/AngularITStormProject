import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../../../shared/services/articles.service";
import {ArticlesType} from "../../../../types/articles.type";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  allArticles: ArticlesType[] = [];

  pages: number[] = [];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.getAllArticles()
      .subscribe(data => {
        this.allArticles = data.items;
      });

  }


}
