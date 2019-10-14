import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})

export class SampleComponent implements OnInit {
  displayedColumns = ['nama', 'alamat', 'pekerjaan', 'tipe', 'harga',
    'dp', 'angsuran'];
  dataSource = [];
  ModelSppr: any = [];
  myControl: FormControl = new FormControl();
  options = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    this.ambil_data();
  }
  constructor(http: Http, private API: ApiService, public dialog: MatDialog) { }

  ambil_data() {
    this.API.ListSppr()
      .subscribe(result => {
        console.log(result.json().Output);
        this.dataSource = result.json().Output;
        console.log(this.dataSource);
      });
  }

  save_data() {
    this.API.Sppr_CreateSppr(this.ModelSppr.post_tipe, this.ModelSppr.post_harga,
      this.ModelSppr.post_tanah, this.ModelSppr.post_pagar, this.ModelSppr.post_tambahan,
      this.ModelSppr.post_potongan, this.ModelSppr.book, this.ModelSppr.post_dp,
      this.ModelSppr.post_idPembeli).subscribe(
        result => {
          const status = result.json().status;
          const desc = result.json().desc;

          if (result.status === 200) {
            if (status === 'OK') {
              this.ambil_data();
              this.ModelSppr = [];
            }
            console.log(this.ModelSppr);
          }
        }
      );
  }

  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  dialogSave(): void {
    const dialogRef = this.dialog.open(dialogTambah, {
      height: '600px',
      width: '800px',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      alert('Data berhasil disimpan');
      // this.ModelPemborong = result;
      // this.save_data();
    });
  }
}


@Component({
  selector: 'buatsppr',
  templateUrl: 'buatsppr/buatsurat.html',
  styleUrls: ['buatsppr/buatsurat.component.scss']
})
export class dialogTambah {
  ModelSppr: any = [];
  namaList: any = [];
  constructor(
    http: Http, private API: ApiService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<dialogTambah>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.ambil_nama();
  }

  ambil_nama() {
    this.API.ListSppr()
      .subscribe(result => {
        this.namaList = result.json().Output;
        console.log(this.namaList);
      });
  }
}

export const COMPONENT_LIST = [dialogTambah];
