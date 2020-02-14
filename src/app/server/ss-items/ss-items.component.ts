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
  public itemsTable = new MatTableDataSource(itemLs)
  public itemsList: any;
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
  public tableHeader: string[] = ['name', 'img', 'color', 'description' ,'price' ,'itemCount', 'availability', 'action']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dfVl: DefValService,
    private itm: ItemsService,
    private mDlg: MatDialog,
    private sBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.dfVl.getVal().subscribe(res => {
      this.defVals = res.res
    })
    this.searchParam = {
      prod: '',
      cat: ''
    }
    itemLs = []
    this.itemsTable = new MatTableDataSource(itemLs)
    this.itemsTable.paginator = this.paginator
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
    let route = '/api/search-item/' + obj.prod + '/' + obj.cat.replace(/\//ig,'-');
    this.itm.search(route).subscribe(res => {
      this.itemsList = res.res
      if(res.res.length > 0) {
        itemLs = []
        _.forEach(res.res, arr => {
          itemLs.push({
            id: arr._id,
            name: arr.name,
            img: 'data:image/png;jpg;jpeg;base64, ' + arr.img,
            color: arr.color,
            description: arr.desc.join('<br>'),
            price: '₱ ' + arr.price,
            itemCount: arr.itemCount,
            availability: arr.isAvailable
          })
          this.itemsTable = new MatTableDataSource(itemLs)
          this.itemsTable.paginator = this.paginator
        })
      } else {
        this.sBar.open('No products found', 'OK', {
          duration: 2000
        })
      }
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
        this.searchParam.prod = res.prod;
        this.changeSubCatVal(this.searchParam)
        this.searchParam.cat = res.cat;
        this.search(me, this.searchParam)
      }
    })
  }

  changeAvailability(row: any) {
    let obj: any = _.find(this.itemsList, { name: row.name })
    obj.isAvailable = row.availability
    if(row.itemCount == 0) {
      row.availability = false
      this.sBar.open('Unable to check when item amount is zero (0)', 'OK', {
        duration: 2000
      })
    } else {
      this.itm.updateAvail(obj).subscribe(res => {
        let msg = ''
        if(res.res) {
          if(row.availability) {
            msg = 'Availability set to true'
          } else {
            msg = 'Availability set to false'
          }
        } else {
          msg = 'An error occured'
        }
        this.sBar.open(msg, 'OK', {
          duration: 2000
        })
      })
    }
  }

  updateItem(row: any) {
    let obj = _.find(this.itemsList, { name: row.name })
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
        this.searchParam.prod = res.prod;
        this.changeSubCatVal(this.searchParam)
        this.searchParam.cat = res.cat;
        this.search(me, this.searchParam)
      }
    })
  }

}
