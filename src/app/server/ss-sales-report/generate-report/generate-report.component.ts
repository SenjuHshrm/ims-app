import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {

  public pdfFile: string

  constructor(
    public mdRef: MatDialogRef<GenerateReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.pdfFile = 'data:application/pdf;base64,' + this.data.res
  }

  close() {
    this.mdRef.close()
  }

}
