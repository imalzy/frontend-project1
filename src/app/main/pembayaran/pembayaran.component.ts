import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { merge, Observable, BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { ToastrService } from 'ngx-toastr';

export interface Element {
  alamat_informasi: string;
  alamat_kantor: string;
  alamat_rumah: string;
  id_pembayaran: string;
  id_pembeli: string;
  id_sppr: string;
  informasi_lain: string;
  jumlah: number;
  keterangan: string;
  ktp: string;
  nama: string;
  no: string;
  pekerjaan: string;
  tgl_tempo: string;
}

@Component({
  selector: 'app-pembayaran',
  templateUrl: './pembayaran.component.html',
  styleUrls: ['./pembayaran.component.scss'],
  animations: fuseAnimations
})
export class Pembayaran implements OnInit {
  displayedColumns = ['nama', 'kode', 'tgl', 'ket', 'jlh'];
  dataSource: MatTableDataSource<Element>;
  // arrDataSource: Element[] = [];
  // sourceData = new MatTableDataSource(this.arrDataSource);
  // data_Source = this.sourceData.data;
  ModelTransaksi: any = [];
  myControl: FormControl = new FormControl();

  options = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  dialogRef: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(http: Http, private API: ApiService, public dialog: MatDialog, private toastr: ToastrService) { }

  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );

    this.ambil_data();

    // console.log(this.sourceData);
  }


  ambil_data() {

    this.API.ListPembayaran()
      .subscribe(result => {
        //console.log(result.json().Output);
        //this.dataSource = result.json().Output;
        this.dataSource = new MatTableDataSource(result.json().Output);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  save_data() {
    this.API.pembayaran_create(this.ModelTransaksi.idPembeli, this.ModelTransaksi.idSppr,
      this.ModelTransaksi.nomor, this.ModelTransaksi.tglTempo, this.ModelTransaksi.keterangan, this.ModelTransaksi.jlh).subscribe(
        result => {
          console.log(result);
          const status = result.json().status;
          const desc = result.json().desc;

          if (result.status === 200) {
            if (status === 'OK') {
              // this.ambil_data();
              this.ModelTransaksi = [];
            }
            console.log(this.ModelTransaksi);
          }
        }
      );
  }

  openDialog() {
    this.dialogRef = this.dialog.open(transaksiDialog, {
      panelClass: 'dialog',
      width: '500px',
      hasBackdrop: true,
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.ModelTransaksi = result;
      console.log(this.ModelTransaksi);
      this.save_data();

    });
  }
  showToaster() {
    this.toastr.success("Data Berhasil disimpan", 'Informasi');
    // this.toastr.info("Important News", 'Information');
    // this.toastr.error('everything is broken', 'Major Error', {
    //   timeOut: 3000
    // });
    // this.toastr.info('Are you the 6 fingered man?')
  }
}

@Component({
  selector: 'buat-pembayaran',
  templateUrl: 'buat-pembayaran.html',
  styleUrls: ['./buat-pembayaran.component.scss'],
  animations: fuseAnimations

})
export class transaksiDialog {

  ModelTransaksi: any = [];
  dataSource = [];
  listNama = [];
  constructor(
    http: Http, private API: ApiService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<transaksiDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }


  namaPembeliFormControl = new FormControl('', [Validators.required]);
  transaksiFormControl = new FormControl('', [Validators.required]);
  noFormControl = new FormControl('', [Validators.required]);
  tglTempoFormControl = new FormControl('', [Validators.required]);
  ketFormControl = new FormControl('', [Validators.required]);
  jumlahFormControl = new FormControl('', [Validators.required]);


  transaksiFrom: FormGroup = new FormGroup({
    namaPembeliGroup: this.namaPembeliFormControl,
    transaksiGroup: this.transaksiFormControl,
    noGroup: this.noFormControl,
    tglGroup: this.tglTempoFormControl,
    ketGroup: this.ketFormControl,
    jumlahGroup: this.jumlahFormControl
  });

  showToaster() {
    this.toastr.success("Data Berhasil disimpan", 'Informasi');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

  getRequiredErrorMessage(field: any) {
    return this.transaksiFrom.get(field).hasError('required') ? 'You must enter a value' : '';
  }
}


export const COMPONENT_LIST = [Pembayaran, transaksiDialog];
