import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { FeatImgViewComponent } from '../../client/cs-home/feat-img-view/feat-img-view.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-cs-home',
  templateUrl: './cs-home.component.html',
  styleUrls: ['./cs-home.component.scss']
})
export class CsHomeComponent implements OnInit {

  public featProd: any = [];

  constructor(
    private itm: ItemsService,
    private md: MatDialog
  ) { }

  ngOnInit() {
    this.itm.getFeatured().subscribe(res => {
      this.featProd = res
      console.log(this.featProd)
    })
  }

  viewImg(img: any) {
    this.md.open(FeatImgViewComponent, {
      data: { img: img },
      width: '50%',
      height: '80%'
    })
  }

}
