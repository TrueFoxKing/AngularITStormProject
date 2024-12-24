import {Component, Input, OnInit} from '@angular/core';
import {ArticlesType} from "../../../../types/articles.type";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  @Input() article!: ArticlesType;
  serverStaticPath = environment.serverStaticPath;

  constructor() { }

  ngOnInit(): void {
  }

}
