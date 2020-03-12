import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-img',
  templateUrl: './delete-img.component.html',
  styleUrls: ['./delete-img.component.scss']
})
export class DeleteImgComponent implements OnInit {

  public imgInf: any

  constructor(
    public mdRef: MatDialogRef<DeleteImgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit() {
    this.imgInf = this.data
  }

}
