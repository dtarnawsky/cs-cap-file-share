import { Component } from '@angular/core';
import { Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
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

  async share(url: string, toCache: boolean) {
    try {
      this.downloading = true;
      const data = await this.downloadService.get(url);
      console.log('Downloaded file');

      // Cache is sharable, Data causes an application crash
      const directory = toCache? Directory.Cache : Directory.Data;

      const path = await this.downloadService.write(data, directory);
      const result = await Share.share(
        {
          title: 'Share PDF',
          text: 'Share the PDF',
          url: path
        }
      );
      this.show(JSON.stringify(result));
    } catch (err) {
      const msg = `${err}.`;
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
