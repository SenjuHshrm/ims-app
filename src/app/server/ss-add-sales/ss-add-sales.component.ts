import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { ItemsLs } from '../../interfaces/items-ls';
import { ItemsService } from '../../services/items.service';
import * as _ from 'lodash';
import * as jwtDecode from 'jwt-decode';

var itemLs: ItemsLs[] = [];

@Component({
  selector: 'app-ss-add-sales',
  templateUrl: './ss-add-sales.component.html',
  styleUrls: ['./ss-add-sales.component.scss']
})
export class SsAddSalesComponent implements OnInit {

  public itemInf: any;
  public name: string;
  public itemsLs = new MatTableDataSource(itemLs)
  public tableHeader: string[] = ['name', 'img', 'color','price' ,'itemCount']
  public selectedRow = [];
  public resp: string;
  public selId: string;

  constructor(
    private searchItem: ItemsService,
    private sBar: MatSnackBar
  ) { }

  ngOnInit() {
    itemLs = [];
    this.itemsLs = new MatTableDataSource(itemLs)
    this.name = '';
    this.itemInf = {
      currItem: '0',
      amount: 0,
      price: '0',
      totalPrice: '0',
      remainingItem: '0',
    }
  }

  tableRowSelected(row: any) {
    this.selectedRow = []
    this.selectedRow.push(row)
    this.selId = row.id;
    this.itemInf = {
      currItem: row.itemCount,
      amount: 0,
      price: row.price.replace(/[₱\s,]/g, ''),
      totalPrice: '0',
      remainingItem: '0',
    }
  }

  compute(obj: any) {
    obj.remainingItem = (+obj.currItem - obj.amount).toString()
    obj.totalPrice = ((obj.amount * +obj.price).toFixed(2)).toString()
  }

  search(evt: MouseEvent, obj: any) {
    evt.defaultPrevented
    if(this.name != '') {
      this.searchItem.searchByName(this.name).subscribe(res => {
        this.resp = res.res
        itemLs = []
        _.forEach(res.res, arr => {
          itemLs.push({
            id: arr._id,
            name: arr.name,
            img: 'data:image/png;jpg;jpeg;base64, ' + arr.img,
            color: arr.color,
            price: '₱ ' + arr.price,
            itemCount: arr.itemCount,
            availability: arr.isAvailable,
            feature:  arr.featureToSite
          })
        })
        this.itemsLs = new MatTableDataSource(itemLs)
      })
    }
  }

  add(obj: any) {
    if(+obj.remainingItem < 0) {
      this.sBar.open('Not possible to have a negative amount', 'OK', { duration: 2000 })
    } else {
      let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
      let data = {
        id: this.selId,
        amt: obj.amount,
        totalPrc: obj.totalPrice,
        remItem: +obj.remainingItem,
        encoder: token.username
      }
      this.searchItem.addSold(data).subscribe(res => {
        if(res.res) {
          this.sBar.open('Successfully added', 'OK', { duration: 2000 })
          this.clear()
        }
      })
    }
  }

  clear() {
    this.ngOnInit()
  }

}
