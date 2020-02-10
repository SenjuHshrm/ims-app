import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-prod',
  templateUrl: './view-prod.component.html',
  styleUrls: ['./view-prod.component.scss']
})
export class ViewProdComponent implements OnInit {

  public info: any;

  constructor(
    public mdRef: MatDialogRef<ViewProdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.info = {
      name: this.data.name,
      img: 'data:image/png;jpg;jpeg;base64, ' + this.data.img,
      isAvailable: this.data.isAvailable,
      color: this.data.color,
      price: ' ' + this.data.price,
      desc: this.data.desc
    }
  }

}
