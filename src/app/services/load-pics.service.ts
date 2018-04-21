import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

@Injectable()
export class LoadPicsService {

  private PICS_FOLDER = 'pics';

  constructor( private _db: AngularFirestore ) { }

  loadPicsFirebase( pics: FileItem[] ) {

    const storageRef = firebase.storage().ref();

    for (const pic of pics) {
      
      pic.uploading = true;

      if (pic.progress >= 100) {
        continue;
      }
      
      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${ this.PICS_FOLDER }/${ pic.filename }`).put( pic.file );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        
          ( snapshot: firebase.storage.UploadTaskSnapshot ) => pic.progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
          ( error ) => console.error('Upload image issue', error),
          () => {
            console.log('Image Uploaded succesfully');
            pic.url = uploadTask.snapshot.downloadURL;
            pic.uploading = true;
            this.savePic( {name: pic.filename, url: pic.url});
          });
        
        }
      
    }
  

  private savePic( pic: { name: string, url: string } ) {
    this._db.collection(`/${ this.PICS_FOLDER }`).add(pic);
  }

}
