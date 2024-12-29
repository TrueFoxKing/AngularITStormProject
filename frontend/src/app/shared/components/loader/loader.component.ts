import {Component, OnInit} from '@angular/core';
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(private loaderService: LoaderService) {
  }

  isShowed: boolean = false;

  ngOnInit(): void {
    this.loaderService.isShowed$.subscribe((loaderStatus: boolean) => {
      this.isShowed = loaderStatus;
    })
  }

}
