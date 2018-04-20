import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

@Injectable()
export class LoadPicsService {

  private PICS_FOLDER = 'pics';

  constructor( private _db: AngularFirestore ) { }

  loadPicsFirebase( pics: FileItem[] ) {
    console.log(pics);
  }

  private savePic( pic: { name: string, url: string } ) {
    this._db.collection(`/${ this.PICS_FOLDER }`).add(pic);
  }

}
