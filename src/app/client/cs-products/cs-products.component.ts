import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { ItemsService } from '../../services/items.service';
import { ViewProdComponent } from '../../client/cs-products/view-prod/view-prod.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-cs-products',
  templateUrl: './cs-products.component.html',
  styleUrls: ['./cs-products.component.scss']
})
export class CsProductsComponent implements OnInit {

  public searchParam: any;
  public prod: any = [];
  public bikes: any = [];
  public accessories: any = [];
  public wheels: any = [];
  public components: any = [];
  public workshop: any = [];
  public searchRes: any;
  public prgLoading: boolean = true

  @ViewChild(MatPaginator) bikesPage: MatPaginator

  bikesOpt: string;
  accsOpt: string;
  wheelOpt: string;
  comptsOpt: string;
  workspOpt: string;

  constructor(
    private srchItem: ItemsService,
    private sBar: MatSnackBar,
    private md: MatDialog
  ) { }

  ngOnInit() {
    this.srchItem.getAllProd().subscribe(res => {
      this.prgLoading = false
      this.prod = res
      console.log(this.prod)
      _.forEach(this.prod, arr => {
        switch(arr.product) {
          case 'Bikes':
            this.bikes.push(arr)
            // this.bikes.paginator = this.bikesPage
            break;
          case 'Accessories':
            this.accessories.push(arr)
            break;
          case 'Wheels':
            this.wheels.push(arr)
            break;
          case 'Components':
            this.components.push(arr)
            break;
          case 'Workshop':
            this.workshop.push(arr)
            break;
        }
      })
    })
    this.searchParam = {
      prod: '',
      cat: ''
    }
  }

  viewProd(obj: any) {
    this.md.open(ViewProdComponent, {
      data: obj,
      disableClose: true,
      panelClass: 'mat-dialog-container-custom'
    })
  }

  sortBike(val: any) {
    console.log(val)
    switch(val) {
      case 'Name':
        this.bikes.sort((a, b) => {
          let txtA = a.name.toUpperCase();
          let txtB = b.name.toUpperCase();
          return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
        })
        break;
      case 'Price':
        this.bikes.sort((a, b) => {
          let txtA = parseFloat(a.price.replace(/,/g,''));
          let txtB = parseFloat(b.price.replace(/,/g,''));
          return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
        })
        break;
    }
  }
  sortAccs(val: any) {
    console.log(val)
    switch(val) {
      case 'Name':
        this.accessories.sort((a, b) => {
          let txtA = a.name.toUpperCase();
          let txtB = b.name.toUpperCase();
          return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
        })
        break;
      case 'Price':
        this.accessories.sort((a, b) => {
          let txtA = parseFloat(a.price.replace(/,/g,''));
          let txtB = parseFloat(b.price.replace(/,/g,''));
          return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
        })
        break;
    }
  }
  sortWhls(val: any) {
    console.log(val)
    switch(val) {
      case 'Name':
        this.wheels.sort((a, b) => {
          let txtA = a.name.toUpperCase();
          let txtB = b.name.toUpperCase();
          return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
        })
        break;
      case 'Price':
        this.wheels.sort((a, b) => {
          let txtA = parseFloat(a.price.replace(/,/g,''));
          let txtB = parseFloat(b.price.replace(/,/g,''));
          return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
        })
        break;
    }
  }
  sortCompts(val: any) {
    console.log(val)
    switch(val) {
      case 'Name':
        this.components.sort((a, b) => {
          let txtA = a.name.toUpperCase();
          let txtB = b.name.toUpperCase();
          return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
        })
        break;
      case 'Price':
        this.components.sort((a, b) => {
          let txtA = parseFloat(a.price.replace(/,/g,''));
          let txtB = parseFloat(b.price.replace(/,/g,''));
          return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
        })
        break;
    }
  }
  sortWorksp(val: any) {
    console.log(val)
    switch(val) {
      case 'Name':
        this.workshop.sort((a, b) => {
          let txtA = a.name.toUpperCase();
          let txtB = b.name.toUpperCase();
          return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
        })
        break;
      case 'Price':
        this.workshop.sort((a, b) => {
          let txtA = parseFloat(a.price.replace(/,/g,''));
          let txtB = parseFloat(b.price.replace(/,/g,''));
          return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0;
        })
        break;
    }
  }

}
