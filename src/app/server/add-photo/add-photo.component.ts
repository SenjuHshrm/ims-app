import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatDialog } from '@angular/material';
import { PhotoGallLs } from '../../interfaces/photo-gall-ls';
import { PhotosService } from '../../services/photos.service';
import { DeleteImgComponent } from '../../server/add-photo/delete-img/delete-img.component';
import * as _ from 'lodash';
import * as moment from 'moment';

var photos: PhotoGallLs[] = []

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {

  public photosLs: any = []
  public photoLs = new MatTableDataSource(photos)
  public photoHdr: string[] = ['image', 'uploader', 'date', 'actions']
  public imgToUp: boolean = false;
  public imgSrc: string;
  public filesToUp: Array<any> = []

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private pht: PhotosService,
    private sBar: MatSnackBar,
    private md: MatDialog
  ) { }

  ngOnInit() {
    this.fetchImg()
  }

  fetchImg() {
    photos = []
    this.pht.getPhotoLs().subscribe(res => {
      if(res.length > 0) {
        this.photosLs = res
        _.forEach(this.photosLs, arr => {
          photos.push({
            id: arr._id,
            image: 'data:image/png;jpg;jpeg;base64, ' + arr.image,
            uploader: arr.uploader,
            date: moment(arr.createdAt).format('MMM DD, YYYY')
          })
        })
      } else {
        this.sBar.open('No photos yet', 'OK', { duration: 2000 })
      }
      this.photoLs = new MatTableDataSource(photos)
      this.photoLs.paginator = this.paginator
    })
  }

  fileChange(evt: any) {
    if(evt.target.files) {
      this.imgToUp = true
      let ln: number = evt.target.files.length
      for(let i = 0; i < ln; i++) {
        let file = evt.target.files[i]
        let reader = new FileReader()
        reader.onload = (e) => {
          this.filesToUp.push(reader.result)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  clear() {
    this.filesToUp = []
    this.imgToUp = false
  }

  upload() {
    if(this.filesToUp.length > 0) {
      let imgFiles: Array<string> = []
      _.forEach(this.filesToUp, arr => {
        let i = arr.indexOf(','),
            ln = arr.length
        imgFiles.push(arr.substring(i+1, ln))
      })
      this.pht.addPhoto({ img: imgFiles }).subscribe(res => {
        if(res) {
          this.filesToUp = []
          this.imgToUp = false
          this.ngOnInit()
          this.sBar.open('Files uploaded successfully', 'OK', { duration: 2000 })
        } else {
          this.sBar.open('An error occured', 'OK', { duration: 2000 })
        }
      })
    } else {
      this.sBar.open('Please select file(s) to upload', 'OK', { duration: 2000 })
    }
  }

  deleteItem(row: any) {
    let obj = _.find(this.photosLs, { _id: row.id })
    const mdl = this.md.open(DeleteImgComponent, {
      disableClose: true,
      data: obj,
      panelClass: 'mat-dialog-container-custom'
    })
    mdl.afterClosed().subscribe(res => {
      console.log(res)
      if(res) {
        this.pht.deletePhoto(obj).subscribe(res => {
          if(res == true) {
            this.ngOnInit()
            this.sBar.open('Item removed', 'OK', { duration: 2000 })
          }
        })
      }
    })
  }

}
