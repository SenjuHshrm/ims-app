import { Component, OnInit } from '@angular/core';
import { SelectOpts } from '../../interfaces/select-opts';
import { GenerateReportService } from '../../services/generate-report.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GenerateReportComponent } from '../../server/ss-sales-report/generate-report/generate-report.component';

@Component({
  selector: 'app-ss-sales-report',
  templateUrl: './ss-sales-report.component.html',
  styleUrls: ['./ss-sales-report.component.scss']
})
export class SsSalesReportComponent implements OnInit {

  public salesOpts: SelectOpts[] = [
    { value: 'in', viewVal: 'Inbound' },
    { value: 'out', viewVal: 'Outbound' },
  ]
  public inf: any;

  constructor(
    private sBar: MatSnackBar,
    private gRep: GenerateReportService,
    private md: MatDialog
  ) { }

  ngOnInit() {
    this.inf = {
      type: '',
      dateFrom: new Date(),
      dateTo: new Date()
    }
  }

  genReport(obj: any) {
    if(obj.type == '' ||
        obj.dateFrom == '' ||
        obj.dateTo == '') {
      this.sBar.open('Please complete details', 'OK', { duration: 2000 })
    } else {
      this.gRep.generate(obj).subscribe(res => {
        this.md.open(GenerateReportComponent, {
          disableClose: true,
          data: res,
          width: '70%',
          height: '90%'
        })
      })
    }
  }

}
