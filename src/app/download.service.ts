import { Injectable } from '@angular/core';
import { Http, HttpDownloadFileResult, HttpResponse } from '@capacitor-community/http';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';


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

  public async get(url: string): Promise<any> {
    const options = {
      url
    };
    const result: HttpResponse = await Http.get(options);
    return result.data;
  }

  public async write(data: any): Promise<string> {
    const result = await Filesystem.writeFile({
      path: 'mypdf.pdf',
      data,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    return result.uri;
  }
}
