import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  dataDirectory: string = this.file.externalDataDirectory;

  constructor(
    private dataService: DataService,
    private file: File
  ) { }

  downloadFile(url: string,  parentFolder: string, fileName: string): Promise<any>{
    return new Promise(async (resolve, reject) => {
      try {
        this.verifyAndCreateDirectory(parentFolder);
        const fullPath = this.generateFullStoragePath(parentFolder, fileName);
        const download: any = await this.dataService.downloadFile(url, fullPath);
        resolve(download)
      } catch (error) {
        reject(error);
      }
    })
  }

  verifyFileInStorage(parentFolder: string, fileName: string): Promise<boolean>{
    return new Promise(async (resolve) => {
      try {
        const validParentPath = this.generateFullStoragePath(parentFolder);
        const response = await this.file.checkFile(validParentPath, this.validFileName(fileName));
        resolve(response)
      } catch (error) {
        resolve(false);    
      }
    })
  }

  getFilePathDataStorage(parentFolder: string, fileName: string): string{
    return this.generateFullStoragePath(parentFolder, fileName);
  }

  async deleteFilePathDataStorage(parentFolder: string, fileName: string): Promise<boolean>{
    return new Promise(async (resolve) => {
      try {
        const response = await this.file.removeFile(this.generateFullStoragePath(parentFolder), fileName);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }


  private generateFullStoragePath(parentFolder: string, fileName?: string){
    let fullPath = `${this.dataDirectory}${parentFolder}/`
    if(fileName){
      fullPath =  `${fullPath}${this.validFileName(fileName)}`;
    }
    return fullPath;
  }

  private validFileName(fileName: string){
    return fileName.replace(/[-+()\s]/g, '');
  }

  private async verifyAndCreateDirectory(name: string){
    try{
      await this.file.checkDir(this.dataDirectory, name);
      console.log(`Directory ${name} already exists`);
    }catch(error){
      await this.file.createDir(this.dataDirectory, name, true);
      console.log(`Directory ${name} was created`);
    }
  }
}
