import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Injectable({
  providedIn: 'root'
})
export class AndroidPermissionService {

  constructor(
    private androidPermissions: AndroidPermissions
    ) { }

  verifyReadWritePermission(){
    return new Promise(async(resolve) => {
      try {
        const result = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
        if(!result.hasPermission){
          await this.androidPermissions.requestPermissions([
            this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
            this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
          ]);
        }
      } catch (error) {
        await this.androidPermissions.requestPermissions([
          this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        ]);
      }
      resolve(true);
    })
  }
}
