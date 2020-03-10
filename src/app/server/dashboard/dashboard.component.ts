import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectOpts } from '../../interfaces/select-opts';
import { GenerateReportService } from '../../services/generate-report.service';
import { CurrencyFormatService } from '../../services/currency-format.service';
import { AuthService } from '../../services/auth.service';
import { DefValService } from '../../services/def-val.service';
import { ItemsService } from '../../services/items.service';
import { Chart } from 'chart.js';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public allProd: any = [];
  public monthIncome: any = [];
  public monthLoss: any = [];
  public products: SelectOpts[] = [
    { value: 'Bikes', viewVal: 'Bikes' },
    { value: 'Accessories', viewVal: 'Accessories' },
    { value: 'Wheels', viewVal: 'Wheels' },
    { value: 'Components', viewVal: 'Components' },
    { value: 'Workshop', viewVal: 'Workshop' }
  ]
  @ViewChild('inbChart') inbChart: ElementRef;
  @ViewChild('outbChart') outbChart: ElementRef;
  @ViewChild('income') income: ElementRef;
  @ViewChild('itemCount') itemCount: ElementRef;

  public vals: any;
  public logs: any;
  public iprod: string;
  public oprod: string;
  public recChart: any;
  public soldChart: any;
  public mnIncm: any;
  public itmCnt: any;
  public visitCount: string;
  public itemSold: string;
  public itemRecv: string;

  constructor(
    private defVals: DefValService,
    private log: GenerateReportService,
    private crrForm: CurrencyFormatService,
    private itm: ItemsService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.iprod = 'Bikes';
    this.oprod = 'Bikes';
    this.defVals.getVal().subscribe(res => {
      this.vals = res
      this.log.getLogs().subscribe(res => {
        this.logs = res;
        this.initInbound()
        this.initOutbound()
        this.getDailySales()
      })
    })
    this.log.getMonthlyIncome().subscribe(res => {
      this.monthIncome = res.respIncm
      this.monthLoss = res.respLoss
      this.initMonthIncome()
    })
    this.itm.getAllProd().subscribe(res => {
      this.allProd = res
      this.initItemCount()
    })
    this.auth.getVisitors().subscribe(res => {
      this.visitCount = res.length.toString()
    })

  }

  getDailySales() {
    let sdate = new Date(new Date(new Date()).setHours(0, 0, 0))
    let edate = new Date(new Date(new Date()).setHours(23, 59, 59))
    let sold = 0;
    let recv = 0;
    console.log(sdate)
    console.log(edate)
    let obj = _.filter(this.logs, (x) => {
      return new Date(x.createdAt) > sdate && new Date(x.createdAt) < edate
    })
    _.forEach(obj, arr => {
      switch(arr.type) {
        case 'out':
          sold += arr.sold
          break;
        case 'in':
          recv += arr.received
          break
      }
    })
    this.itemRecv = recv.toString()
    this.itemSold = sold.toString()
  }

  initItemCount() {
    let labelsLs: string[] = [],
        itemAmt: number[] = [],
        brdrColor: string[] = [],
        bgColor: string[] = [];
    Object.keys(this.vals).forEach(key => {
      if(key != '_id') {
        labelsLs.push(key)
      }
    })
    for(let i = 0; i < labelsLs.length; i++) {
      let cnt = 0
      let color = this.randomizeColor()
      _.forEach(this.allProd, arr => {
        if(arr.product == labelsLs[i]) {
          cnt += arr.itemCount
        }
      })
      itemAmt.push(cnt)
      brdrColor.push(color + 'FF')
      bgColor.push(color + '33')
    }
    this.itmCnt = new Chart(this.itemCount.nativeElement, {
      type: 'bar',
      data: {
        labels: labelsLs,
        datasets: [{
          data: itemAmt,
          backgroundColor: bgColor,
          borderColor: brdrColor,
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Items currently in store',
          position: 'bottom'
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
    this.itmCnt.render()
  }

  initInbound() {

    let labelsLs = [];
    let amt = [];
    let bgColor = []
    let brdrColor = []
    Object.keys(this.vals).forEach(key => {
      if(key == this.iprod) {
        labelsLs = this.vals[key]
      }
    })
    let startDate = moment(new Date(new Date().setHours(0,0,0))).format()
    let endDate = moment(new Date(new Date().setHours(23,59,59))).format()
    for(let i = 0; i < labelsLs.length; i++) {
      let recv = 0;
      _.forEach(this.logs, arr => {
        if(arr.type == 'in' && arr.prod == this.iprod && arr.cat == labelsLs[i]) {
          if(arr.createdAt >= startDate && arr.createdAt <= endDate) {
            recv = recv + arr.received
          }
        }
      })
      amt[i] = recv
      let color = this.randomizeColor();
      bgColor[i] = color + '33'
      brdrColor[i] = color + 'FF'
    }
    this.recChart = new Chart(this.inbChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labelsLs,
        datasets: [{
          data: amt,
          backgroundColor: bgColor,
          borderColor: brdrColor,
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Received Items (' + moment().format('MMMM DD, YYYY') + ')',
          position: 'bottom'
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
    this.recChart.render()
  }

  initOutbound() {
    let labelsLs = [];
    let amt = [];
    let bgColor = []
    let brdrColor = []
    Object.keys(this.vals).forEach(key => {
      if(key == this.oprod) {
        labelsLs = this.vals[key]
      }
    })
    let startDate = moment(new Date(new Date().setHours(0,0,0))).format()
    let endDate = moment(new Date(new Date().setHours(23,59,59))).format()
    for(let i = 0; i < labelsLs.length; i++) {
      let recv = 0;
      _.forEach(this.logs, arr => {
        if(arr.type == 'out' && arr.prod == this.oprod && arr.cat == labelsLs[i]) {
          if(arr.createdAt >= startDate && arr.createdAt <= endDate) {
            recv = recv + arr.sold
          }
        }
      })
      amt[i] = recv
      let color = this.randomizeColor();
      bgColor[i] = color + '33'
      brdrColor[i] = color + 'FF'
    }
    this.soldChart = new Chart(this.outbChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labelsLs,
        datasets: [{
          data: amt,
          backgroundColor: bgColor,
          borderColor: brdrColor,
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Sold Items (' + moment().format('MMMM DD, YYYY') + ')',
          position: 'bottom'
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
    this.soldChart.render()
  }

  changeInbound() {
    if(this.recChart) {
      this.recChart.data.labels = []
      this.recChart.data.datasets.forEach(res => {
        res.data = []
        res.backgroundColor = []
        res.borderColor = []
      })
      // this.recChart.update()
      let labelsLs = [];
      let amt = [];
      let bgColor = []
      let brdrColor = []
      Object.keys(this.vals).forEach(key => {
        if(key == this.iprod) {
          labelsLs = this.vals[key]
        }
      })
      let startDate = moment(new Date(new Date().setHours(0,0,0))).format()
      let endDate = moment(new Date(new Date().setHours(23,59,59))).format()
      for(let i = 0; i < labelsLs.length; i++) {
        let recv = 0;
        _.forEach(this.logs, arr => {
          if(arr.type == 'in' && arr.prod == this.iprod && arr.cat == labelsLs[i]) {
            if(arr.createdAt >= startDate && arr.createdAt <= endDate) {
              recv = recv + arr.received
            }
          }
        })
        amt[i] = recv
        let color = this.randomizeColor();
        bgColor[i] = color + '33'
        brdrColor[i] = color + 'FF'
      }
      this.recChart.data.labels = labelsLs
      this.recChart.data.datasets.forEach(res => {
        res.data = amt
        res.backgroundColor = bgColor
        res.borderColor = brdrColor
      })
      this.recChart.update()
    }
  }

  initMonthIncome() {
    //#388e3c
    let labelsLs: string[] = []
    let amtGain = [], bgColorG = [], brdrG = [], amtLoss = []
    Object.keys(this.monthIncome).forEach(key => {
      labelsLs.push(key)
      amtGain.push(this.monthIncome[key])
      amtLoss.push(this.monthLoss[key])
      // bgColor.push('#388E3C33')
      // brdr.push('#388E3CFF')
    })
    this.mnIncm = new Chart(this.income.nativeElement, {
      type: 'line',
      data: {
        labels: labelsLs,
        datasets: [{
          label: 'Gain',
          backgroundColor: '#FFFFFF00',
          data: amtGain,
          borderColor: '#388E3CFF',
          borderWidth: 1,
          lineTension: 0
        }, {
          label: 'Loss',
          backgroundColor: '#FFFFFF00',
          data: amtLoss,
          borderColor: '#F44336FF',
          borderWidth: 1,
          lineTension: 0
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Annual Income',
          position: 'bottom'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              let lbl = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              return '₱ ' + (this.crrForm.numComma((lbl).toFixed(2))).toString()
            }
          }
        }
      }
    })
  }

  changeOutbound() {
    if(this.soldChart) {
      this.soldChart.data.labels = []
      this.soldChart.data.datasets.forEach(res => {
        res.data = []
        res.backgroundColor = []
        res.borderColor = []
      })
      // this.recChart.update()
      let labelsLs = [];
      let amt = [];
      let bgColor = []
      let brdrColor = []
      Object.keys(this.vals).forEach(key => {
        if(key == this.oprod) {
          labelsLs = this.vals[key]
        }
      })
      let startDate = moment(new Date(new Date().setHours(0,0,0))).format()
      let endDate = moment(new Date(new Date().setHours(23,59,59))).format()
      for(let i = 0; i < labelsLs.length; i++) {
        let recv = 0;
        _.forEach(this.logs, arr => {
          if(arr.type == 'out' && arr.prod == this.oprod && arr.cat == labelsLs[i]) {
            if(arr.createdAt >= startDate && arr.createdAt <= endDate) {
              recv = recv + arr.sold
            }
          }
        })
        amt[i] = recv
        let color = this.randomizeColor();
        bgColor[i] = color + '33'
        brdrColor[i] = color + 'FF'
      }
      this.soldChart.data.labels = labelsLs
      this.soldChart.data.datasets.forEach(res => {
        res.data = amt
        res.backgroundColor = bgColor
        res.borderColor = brdrColor
      })
      this.soldChart.update()
    }
  }



  randomizeColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


}
