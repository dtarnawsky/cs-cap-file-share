import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';



@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  public async get(url: string): Promise<Blob> {
    console.log(`getting ${url}`);
    const response = await fetch(url, { method: 'GET' });
    console.log(`got ${response.statusText}`);
    return await response.blob();
  }

  public async asBase64(blob: Blob): Promise<any> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const b64 = (reader.result as string).replace(/^data:.+;base64,/, '');
        resolve(b64);
      };
      reader.readAsDataURL(blob);
    });
  }


  public async write(data: any, directory: Directory): Promise<string> {
    const result = await Filesystem.writeFile({
      path: 'my-pdf.pdf',
      data,
      directory,
      encoding: Encoding.UTF8,
    });
    console.log(`Written to ${directory} ${result.uri}`);
    return result.uri;
  }

  public async read(directory: Directory): Promise<any> {
    const result = await Filesystem.readFile({
      path: 'my-pdf.pdf',
      directory,
    });
    return result.data;
  }
}
