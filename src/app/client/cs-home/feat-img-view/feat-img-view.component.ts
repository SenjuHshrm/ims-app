import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-feat-img-view',
  templateUrl: './feat-img-view.component.html',
  styleUrls: ['./feat-img-view.component.scss']
})
export class FeatImgViewComponent implements OnInit {

  public imgSrc: string;

  constructor(
    public mdRef: MatDialogRef<FeatImgViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.imgSrc = 'data:image/png;jpg;jpeg;base64, ' + this.data.img
  }

}
