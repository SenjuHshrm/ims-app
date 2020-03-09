import { Component, OnInit } from '@angular/core';
import { ViewGlimageComponent } from '../../client/cs-gallery/view-glimage/view-glimage.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-gallery',
  templateUrl: './cs-gallery.component.html',
  styleUrls: ['./cs-gallery.component.scss']
})
export class CsGalleryComponent implements OnInit {

  public gallImg: any = [
    { image: '../../assets/gallery/1.jpg' },
    { image: '../../assets/gallery/2.jpg' },
    { image: '../../assets/gallery/3.jpg' },
    { image: '../../assets/gallery/4.jpg' },
    { image: '../../assets/gallery/5.jpg' },
    { image: '../../assets/gallery/6.jpg' },
    { image: '../../assets/gallery/7.jpg' },
  ]

  constructor(
    private mDialog: MatDialog
  ) { }

  ngOnInit() {
  }

  viewImg(img: string) {
    this.mDialog.open(ViewGlimageComponent, {
      data: img,
      panelClass: 'mat-dialog-container-custom'
    })
  }

}
