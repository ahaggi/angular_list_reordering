import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MOCK_DATA, Items } from './mock_data'
import { ApiService } from './api.service';
import { Observable, Subscription } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy {
  private title: string;
  private items: Items[];
  private loading : boolean = false;
  private subscription : Subscription;

  testUsers = ["user1" , "user2"]

  constructor(private apiService: ApiService) { }



  ngOnInit(): void {
    this.title = 'list-reordering';
    this.getHeroes();
  }

  // When Is It OK To Just Subscribe with out unsubscribe?
  //  Some components (eg AppComponent) and most of the services (with exception of services from lazy loaded modules and services provided in @Component decorator) in our Angular application will be instantiated only once during the application startup.
  ngOnDestroy(): void {
    // according to the above comment this is not necessary because AppComponent will be init just once during the app lifecycle
    this.subscription.unsubscribe();
    console.log("¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤ Unsubscribed ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤")

  }


  getHeroes(): void {
    this.loading = true;

    const myObserver = {
      next: _items => {this.items = _items,
                      this.loading = false},
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification: app.component'),
    };
    const observable = this.apiService.getItems();
    this.subscription = observable.subscribe(myObserver);
    console.log("!!!!!!!!!!!!! subscribed !!!!!!!!!!!!!")
  }

  


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    console.log(this.items);
  }


}
