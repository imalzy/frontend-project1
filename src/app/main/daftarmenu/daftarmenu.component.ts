import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { FuseSplashScreenService } from '../../../@fuse/services/splash-screen.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  displayedColumns = ['no_surat', 'pekerjaan', 'nama', 'telpon', 'total_nilai'];
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
      this.namaList = result;
      this.ModelSurat = result;
      //console.log(this.ModelSurat = result);
      this.save_data();

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
export class Sample2ViewDialog {
  ModelSurat: any = [];
  namaList: UsrNama[];
  constructor(
    http: Http, private API: ApiService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<Sample2ViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  nosuratFormControl = new FormControl('', [Validators.required]);
  idpemborongControl = new FormControl('', [Validators.required]);
  tglsuratControl = new FormControl('', [Validators.required]);
  pekerjaanControl = new FormControl('', [Validators.required]);
  proyekControl = new FormControl('', [Validators.required]);
  totalnilaiControl = new FormControl('', [Validators.required]);
  waktupengerjaanControl = new FormControl('', [Validators.required]);
  awalkerjaControl = new FormControl('', [Validators.required]);
  akhirkerjaControl = new FormControl('', [Validators.required]);
  carabayarControl = new FormControl('', [Validators.required]);

  spmkForm: FormGroup = new FormGroup({
    nosuratGroup: this.nosuratFormControl,
    idpemborongGroup: this.idpemborongControl,
    tglsuratGroup: this.tglsuratControl,
    pekerjaanGroup: this.pekerjaanControl,
    proyekGroup: this.proyekControl,
    totalnilaiGroup: this.totalnilaiControl,
    waktupengerjaanGroup: this.waktupengerjaanControl,
    awalkerjaGroup: this.awalkerjaControl,
    akhirkerjaGroup: this.akhirkerjaControl,
    carabayarGroup: this.carabayarControl,

  });

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.getnama();
  }

  showToaster() {
    // this.toastr.success("Data Berhasil disimpan", 'Informasi');
    console.log(this.ModelSurat);
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

}
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'daftarmenu-loading',
  templateUrl: './daftarmenu-loading.html',
  styleUrls: ['./daftarmenu.component.scss'],
  animations: fuseAnimations
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
  LoadingDaftarmenu,
  viewCetak,
];
