import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

 public async get(url: string): Promise<any> {
    const options = {
      url
    };
    console.log(`getting ${url}`);
    const response = await fetch(url, { method: 'GET'});
    console.log(`got ${response.statusText}`);
    return response.blob();
  }

  public async write(data: any, directory: Directory): Promise<string> {
    const result = await Filesystem.writeFile({
      path: 'mypdf.pdf',
      data,
      directory,
      encoding: Encoding.UTF8,
    });
    console.log('written file');
    return result.uri;
  }
}
