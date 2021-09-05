import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertHelperService {

  constructor(public alertController: AlertController) { }

  /**
   * 
   * const response =await this.alertHelper.presentAlertConfirm(
   *   'Confirm Alert',
   *   `Are you sure do you want to delete the gallery <strong>${galleryEntry.name}</strong>?`
   * );
   * if(response){
   *   do stuff
   * }
   * 
   * 
   * @param title 
   * @param content 
   * @returns 
   */
  async presentAlertConfirm(title: string, content: string) {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: title,
        message: content,
        backdropDismiss: false,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false);
            }
          }, {
            text: 'Yes',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      await alert.present();
    });
  }

}
