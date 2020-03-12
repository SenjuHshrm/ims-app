import { Component, OnInit } from '@angular/core';
import { ViewGlimageComponent } from '../../client/cs-gallery/view-glimage/view-glimage.component';
import { MatDialog } from '@angular/material';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './cs-gallery.component.html',
  styleUrls: ['./cs-gallery.component.scss']
})
export class CsGalleryComponent implements OnInit {

  public gallImg: any = []

  constructor(
    private mDialog: MatDialog,
    private pht: PhotosService
  ) { }

  ngOnInit() {
    this.pht.getPhotoLs().subscribe(res => {
      this.gallImg = res
    })
  }

  viewImg(img: string) {
    this.mDialog.open(ViewGlimageComponent, {
      data: img,
      panelClass: 'mat-dialog-container-custom'
    })
  }

}
