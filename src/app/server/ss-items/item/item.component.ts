import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectOpts } from '../../../interfaces/select-opts';
import { ItemsService } from '../../../services/items.service';
import { CurrencyFormatService } from '../../../services/currency-format.service';
import * as _ from 'lodash';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public title: string;
  public itemInf: any;
  public itemParam: any;
  public btnLabel: any;
  public btnIc: any;
  public imgSrc: any = '/assets/sel_img.png';
  public isImgChosen: boolean = false;
  public products: SelectOpts[] = [];
  public subCat: SelectOpts[] = [];
  public desc: string[];
  public nLCount: number = 0;

  constructor(
    public mdRef: MatDialogRef<ItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itmSvc: ItemsService,
    private cFrmt: CurrencyFormatService
  ) { }

  checkType(): boolean {
    return (this.data.act == 'add') ? false : true
  }

  ngOnInit() {
    let token: any = jwtDecode(localStorage.getItem('gpAdmin'))
    console.log(this.data)
    _.forEach(this.data.prod, arr => {
      this.products.push({
        value: arr.value,
        viewVal: arr.viewVal
      })
    })

    if(this.data.act == 'add') {
      this.title = 'Add Item'
      this.itemInf = {
        date: moment(new Date()).format(),
        encoder: token.username,
        prod: '',
        cat: '',
        name: '',
        color: '',
        price: '',
        desc: '',
        img: '',
        itemCount: 0,
        format: ''
      }
      this.btnLabel = 'Add'
      this.btnIc = 'add'
    } else if(this.data.act == 'update'){
      this.title = 'Update Item'
      this.itemInf = {
        date: moment(new Date()).format(),
        encoder: token.username,
        prod: this.data.inf.product,
        cat: this.data.inf.category,
        name: this.data.inf.name,
        color: this.data.inf.color,
        price: this.data.inf.price,
        desc: this.data.inf.desc.join('\n'),
        img: 'data:image/png;jpg;jpeg;base64, ' + this.data.inf.img,
        itemCount: this.data.inf.itemCount,
        format: ''
      }
      this.btnLabel = 'Update'
      this.btnIc = 'update'
      this.isImgChosen = true;
      this.imgSrc = 'data:image/png;jpg;jpeg;base64, ' + this.data.inf.img
      this.changeSubCatVal(this.itemInf)
    }


  }

  changeSubCatVal(obj: any) {
    this.subCat = [];
    let subC: any;
    Object.keys(this.data.selOpt).forEach(key => {
      if(key == obj.prod) {
        subC = this.data.selOpt[key]
      }
    })
    _.forEach(subC, arr => {
      this.subCat.push({
        value: arr,
        viewVal: arr
      })
    })
  }

  fileChange(evt: any) {
    if(evt.target.files && evt.target.files[0]) {
      this.isImgChosen = true
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgSrc = reader.result
        this.itemInf.img = reader.result
        console.log(file.name)
      };
      let i = file.name.lastIndexOf('.')
      this.itemInf.format = file.name.substring(i, file.name.length)
      reader.readAsDataURL(file)
    }
  }

  close() {
    this.mdRef.close()
  }

  add(obj: any) {
    console.log(this.itemInf.date)
    this.desc = [];
    let i = obj.img.indexOf(','),
        ln = obj.img.length;
    obj.img = obj.img.substring(i+1, ln)
    _.forEach(obj.desc.split('\n'), arr => {
      this.desc.push(arr)
    })
    if(obj.format == '') {
      obj.format = 'nochange'
    }
    obj.desc = this.desc
    obj.price = (obj.price.indexOf('.') == -1) ? this.cFrmt.numComma(obj.price) + '.00' : this.cFrmt.numComma(obj.price);
    if(this.data.act == 'add') {

      this.itmSvc.addItem(obj).subscribe(res => {
        if(res.res) {
          this.mdRef.close({ prod: this.itemInf.prod, cat: this.itemInf.cat })
        } else {
          console.log('Error code 500')
        }
      })
    } else if(this.data.act == 'update') {
      let data = {
        id: this.data.inf._id,
        xobj: obj
      }
      this.itmSvc.updateItem(data).subscribe(res => {
        if(res.res) {
          this.mdRef.close({ prod: this.itemInf.prod, cat: this.itemInf.cat })
        } else {
          console.log('Error code 500')
        }
      })
    }
  }

}
