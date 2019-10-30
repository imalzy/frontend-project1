import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

export interface Element {
  alamat_informasi: string;
  alamat_kantor: string;
  alamat_rumah: string;
  informasi_lain: string;
  ktp: string;
  nama: string;
  pekerjaan: string;
}

@Component({
  selector: 'pembeli',
  templateUrl: './pembeli.component.html',
  styleUrls: ['./pembeli.component.scss'],
  animations: fuseAnimations
})
export class Pembeli implements OnInit {
  displayedColumns = ['nama', 'ktp', 'alamat_rumah', 'pekerjaan', 'alamat_kantor'];
  dataSource: MatTableDataSource<Element>;
  ModelPembeli: any = [];
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
    this.API.listpembeli()
      .subscribe(result => {
        console.log(result.json().Output);
        //this.dataSource = result.json().Output;
        // console.log(this.dataSource);
        this.dataSource = new MatTableDataSource(result.json().Output);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  save_data() {
    this.API.Pembeli_CreatePembeli(this.ModelPembeli.nama_pembeli,
      this.ModelPembeli.ktp_pembeli, this.ModelPembeli.pekerjaan_pembeli,
      this.ModelPembeli.alamat_pembeli, this.ModelPembeli.kantor_pembeli,
      this.ModelPembeli.informasi_pembeli, this.ModelPembeli.alamat_lain).subscribe(
        result => {
          console.log(result);
          const status = result.json().status;
          const desc = result.json().desc;

          if (result.status === 200) {
            if (status === 'OK') {
              this.ambil_data();
              this.ModelPembeli = [];
            }
            console.log(this.ModelPembeli);
          }
        }
      );
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  dialogSave(): void {
    const dialogRef = this.dialog.open(Sample2ViewDialog, {
      panelClass: 'dialog',
      width: '500px',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      // alert('Data berhasil disimpan');
      this.ModelPembeli = result;
      console.log(this.ModelPembeli);
      this.save_data();
    });
  }
}

@Component({
  selector: 'buatpembeli',
  templateUrl: '/buatpembeli/buatpembeli.html',
  styleUrls: ['./buatpembeli/buatpembeli.component.scss'],
  animations: fuseAnimations
})
export class Sample2ViewDialog {
  ModelPembeli: any = [];
  constructor(
    public dialogRef: MatDialogRef<Sample2ViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  namapembeliFormControl = new FormControl('', [Validators.required]);
  nikControl = new FormControl('', [Validators.required]);
  alamatControl = new FormControl('', [Validators.required]);
  pekerjaanControl = new FormControl('', [Validators.required]);
  kantorControl = new FormControl('', [Validators.required]);
  informasilainControl = new FormControl('', [Validators.required]);
  alamatlainControl = new FormControl('', [Validators.required]);

  pembeliForm: FormGroup = new FormGroup({
    namapembeliGroup: this.namapembeliFormControl,
    nikGroup: this.nikControl,
    alamatGroup: this.alamatControl,
    pekerjaanGroup: this.pekerjaanControl,
    kantorGroup: this.kantorControl,
    informasilainGroup: this.informasilainControl,
    alamatlainGroup: this.alamatlainControl,

  });

  showToaster() {
    this.toastr.success("Data Berhasil disimpan", 'Informasi');
  }
  getRequiredErrorMessage(field: any) {
    return this.pembeliForm.get(field).hasError('required') ? 'You must enter a value' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export const COMPONENT_LIST = [Pembeli, Sample2ViewDialog];
