import { Component } from '@angular/core';
import { Directory } from '@capacitor/filesystem';
import { Share, ShareResult } from '@capacitor/share';
import { AlertController } from '@ionic/angular';
import { DownloadService } from '../download.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  downloading: boolean;
  // Small PDF
  smallFile = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

  // Large PDF (~25mb)
  largeFile = 'https://research.nhm.org/pdfs/10840/10840.pdf';

  constructor(private downloadService: DownloadService, private alertController: AlertController) { }

  // async download() {
  //   let path;
  //   try {
  //     this.downloading = true;
  //     path = await this.downloadService.download(this.largeFile);
  //     const result = await Share.share(
  //       {
  //         title: 'Share PDF',
  //         text: 'Share the PDF',
  //         url: `file://${path}`
  //       }
  //     );
  //     this.show(JSON.stringify(result));
  //   } catch (err) {
  //     const msg = `${err}. url is ${path}.`;
  //     console.error(msg);
  //     this.show(msg);
  //   } finally {
  //     this.downloading = false;
  //   }
  // }

  async share(url: string, dir: string, multiple: boolean = false) {
    let path: string;
    let data: Blob;
    try {
      this.downloading = true;
      data = await this.downloadService.get(url);
      console.log('Downloaded file');
    } catch (err) {
      const msg = `Download Error: ${err}.`;
      console.error(msg);
      this.show(msg);
      this.downloading = false;
      return;
    }
    try {
      let directory: Directory = Directory.Cache;
      switch (dir) {
        case 'DATA': directory = Directory.Data; break;
        case 'DOCUMENTS': directory = Directory.Documents; break;
      }
      //const value = await this.downloadService.asBase64(data);
      const value = await data.text();
      path = await this.downloadService.write(value, directory);
    } catch (err) {
      const msg = `Write Error: ${err}.`;
      console.error(msg);
      this.show(msg);
      this.downloading = false;
      return;
    }
    try {
      let result: ShareResult;
      if (!multiple) {
        result = await Share.share(
          {
            title: 'Share PDF',
            text: 'Share the PDF',
            url: path
          }
        );
      }

      if (multiple) {
        result = await Share.share(
          {
            title: 'Share PDFs',
            text: 'Share the PDFs',
            files: [path, path, path]
          }
        );
      }
      this.show(JSON.stringify(result));
    } catch (err) {
      const msg = `Share Error: ${err}.`;
      console.error(msg);
      this.show(msg);
    } finally {
      this.downloading = false;
    }
  }

  async download(url: string) {
    try {
      this.downloading = true;
      const data = await this.downloadService.get(url);
      console.log('Downloaded file');
    } catch (err) {
      const msg = `${err}.`;
      console.error(msg);
      this.show(msg);
    } finally {
      this.downloading = false;
    }
  }

  async show(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
