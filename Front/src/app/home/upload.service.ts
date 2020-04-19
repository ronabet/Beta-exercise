import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';  
import { config } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  public upload(formData) {
    return this.httpClient.post<any>(config.UPLOAD_URL, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }

  public insertDB(){
    return this.httpClient.get(config.INSERT_URL);
  }

}
