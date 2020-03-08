import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { FeatImgViewComponent } from '../../client/cs-home/feat-img-view/feat-img-view.component';
import { MatDialog } from '@angular/material';
// import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
@Component({
  selector: 'app-cs-home',
  templateUrl: './cs-home.component.html',
  styleUrls: ['./cs-home.component.scss']
})
export class CsHomeComponent implements OnInit, AfterViewInit {

  public featProd: any = [];
  public prgLoading: boolean = true

  public carouselImg: any = [
    { image: '../../assets/carousel/1.jpg' },
    { image: '../../assets/carousel/2.jpg' },
    { image: '../../assets/carousel/3.jpg' },
    { image: '../../assets/carousel/4.jpg' },
    { image: '../../assets/carousel/5.jpg' },
  ]

  public gallImg: any = [
    { image: '../../assets/gallery/1.jpg' },
    { image: '../../assets/gallery/2.jpg' },
    { image: '../../assets/gallery/3.jpg' },
    { image: '../../assets/gallery/4.jpg' },
    { image: '../../assets/gallery/5.jpg' },
    { image: '../../assets/gallery/6.jpg' },
    { image: '../../assets/gallery/7.jpg' },
  ]

  // @ViewChild('mapContainer') gmap: ElementRef;

  // public map: google.maps.Map;
  // private lat = 14.070897;
  // private lng = 121.326969;
  // private coordinates = new google.maps.LatLng(this.lat, this.lng);
  // private mapOptions: google.maps.MapOptions = {
  //   center: this.coordinates,
  //   zoom: 8
  // }
  // private marker = new google.maps.Marker({
  //   position: this.coordinates,
  //   map: this.map
  // })

  constructor(
    private itm: ItemsService,
    private md: MatDialog
  ) { }

  ngOnInit() {
    this.itm.getFeatured().subscribe(res => {
      this.prgLoading = false
      this.featProd = res
      console.log(this.featProd)
    })
  }

  ngAfterViewInit() {
    // this.mapInitializer();
  }

  mapInitializer() {
    // this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    // this.marker.setMap(this.map)
  }

  viewImg(img: any) {
    this.md.open(FeatImgViewComponent, {
      data: { img: img },
      width: '60%',
      height: '80%'
    })
  }

}
