import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefValService } from '../../services/def-val.service';
import { ItemComponent } from '../../server/ss-items/item/item.component';
import { ItemsService } from '../../services/items.service';
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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public itemsTable = new MatTableDataSource(itemLs)
  public itemsList: any = [];
  public searchParam: any;
  public defVals: any;
  public subCat: SelectOpts[] = [];
  public tableHeader: string[] = ['name', 'img', 'color', 'price', 'itemCount', 'availability', 'feature', 'action']
  public products: SelectOpts[] = [
    { value: 'Bikes', viewVal: 'Bikes' },
    { value: 'Accessories', viewVal: 'Accessories' },
    { value: 'Wheels', viewVal: 'Wheels' },
    { value: 'Components', viewVal: 'Components' },
    { value: 'Workshop', viewVal: 'Workshop' }
  ]

  constructor(
    private dfVl: DefValService,
    private itm: ItemsService,
    private mDlg: MatDialog,
    private sBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.searchParam = {
      prod: '',
      cat: ''
    }
    this.dfVl.getVal().subscribe(res => {
      this.defVals = res
      this.itm.getAllProd().subscribe(res => {
        itemLs = []
        this.itemsList = res;
        _.forEach(this.itemsList, (arr: any) => {
          itemLs.push({
            id: arr._id,
            name: arr.name,
            img: 'data:image/png;jpg;jpeg;base64, ' + arr.img,
            color: arr.color,
            price: '₱ ' + arr.price,
            itemCount: arr.itemCount,
            availability: arr.isAvailable,
            feature: arr.featureToSite
          })
        })
        this.itemsTable = new MatTableDataSource(itemLs)
        this.itemsTable.paginator = this.paginator
      })
    })
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

  search(obj: any, evt?: MouseEvent) {
    if(evt !== undefined){
      evt.defaultPrevented
    }
    this.itemsList = []
    itemLs = [];
    let param: any;
    if(obj.prod == '' && obj.cat == '') {
      param = { }
    } else if(obj.prod != '' && obj.cat == '') {
      param = { product: obj.prod }
    } else if(obj.prod != '' && obj.cat != '') {
      param = { product: obj.prod, category: obj.cat }
    }
    this.itm.search(param).subscribe(res => {
      this.itemsList = res
      if(this.itemsList.length > 0) {
        _.forEach(this.itemsList, arr => {
          itemLs.push({
            id: arr._id,
            name: arr.name,
            img: 'data:image/png;jpg;jpeg;base64, ' + arr.img,
            color: arr.color,
            price: '₱ ' + arr.price,
            itemCount: arr.itemCount,
            availability: arr.isAvailable,
            feature: arr.featureToSite
          })
        })
      } else {
        this.sBar.open('No items found', 'OK', { duration: 2000 })
      }
      this.itemsTable = new MatTableDataSource(itemLs)
      this.itemsTable.paginator = this.paginator
    })
  }

  mdAddItem() {
    const md = this.mDlg.open(ItemComponent, {
      disableClose: true,
      data: {
        selOpt: this.defVals,
        prod: this.products,
        act: 'add',
        inf: null
      },
      width: '70%',
      height: '90%'})
    md.afterClosed().subscribe(res => {
      if(res != undefined) {
        let me = new MouseEvent('click')
        this.search(me, this.searchParam)
      }
    })
  }

  updateItem(row: any) {
    console.log(this.itemsList)
    let obj = _.find(this.itemsList, { _id: row.id })
    const md = this.mDlg.open(ItemComponent, {
      disableClose: true,
      data: {
        selOpt: this.defVals,
        prod: this.products,
        act: 'update',
        inf: obj
      },
      width: '70%',
      height: '90%'})
    md.afterClosed().subscribe(res => {
      if(res != undefined) {
        let me = new MouseEvent('click')
        this.search(me, this.searchParam)
      }
    })
  }

  toggleFeature(evt: MouseEvent, row: any) {
    evt.defaultPrevented
    console.log(row)
    this.itm.updateFeature(row).subscribe(res => {
      if(res.res) {
        this.search(this.searchParam)
      } else {
        row.feature = false
        this.sBar.open('Featured items limit is four (4)', 'OK', { duration: 2000 })
      }
    })
  }

}
