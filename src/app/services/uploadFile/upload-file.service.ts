import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UploadFileService {

  constructor(private _http: HttpClient) { }

  uploadFile(file: File, type: string, id: string) {
    // Vanilla Javascript
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('image', file, file.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('image upload failed');
            reject(xhr.response);
          }
        }
      };
      const url = BASE_URL + '/upload/' + type + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });

    // The Angular way
    /*const formData = new FormData();
    formData.append('image', file, file.name);
    const url = BASE_URL + '/upload/' + type + '/' + id;
    return this._http.put(url, formData, { reportProgress: true });*/
  }
}
