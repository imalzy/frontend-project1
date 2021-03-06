import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pembayaran } from 'app/main/pembayaran/pembayaran.component';
import { environment } from '../../../environments/environment';
import { fuseAnimations } from '@fuse/animations';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

export interface Element {
  alamat_informasi: string;
  alamat_kantor: string;
  alamat_rumah: string;
  booking_fee: number;
  cicilan: number;
  harga_jual: number;
  harga_pembelian: number;
  id_pembeli: string;
  id_sppr: string;
  id_tipe: string;
  informasi_lain: string;
  jenis_tipe: string;
  kelebihan_pagar: number;
  kelebihan_tanah: number;
  ktp: string;
  nama: string;
  pekerjaan: string;
  pekerjaan_tambahan: string;
  potongan_harga: number;
  uang_dp: number;
}

@Component({
  selector: 'sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
  animations: fuseAnimations
})

export class SampleComponent implements OnInit {
  displayedColumns = ['nama', 'alamat', 'pekerjaan', 'tipe', 'harga',
    'dp', 'angsuran'];
  dataSource: MatTableDataSource<Element>;
  ModelSppr: any = [];
  myControl: FormControl = new FormControl();
  options = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(http: Http, private API: ApiService, public dialog: MatDialog) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    this.ambil_data();
  }


  ambil_data() {
    this.API.ListSppr()
      .subscribe(result => {
        // console.log(result.json().Output);
        // this.dataSource = result.json().Output;
        // console.log(this.dataSource);
        this.dataSource = new MatTableDataSource(result.json().Output);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  save_data() {
    this.API.Sppr_CreateSppr(this.ModelSppr.idPembeli, this.ModelSppr.tipe,
      this.ModelSppr.hargaJual, this.ModelSppr.tanah, this.ModelSppr.pagar,
      this.ModelSppr.pekerjaan, this.ModelSppr.potongan,
      this.ModelSppr.bookFee, this.ModelSppr.dp).subscribe(
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  dialogSave(): void {
    const dialogRef = this.dialog.open(dialogTambah, {
      panelClass: 'dialog',
      width: '500px',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ModelSppr = result;
      this.save_data();
    });
  }


  lihatdata(item) {
    console.log(item);
    const dialogRef = this.dialog.open(viewpembayaran, {
      data: item,
      height: '300px',
      width: '800px',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  preview(item): void {
    console.log(item);
    const dialogRef = this.dialog.open(viewCetak, {
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'cetak',
  templateUrl: 'cetak-dialog.html',
  styleUrls: ['./cetak-dialog.component.scss'],
  animations: fuseAnimations
})
export class viewCetak {
  BaseURL = environment.BaseUrl;
  detail_bayar: any = [];
  data2 = [];
  idPembeli = this.data.id_pembeli;
  idSppr = this.data.id_sppr;

  constructor(private toastr: ToastrService,
    http: Http, private API: ApiService, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  showToaster() {
    this.toastr.success("Data Berhasil disimpan", 'Informasi');
  }

  detailPembayaran(idPembeli, idSppr) {
    this.API.DetailPembayaran(idPembeli, idSppr)
      .subscribe(result => {
        this.detail_bayar = result.json().Output;
        console.log(this.detail_bayar);
      });
  }

  ngOnInit() {
    console.log(this.data);
    this.detailPembayaran(this.idPembeli, this.idSppr);
    console.log('ini adalah log 20' + this.detail_bayar);
  }

  Print($id, $sppr) {
    // alert($id);
    var myWindow = window.open(this.BaseURL + 'cetaksurat/tampil_sppr/' + $id + '/' + $sppr, 'MsgWindow', 'width=70%');
  }

}

@Component({
  selector: 'viewPembayaran',
  templateUrl: 'detailcicilan/detailcicilan.html',
  styleUrls: ['./sample.component.scss'],
  animations: fuseAnimations
})
export class viewpembayaran {
  displayedColumns = ['nama', 'kode', 'nomor', 'tgl', 'keterangan', 'jumlah'];
  detail_bayar: any = [];
  idPembeli = this.data.id_pembeli;
  idSppr = this.data.id_sppr;
  constructor(
    http: Http, private API: ApiService, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  detailPembayaran(idPembeli, idSppr) {
    this.API.DetailPembayaran(idPembeli, idSppr)
      .subscribe(result => {
        this.detail_bayar = result.json().Output;
        console.log(this.detail_bayar);
      });
  }

  ngOnInit() {
    //console.log('ini adalah log 1' + this.idPembeli, this.idSppr);
    this.detailPembayaran(this.idPembeli, this.idSppr);
    console.log('ini adalah log 20' + this.detail_bayar);
  }
}


@Component({
  selector: 'buatsppr',
  templateUrl: 'buatsppr/buatsurat.html',
  styleUrls: ['buatsppr/buatsurat.component.scss'],
  animations: fuseAnimations
})
export class dialogTambah {
  ModelSppr: any = [];
  namaList: any = [];
  namaTipe: any = [];

  constructor(
    http: Http, private API: ApiService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<dialogTambah>,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  idpembeliFormControl = new FormControl('', [Validators.required]);
  tipeFormControl = new FormControl('', [Validators.required]);
  hrgajualFormControl = new FormControl('', [Validators.required]);
  kelebihantanahFormControl = new FormControl('', [Validators.required]);
  kelebihanpagarFormControl = new FormControl('', [Validators.required]);
  pekerjaantambahanFormControl = new FormControl('', [Validators.required]);
  potonganhargaFormControl = new FormControl('', [Validators.required]);
  bookingFormControl = new FormControl('', [Validators.required]);
  dpFormControl = new FormControl('', [Validators.required]);

  spprForm: FormGroup = new FormGroup({
    idpembeliGroup: this.idpembeliFormControl,
    tipeGroup: this.tipeFormControl,
    hrgajualGroup: this.hrgajualFormControl,
    kelebihantanahGroup: this.kelebihantanahFormControl,
    kelebihanpagarGroup: this.kelebihanpagarFormControl,
    pekerjaantambahanGroup: this.pekerjaantambahanFormControl,
    potonganhargaGroup: this.potonganhargaFormControl,
    bookingGroup: this.bookingFormControl,
    dpGroup: this.dpFormControl
  });

  showToaster() {
    this.toastr.success("Data Berhasil disimpan", 'Informasi');
  }
  getRequiredErrorMessage(field: any) {
    return this.spprForm.get(field).hasError('required') ? 'You must enter a value' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.ambil_nama();
    this.ambil_tipe();
  }

  ambil_tipe() {
    this.API.ListTipe()
      .subscribe(result => {
        this.namaTipe = result.json().Output;
        console.log(this.namaTipe);
      });
  }

  ambil_nama() {
    this.API.ListSppr()
      .subscribe(result => {
        this.namaList = result.json().Output;
        console.log(this.namaList);
      });
  }

}

export const COMPONENT_LIST = [
  dialogTambah,
  viewpembayaran,
  viewCetak,
];
