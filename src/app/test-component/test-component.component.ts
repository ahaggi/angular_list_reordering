import { Component, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit{
  
  todo : string[]
  ngOnInit(): void {

    this.todo = [
      'item1 ' + this.testId,
      'item2 '+ this.testId,
      'item3 '+ this.testId,
      'item4 '+ this.testId,
    ];
  
  }

  @Input() testId : string;
  @Input() allIds : string[];

  getConnectedTo (id:string):string[] {
    let connectedTo = [...this.allIds];

    connectedTo.splice( this.allIds.indexOf(id) , 1);

    
    return  connectedTo 

  }



  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}