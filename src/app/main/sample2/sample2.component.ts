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
  displayedColumns = ['Nama Pemborong', 'NIK', 'Alamat', 'Telepon', 'Action'];
  dataSource = [];
  ModelPemborong: any = [];
  ModelPemborongDelete: any = [];
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
    this.API.Pemborong_CreatePemborong(this.ModelPemborong.Nama, this.ModelPemborong.nik, this.ModelPemborong.alamat, this.ModelPemborong.telpon).subscribe(
      result => {
        console.log(result);
        const status = result.json().status;
        const desc = result.json().desc;

        if (result.status === 200) {
          if (status === 'OK') {
            this.ambil_data();
            this.ModelPemborong = [];
          }
          console.log(this.ModelPemborong);
        }
      }
    );
  }


  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  dialogSave(): void {
    const dialogRef = this.dialog.open(Sample2ViewDialog, {
      height: '450px',
      width: '400px',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ModelPemborong = result;
      this.save_data();
    });
  }

  delete_data() {
    this.API.Pemborong_DeletePemborong(this.ModelPemborongDelete.id_pemborong).subscribe(
      result => {
        console.log(result);
        const status = result.json().status;
        const desc = result.json().desc;

        if (result.status === 200) {
          if (status === 'OK') {
            alert('Data Berhasil Di hapus');
          }
          console.log(this.ModelPemborongDelete);
        }
      }
    );
  }

  dialogDelete(): void {
    const dialogRef = this.dialog.open(viewdialogDelete, {
      height: '180px',
      width: '250px',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ModelPemborongDelete = result;
      console.log(this.ModelPemborongDelete);
      //this.delete_data();
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
  ModelPemborong: any = [];
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
@Component({
  selector: 'sample2-delete',
  templateUrl: 'sample2-delete.html',
  styleUrls: ['./sample2-dialog.component.scss']
})
export class viewdialogDelete {
  ModelPemborongDelete: any = [];
  constructor(
    public dialogRef: MatDialogRef<viewdialogDelete>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
export const COMPONENT_LIST = [Sample2ViewDialog, viewdialogDelete];
