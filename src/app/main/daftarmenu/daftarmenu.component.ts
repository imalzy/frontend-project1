import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { FuseSplashScreenService } from '../../../@fuse/services/splash-screen.service';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, MatProgressSpinnerModule } from '@angular/material';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'daftarmenu',
  templateUrl: './daftarmenu.component.html',
  styleUrls: ['./daftarmenu.component.scss']
})
export class DaftarMenu implements OnInit {
  displayedColumns = ['no_surat', 'tanggal_surat', 'nama', 'telpon'];
  dataSource = [];
  Modelsurat = [];
  myControl: FormControl = new FormControl();
  options = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ref: any = [];
  items: any[];
  selectedRowIndex = [];
  // displayedColumns = ['id', 'category'];
  loadRef: any = [];

  listmenu: UserData[] = [];

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    this.ambil_data();
  }
  constructor(http: Http, private API: ApiService, public dialog: MatDialog) { }

  ambil_data() {
    this.API.ListHome()
      .subscribe(result => {
        console.log(result.json().Output);
        // this.ELEMENT_DATA = result.json().Output;
        this.dataSource = result.json().Output;
        console.log(this.dataSource);
      });
  }

  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}

@Component({
  selector: 'daftarmenu-dialog',
  templateUrl: './daftarmenu-dialog.html',
  styleUrls: ['./daftarmenu.component.scss']
})

export class DialogDaftarmenu {
  color = 'accent';
  mode = 'indeterminate';
  value = 30;
  constructor(
    public dialogRef: MatDialogRef<DialogDaftarmenu>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'daftarmenu-loading',
  templateUrl: './daftarmenu-loading.html',
  styleUrls: ['./daftarmenu.component.scss']
})
export class LoadingDaftarmenu {
  color = 'accent';
  mode = 'indeterminate';
  value = 30;
  constructor(
    public dialogRef: MatDialogRef<LoadingDaftarmenu>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }

}

/** Builds and returns a new User. */
function createNewUser(category: string, id: string, image: string): UserData {

  return {
    id: id.toString(),
    category: category,
    image: image,
  };
}

export interface UserData {
  id: string;
  category: string;
  image: string;
}

export const COMPONENT_LIST = [
  DaftarMenu,
  DialogDaftarmenu,
  LoadingDaftarmenu,
]