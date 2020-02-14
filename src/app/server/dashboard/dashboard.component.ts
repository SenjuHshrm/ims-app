import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectOpts } from '../../interfaces/select-opts';
import { GenerateReportService } from '../../services/generate-report.service';DefValService
import { DefValService } from '../../services/def-val.service';
import { Chart } from 'chart.js';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public products: SelectOpts[] = [
    { value: 'Bikes', viewVal: 'Bikes' },
    { value: 'Accessories', viewVal: 'Accessories' },
    { value: 'Wheels', viewVal: 'Wheels' },
    { value: 'Components', viewVal: 'Components' },
    { value: 'Workshop', viewVal: 'Workshop' }
  ]
  @ViewChild('inbChart') inbChart: ElementRef;
  @ViewChild('outbChart') outbChart: ElementRef;
  public vals: any;
  public logs: any;
  public iprod: string;
  public oprod: string;
  public recChart: any;
  public soldChart: any;

  constructor(
    private defVals: DefValService,
    private log: GenerateReportService
  ) { }

  ngOnInit() {
    this.iprod = 'Bikes';
    this.oprod = 'Bikes';
    this.defVals.getVal().subscribe(res => {
      this.vals = res.res
      this.log.getLogs().subscribe(res => {
        this.logs = res;
        this.initInbound()
        this.initOutbound()
      })
    })
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
        if(arr.type == 'in' && arr.prod == this.oprod && arr.cat == labelsLs[i]) {
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
    this.recChart.render()
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
          if(arr.type == 'in' && arr.prod == this.oprod && arr.cat == labelsLs[i]) {
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
