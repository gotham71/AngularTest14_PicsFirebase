import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Item { name: string; url: string; }

@Component({
  selector: 'app-pics',
  templateUrl: './pics.component.html',
  styles: []
})
export class PicsComponent implements OnInit {
  
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) { 
    this.itemsCollection = afs.collection<Item>('pics');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
  }

}
