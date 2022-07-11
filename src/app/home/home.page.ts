import { Component } from '@angular/core';
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

  constructor(private downloadService: DownloadService, private alertController: AlertController) { }

  async download() {
    let path;
    try {
      this.downloading = true;
      path = await this.downloadService.download('https://research.nhm.org/pdfs/10840/10840.pdf');
      const result = await Share.share(
        {
          title: 'Share PDF',
          text: 'Share the PDF',
          url: `file://${path}`
        }
      );
      this.show(JSON.stringify(result));
    } catch (err) {
      const msg = `${err}. url is ${path}.`;
      console.error(msg);
      this.show(msg);
    } finally {
      this.downloading = false;
    }
  }

  async get() {
    try {
      this.downloading = true;
      // Small file
      const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
      // Large file
      //const url = 'https://research.nhm.org/pdfs/10840/10840.pdf';
      const data = await this.downloadService.get(url);
      const path = await this.downloadService.write(data);
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

  async show(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
