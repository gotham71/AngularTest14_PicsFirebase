import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() files: FileItem[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter ( event: any ) {
    this.mouseOver.emit( true );
    this._preventStop(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseOver.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {

    const transference = this._getTransference(event);
  
    if ( !transference ) {
      return;
    }

    this._extractFiles( transference.files );

    this._preventStop( event );
    this.mouseOver.emit(false);    
  }


  private _getTransference( event: any ) { //Compatibility hack with browsers
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extractFiles( fileList: FileList ) {
    for (const propiedad in Object.getOwnPropertyNames(fileList)) {
      const fileTmp = fileList[propiedad];

      if (this._fileCanBeUploaded(fileTmp)) {
        const newFile = new FileItem(fileTmp);
        this.files.push(newFile);
      }
      
    }

    console.log(this.files);
  }

  // Validations
  private _fileCanBeUploaded( file: File ): boolean {
    if (!this._fileWasDropped(file.name) && this._isImage(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  private _preventStop( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileWasDropped ( fileName: string ): boolean {
    for (const file of this.files) {
      if (file.filename === fileName) {
        console.log('File ' + fileName + ' exists');
        return true;
      }

    }
    return false;
    
  }

  private _isImage ( fileType: string ): boolean {
    return (fileType === '' || fileType === undefined) ? false : fileType.startsWith('image');
  }

}

