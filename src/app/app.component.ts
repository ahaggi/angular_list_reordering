import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MOCK_DATA, Items } from './mock_data'
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  data: Items[];

  constructor(private apiService: ApiService) { }



  ngOnInit(): void {
    this.title = 'list-reordering';
    this.data = this.apiService.getItems();
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    console.log(this.data);
  }


}
