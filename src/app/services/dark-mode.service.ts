import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { DARK_MODE_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  dark_mode_status: boolean = false;

  constructor(
    private storageService: StorageService
  ) { }

  async getStorageDarkMode(){
    return await this.storageService.get(DARK_MODE_KEY);
  }
  
  async setStorageDarkMode(){
    this.dark_mode_status = true;
    return await this.storageService.set(DARK_MODE_KEY, true);
  }

  async removeDarkMode(){
    this.dark_mode_status = false;
    return await this.storageService.remove(DARK_MODE_KEY);
  }
}
