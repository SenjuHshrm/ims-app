import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DefValService } from '../../services/def-val.service';
import { ItemsService } from '../../services/items.service';
import { SelectOpts } from '../../interfaces/select-opts';
import { ViewProdComponent } from '../../client/cs-products/view-prod/view-prod.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-cs-products',
  templateUrl: './cs-products.component.html',
  styleUrls: ['./cs-products.component.scss']
})
export class CsProductsComponent implements OnInit {

  public searchParam: any;
  public products: SelectOpts[] = [
    { value: 'Bikes', viewVal: 'Bikes' },
    { value: 'Accessories', viewVal: 'Accessories' },
    { value: 'Wheels', viewVal: 'Wheels' },
    { value: 'Components', viewVal: 'Components' },
    { value: 'Workshop', viewVal: 'Workshop' }
  ]
  public defVals: any;
  public subCat: SelectOpts[] = [];
  public searchRes: any;
  constructor(
    private srchItem: ItemsService,
    private sBar: MatSnackBar,
    private dfVl: DefValService,
    private md: MatDialog
  ) { }

  ngOnInit() {
    this.dfVl.getVal().subscribe(res => {
      this.defVals = res.res
    })
    this.searchParam = {
      prod: '',
      cat: ''
    }
  }

  changeSubCatVal(obj: any) {
    let subC: any;
    this.subCat = []
    Object.keys(this.defVals).forEach(key => {
      if(key == obj.prod) {
        subC = this.defVals[key]
      }
    })
    _.forEach(subC, arr => {
      this.subCat.push({
        value: arr,
        viewVal: arr
      })
    })
  }

  search(evt: MouseEvent, obj: any) {
    evt.defaultPrevented
    if(obj.prod == '' || obj.cat == '') {
      this.sBar.open('Please complete search parameters', 'OK', { duration: 2000 })
    } else {
      let route = '/api/search-item/' + obj.prod + '/' + obj.cat.replace(/\//ig, '-')
      this.srchItem.search(route).subscribe(res => {
        this.searchRes = res.res
        if(this.searchRes.length == 0) {
          this.sBar.open('No products yet', 'OK' , { duration: 2000 })
        }
      })
    }
  }

  viewProd(id: string) {
    let obj = _.find(this.searchRes, { _id: id });
    console.log(obj)
    this.md.open(ViewProdComponent, {
      data: obj,
      width: '60%',
      height: '90%'
    })
  }

}
