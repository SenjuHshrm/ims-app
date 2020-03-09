import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-glimage',
  templateUrl: './view-glimage.component.html',
  styleUrls: ['./view-glimage.component.scss']
})
export class ViewGlimageComponent implements OnInit {

  public imgSrc: string = '';

  constructor(
    public mdRef: MatDialogRef<ViewGlimageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.imgSrc = this.data
  }

}
