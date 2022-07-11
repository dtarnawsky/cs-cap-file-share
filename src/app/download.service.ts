import { Injectable } from '@angular/core';
import { Http, HttpDownloadFileResult, HttpResponse } from '@capacitor-community/http';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  public async download(url: string): Promise<string> {
    const options = {
      url,
      filePath: 'document.pdf',
      fileDirectory: Directory.Data,
      method: 'GET',
    };
    const result: HttpDownloadFileResult = await Http.downloadFile(options);
    return result.path;
  }
}
