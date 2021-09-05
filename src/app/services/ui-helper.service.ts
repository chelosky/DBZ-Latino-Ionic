import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiHelperService {

  loading: any;

  constructor(public loadingController: LoadingController) {}

  async presentLoading(text: string = 'Please wait...', ms: number = 0) {
    this.loading = await this.loadingController.create({
      message: text,
      duration: ms
    });
    await this.loading.present();
  }

  async updateLoading(text: string){
    if(this.loading) this.loading.message = text;
  }

  async closeLoading(){
    await this.loading.dismiss();
    console.log('Loading dismissed!');
  }
}
