import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { LoadPicsService } from '../../services/load-pics.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {
  
  isOverDrop: boolean = false;
  files: FileItem[] = [];

  constructor( public _loadPics: LoadPicsService) { }

  ngOnInit() {
  }

  loadPics() {
    this._loadPics.loadPicsFirebase( this.files );
  }
}
