import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { DefValService } from '../../services/def-val.service';
import { AddItemComponent } from '../../server/ss-items/add-item/add-item.component';
import { SearchProductsService } from '../../services/search-products.service';
import { SelectOpts } from '../../interfaces/select-opts';
import { ItemsLs } from '../../interfaces/items-ls';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';


var itemLs: ItemsLs[] = []

@Component({
  selector: 'app-ss-items',
  templateUrl: './ss-items.component.html',
  styleUrls: ['./ss-items.component.scss']
})
export class SsItemsComponent implements OnInit {
  public itemsTable = new MatTableDataSource(itemLs)
  public searchParam: any;
  public defVals: any;
  public products: SelectOpts[] = [
    { value: 'Bikes', viewVal: 'Bikes' },
    { value: 'Accessories', viewVal: 'Accessories' },
    { value: 'Wheels', viewVal: 'Wheels' },
    { value: 'Components', viewVal: 'Components' },
    { value: 'Workshop', viewVal: 'Workshop' }
  ]
  public subCat: SelectOpts[] = [];
  public tableHeader: string[] = ['name', 'img', 'color', 'description' ,'price' ,'itemCount']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dfVl: DefValService,
    private srchPrd: SearchProductsService,
    private mDlg: MatDialog,

  ) { }

  ngOnInit() {
    this.itemsTable.paginator = this.paginator
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
    let route = '/api/search-item/' + obj.prod + '/' + obj.cat;
    this.srchPrd.search(route).subscribe(res => {
      if(res.res.length > 0) {
        itemLs = []
        _.forEach(res.res, arr => {
          itemLs.push({
            name: arr.name,
            img: 'data:image/png;jpg;jpeg;base64, ' + arr.img,
            color: arr.color,
            description: arr.desc.join('<br>'),
            price: this.numComma(arr.price),
            itemCount: arr.itemCount
          })
          this.itemsTable = new MatTableDataSource(itemLs)
        })
      } else {
        console.log('empty')
      }
    })
  }

  mdAddItem() {
    const md = this.mDlg.open(AddItemComponent, {
      disableClose: true,
      data: {
        selOpt: this.defVals,
        prod: this.products
      },
      width: '70%',
      height: '90%'})
    md.afterClosed().subscribe(res => {
      if(res != undefined) {
        let me = new MouseEvent('click')
        this.searchParam.prod = res.prod;
        this.changeSubCatVal(this.searchParam)
        this.searchParam.cat = res.cat;
        this.search(me, this.searchParam)
      }
    })
  }

  numComma(n: string): string {
    let parts = n.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.')
  }

}
