export class FileItem {

    public file: File;
    public filename: string;
    public url: string;
    public uploading: boolean;
    public progress: number;

    constructor( file: File ) {
        this.file = file;
        this.filename = file.name;

        this.uploading = false;
        this.progress = 0;
    }
    
}