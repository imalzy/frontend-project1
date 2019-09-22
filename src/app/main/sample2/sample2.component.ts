import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'sample',
  templateUrl: './sample2.component.html',
  styleUrls: ['./sample2.component.scss']
})
export class AutocompleteAutoActiveFirstOptionExample implements OnInit {
  displayedColumns = ['Id Pemborong', 'Nama Pemborong', 'NIK', 'Alamat', 'Telepon', 'Action'];
  dataSource = [];
  Modelpemborong: any = {};
  myControl: FormControl = new FormControl();
  options = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  ELEMENT_DATA: Pengguna[] = [];
  animal: string;
  name: string = '';

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    this.ambil_data();
  }
  constructor(http: Http, private API: ApiService, public dialog: MatDialog) {

  }

  ambil_data() {
    this.API.ListPemborong()
      .subscribe(result => {
        console.log(result.json());
        // this.ELEMENT_DATA = result.json().Output;
        this.dataSource = result.json().Output;
        console.log(this.dataSource);
      });
  }
  save_data() {
    this.API.Pemborong_CreatePemborong(this.Modelpemborong.nama, this.Modelpemborong.nik, this.Modelpemborong.alamat, this.Modelpemborong.telpon).subscribe(
      result => {
        console.log(result);
        const status = result.json().status;
        const desc = result.json().desc;

        if (result.status === 200) {
          if (status === 'OK') {
            this.ambil_data();
            this.Modelpemborong = [];
          }
        }
      }
    );
  }
  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Sample2ViewDialog, {
      height: '450px',
      width: '400px',
      disableClose: true,
      hasBackdrop: true,
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

export interface Pengguna {
  username: string;
  namalengkap: string;
  profile: string;
}

@Component({
  selector: 'sample2-dialog',
  templateUrl: 'sample2-dialog.html',
  styleUrls: ['./sample2-dialog.component.scss']
})
export class Sample2ViewDialog {

  constructor(
    public dialogRef: MatDialogRef<Sample2ViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  animal: string;
  name: string;
}

export const COMPONENT_LIST = [
  Sample2ViewDialog,
];