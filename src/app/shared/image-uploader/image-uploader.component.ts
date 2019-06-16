import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {
  @Output() public uploaded = new EventEmitter();
  constructor(private imageService: ImageService) { }
   
  public async fileChangeEvent(e) {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const result = await this.imageService.saveImage(formData);
    this.uploaded.emit(result);
  }

}
