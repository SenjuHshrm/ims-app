import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
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
  public prod: any;
  public bikes: any = [];
  public accessories: any = [];
  public wheels: any = [];
  public components: any = [];
  public workshop: any = [];
  public searchRes: any;

  constructor(
    private srchItem: ItemsService,
    private sBar: MatSnackBar,
    private md: MatDialog
  ) { }

  ngOnInit() {
    this.srchItem.getAllProd().subscribe(res => {
      this.prod = res
      console.log(this.prod)
      _.forEach(this.prod, arr => {
        switch(arr.product) {
          case 'Bikes':
            this.bikes.push(arr)
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
      width: '60%',
      height: '90%'
    })
  }

}
