import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { Observable, from } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { FuseSplashScreenService } from '../../../@fuse/services/splash-screen.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, MatProgressSpinnerModule } from '@angular/material';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { componentFactoryName } from '@angular/compiler';
import { environment } from '../../../environments/environment';
import { fuseAnimations } from '@fuse/animations';
import { ToastrService } from 'ngx-toastr';

export interface Element {
  no_surat: string;
  pekerjaan: string;
  nama: string;
  telpon: string;
  total_nilai: number;
  // id_sppr: string;
  // informasi_lain: string;
  // jumlah: number;
  // keterangan: string;
  // ktp: string;
  // nama: string;
  // no: string;
  // pekerjaan: string;
  // tgl_tempo: string;
}


@Component({
  selector: 'daftarmenu',
  templateUrl: './daftarmenu.component.html',
  styleUrls: ['./daftarmenu.component.scss'],
  animations: fuseAnimations
})
export class DaftarMenu implements OnInit {
  displayedColumns = ['no_surat', 'nama', 'pekerjaan', 'telpon', 'total_nilai'];
  // dataSource = [];
  BaseURL = environment.BaseUrl;
  ModelSurat: any = [];
  namaList: UsrNama[] = [];
  id_pemborong: string;
  nama: string;
  myControl: FormControl = new FormControl();
  options = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ref: any = [];
  items: any[];
  selectedRowIndex = [];
  loadRef: any = [];

  dataSource: MatTableDataSource<Element>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(http: Http, private API: ApiService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    this.ambil_data();
  }

  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  showToaster() {
    this.toastr.success("Data Berhasil disimpan", 'Informasi');
  }

  ambil_data() {
    this.API.ListHome()
      .subscribe(result => {
        // this.dataSource = result.json().Output;
        this.dataSource = new MatTableDataSource(result.json().Output);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  save_data() {
    this.API.Surat_CreateSurat(this.ModelSurat.pst_nosurat, this.ModelSurat.pst_idpemborong, this.ModelSurat.pst_tglsurat,
      this.ModelSurat.pst_pekerjaan, this.ModelSurat.pst_proyek, this.ModelSurat.pst_nilai, this.ModelSurat.pst_pelaksanaan,
      this.ModelSurat.pst_awlpekerjaan, this.ModelSurat.pst_akhirpekerjaan, this.ModelSurat.pst_carabayar).subscribe(
        result => {
          console.log(result);
          const status = result.json().status;
          const desc = result.json().desc;

          if (result.status === 200) {
            if (status === 'OK') {
              this.ambil_data();
              this.ModelSurat = [];
            }
            console.log(this.ModelSurat);
          }
        }
      );
  }

  view_cetak(item): void {
    console.log(item);
    const dialogRef = this.dialog.open(viewCetak, {
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  dialogSave(): void {
    const dialogRef = this.dialog.open(Sample2ViewDialog, {
      panelClass: 'dialog',
      width: '500px',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.namaList = result;
      // this.ModelSurat = result;
      //console.log(this.ModelSurat = result);
      this.ambil_data();

    });
  }
}

@Component({
  selector: 'cetak',
  templateUrl: 'cetakdialog/cetak-dialog.html',
  styleUrls: ['./cetakdialog/cetak-dialog.component.scss'],
  animations: fuseAnimations
})
export class viewCetak {
  BaseURL = environment.BaseUrl;
  constructor(
    http: Http, private API: ApiService, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
  }

  Print($id) {
    // alert($id);
    var myWindow = window.open(this.BaseURL + 'cetaksurat/tampil/' + $id, 'MsgWindow', 'width=70%');
  }

}

@Component({
  selector: 'daftarmenu-dialog',
  templateUrl: 'buatspmk/daftarmenu-dialog.html',
  styleUrls: ['./buatspmk/daftarmenu-dialog.component.scss'],
  animations: fuseAnimations
})
// tslint:disable-next-line: component-class-suffix
export class Sample2ViewDialog {
  ModelSurat: any = [];
  syarat_bayar: carabayars[] = [];
  namaList: any = [];
  spmkForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    http: Http, private API: ApiService, public dialog: MatDialog,
    public persyaratan: MatDialogRef<dialogpembayaran>,
    public dialogRef: MatDialogRef<Sample2ViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  nosuratFormControl = new FormControl('', [Validators.required]);
  idpemborongFromControl = new FormControl('', [Validators.required]);
  tglSuratFromControl = new FormControl('', [Validators.required]);
  pekerjaanFromControl = new FormControl('', [Validators.required]);
  proyekFromControl = new FormControl('', [Validators.required]);
  totalnilaiFromControl = new FormControl('', [Validators.required]);
  waktuPelaksanaanFromControl = new FormControl('', [Validators.required]);
  awalPekerjaanFromControl = new FormControl('', [Validators.required]);
  akhirPekerjaanFromControl = new FormControl('', [Validators.required]);

  ngOnInit() {

    this.getnama();
    // this.ModelSurat.no_surat = this.data.no_surat;
    // this.ModelSurat.id_pemborong = this.data.id_pemborong;
    // this.ModelSurat.tglsurat = this.data.tglsurat;
    // this.ModelSurat.pekerjaan = this.data.pekerjaan;
    // this.ModelSurat.proyek = this.data.proyek;
    // this.ModelSurat.total_nilai = this.data.total_nilai;
    // this.ModelSurat.waktupelaksanaan = this.data.waktupengerjaan;
    // this.ModelSurat.awalkerja = this.data.awalkerja;
    // this.ModelSurat.akhirkerja = this.data.akhir_kerja;
    // this.ModelSurat.syarat_bayar = this.data.syarat_bayar;
    // this.ModelSurat.keterangan = this.data.keterangan;

    console.log(this.ModelSurat);

    this.spmkForm = this.formBuilder.group({
      nosurat: this.nosuratFormControl,
      idPemborong: this.idpemborongFromControl,
      tglSurat: this.tglSuratFromControl,
      pekerjaan: this.pekerjaanFromControl,
      proyek: this.proyekFromControl,
      total_nilai: this.totalnilaiFromControl,
      waktupelaksanaan: this.waktuPelaksanaanFromControl,
      awalkerja: this.awalPekerjaanFromControl,
      akhirkerja: this.akhirPekerjaanFromControl
      // carabayar: this.formBuilder.array([this.addBayarFormGroup()])
    });

    // this.spmkForm.get('nosurat').valueChanges.subscribe(
    //   value => {
    //     console.log(value);
    //   }
    // );

    // this.spmkForm.get('carabayar').valueChanges.subscribe(
    //   value => {
    //     console.log(value);
    //   }
    // );

    // this.spmkForm.valueChanges.subscribe(
    //   value => {
    //     console.log(JSON.stringify(value));
    //   }
    // );
  }

  onSubmit(): void {

    // this.API.tambah_kedua(this.ModelSurat, this.syarat_bayar).subscribe(result => {
    //   console.log(result);
    // const status = result.json().status;
    // const desc = result.json().desc;
    // if (result.status === 200) {
    //   if (status === 'OK') {
    //     this.ModelSurat = [];
    //   }
    //   console.log(this.ModelSurat);
    // }

  }

  // tslint:disable-next-line: member-ordering
  // syarat_bayarFormControl = new FormControl('', [Validators.required]);
  // tslint:disable-next-line: member-ordering
  // keteranganFormControl = new FormControl('');
  // addBayarFormGroup(): FormGroup {
  //   return this.formBuilder.group({
  //     syarat_bayar: this.syarat_bayarFormControl,
  //     keterangan: this.keteranganFormControl
  //   });
  // }

  // addSkillButtonClick(): void {
  //   (<FormArray>this.spmkForm.get('carabayar')).push(this.addBayarFormGroup());
  // }

  removecarabayars(i: number) {
    const control = <FormArray>this.spmkForm.controls['carabayar'];
    control.removeAt(i);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  simpandata() {
    this.API.tambah_kedua(this.ModelSurat.pst_nosurat, this.ModelSurat.pst_idpemborong, this.ModelSurat.pst_tglsurat,
      this.ModelSurat.pst_pekerjaan, this.ModelSurat.pst_proyek, this.ModelSurat.pst_nilai, this.ModelSurat.pst_pelaksanaan,
      this.ModelSurat.pst_awlpekerjaan, this.ModelSurat.pst_akhirpekerjaan, this.syarat_bayar).subscribe(result => {
        //console.log('Ini adalah result ' + result);
      });
  }

  showToaster() {
    this.toastr.success("Data Berhasil disimpan", 'Informasi');
    this.simpandata();
    // console.log(this.ModelSurat);
    // console.log(this.syarat_bayar);
  }
  getRequiredErrorMessage(field: any) {
    return this.spmkForm.get(field).hasError('required') ? 'You must enter a value' : '';
  }

  getnama() {
    this.API.listNama().subscribe(
      result => {
        this.namaList = result.json().Output;
        console.log(this.namaList);
      });
  }

  save(model: spmk) {
    // call API to save customer
    console.log(model);
  }

  removeItem(i: number): void {
    this.syarat_bayar.splice(i, 1);
  }

  opDialog() {
    this.persyaratan = this.dialog.open(dialogpembayaran, {
    });
    this.persyaratan.afterClosed().subscribe(result => {

      if (result !== '') {
        this.syarat_bayar.push({ syarat_bayar: result.syarat_bayar, keterangan: result.keterangan });
        console.log(this.ModelSurat);
        console.log(this.syarat_bayar);
        // console.log(result.syarat_bayar);
        // console.log(result.keterangan);
      }
    });
  }

}
export interface spmk {
  nosurat: string;
  idpemborong: string;
  tglsurat: string;
  pekerjaan: string;
  proyek: string;
  totalnilai: number;
  waktupengerjaan: string;
  awalkerja: string;
  akhirkerja: string;
}

export interface carabayars {
  syarat_bayar: string;
  keterangan: string;
}

@Component({
  selector: 'daftarmenu-pembayaran',
  templateUrl: './daftarmenu-pembayaran.html',
  styleUrls: ['./daftarmenu.component.scss'],
  animations: fuseAnimations
})
export class dialogpembayaran {
  persyaratan: any = [];
  syaratForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }

  carabayarFormControl = new FormControl('', [Validators.required]);
  keteranganFormControl = new FormControl('', [Validators.required]);
  ngOnInit() {
    this.syaratForm = this.formBuilder.group({
      carabayar: this.carabayarFormControl,
      keterangan: this.keteranganFormControl
    });
  }
}


export interface UsrNama {
  id_pemborong: string;
  nama: string;
}
export interface UserData {
  id: string;
  category: string;
  image: string;
}

export const COMPONENT_LIST = [
  DaftarMenu,
  Sample2ViewDialog,
  dialogpembayaran,
  viewCetak,
];
