import { Pipe, PipeTransform } from '@angular/core';
import { BASE_URL } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, type: string = 'user'): any {
    let url = BASE_URL + '/images';
    if (!image) { // No image provided, get the default one
      return url + '/users/noimage';
    }
    if (image.indexOf('http') !== -1) { // Image comes as URL
      return image;
    }
    switch (type) {
      case 'user':
        url += '/users/' + image;
        break;
      case 'hospital':
        url += '/hospitals/' + image;
        break;
      case 'doctor':
        url += '/doctors/' + image;
        break;
      default:
        console.log('Image type ' + type + ' is unknown');
        url += '/users/noimage';
    }
    return url;
  }

}
