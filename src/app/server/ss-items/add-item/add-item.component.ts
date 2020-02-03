import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectOpts } from '../../../interfaces/select-opts';
import { ItemsService } from '../../../services/items.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  public itemInf: any;
  public itemParam: any;
  public imgSrc: any = '/assets/sel_img.png';
  public isImgChosen: boolean = false;
  public products: SelectOpts[] = [];
  public subCat: SelectOpts[] = [];
  public desc: string[];
  public nLCount: number = 0;

  constructor(
    public mdRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itmSvc: ItemsService
  ) { }
  ngOnInit() {
    console.log(this.data)
    this.itemInf = {
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
    _.forEach(this.data.prod, arr => {
      this.products.push({
        value: arr.value,
        viewVal: arr.viewVal
      })
    })
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
    this.desc = [];
    let i = obj.img.indexOf(','),
        ln = obj.img.length;
    obj.img = obj.img.substring(i+1, ln)
    _.forEach(obj.desc.split('\n'), arr => {
      this.desc.push(arr)
    })
    obj.desc = this.desc
    console.log(obj.desc)
    this.itmSvc.addItem(obj).subscribe(res => {
      if(res.res) {
        this.mdRef.close({ prod: this.itemInf.prod, cat: this.itemInf.cat })
      } else {
        console.log('Error code 500')
      }
    })
  }

  // addLineBreak(evt: KeyboardEvent, obj: any) {
  //   this.desc = [];
  //   if(evt.key == 'Enter') {
  //     // this.nLCount ++;
  //     // if(this.nLCount == 1) {
  //     //   this.desc = this.desc + obj.desc + ' newLine '
  //     // } else {
  //     //   this.desc = this.desc + ' newLine '
  //     // }
  //     // console.log(this.desc)
  //     _.forEach(obj.desc.split('\n'), ar => {
  //       this.desc.push(ar)
  //     })
  //   }
  // }
}
