import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sample',
  templateUrl: './sample2.component.html',
  styleUrls: ['./sample2.component.scss'],
  animations: fuseAnimations
})
export class AutocompleteAutoActiveFirstOptionExample implements OnInit {
  displayedColumns = ['Nama Pemborong', 'NIK', 'Alamat', 'Telepon'];
  dataSource = [];
  ModelPemborong: any = [];
  ModelPemborongDelete: any = [];
  myControl: FormControl = new FormControl();
  options = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  ELEMENT_DATA: Pengguna[] = [];
  dialogRef: any;

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
    this.dialogRef = this.dialog.open(Sample2ViewDialog, {
      panelClass: 'dialog',
      width: '500px',
      hasBackdrop: true,
    });

    this.dialogRef.afterClosed().subscribe(result => {
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
      panelClass: 'dialog',
      width: '500px',
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
  templateUrl: 'buatpemborong/sample2-dialog.html',
  styleUrls: ['./buatpemborong/sample2-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Sample2ViewDialog {
  ModelPemborong: any = [];


  /**
    * Constructor
    *
    * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
    * @param _data
    * @param {FormBuilder} _formBuilder
    */
  constructor(http: Http, private API: ApiService, public dialog: MatDialog,
    public matDialogRef: MatDialogRef<Sample2ViewDialog>,
    public dialogRef: MatDialogRef<Sample2ViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }


  namaPemborongFormControl = new FormControl('', [Validators.required]);
  nikPemborongFormControl = new FormControl('', [Validators.required]);
  alamatPemborongFormControl = new FormControl('', [Validators.required]);
  telponPemborongFormControl = new FormControl('', [Validators.required]);

  pemborongFrom: FormGroup = new FormGroup({
    namaPemborongGroup: this.namaPemborongFormControl,
    nikPemborongGroup: this.nikPemborongFormControl,
    alamatPemborongGroup: this.alamatPemborongFormControl,
    telponPemborongGroup: this.telponPemborongFormControl,
  });

  showToaster() {
    this.toastr.success("Data Berhasil disimpan", 'Informasi');
  }
  getRequiredErrorMessage(field: any) {
    return this.pemborongFrom.get(field).hasError('required') ? 'You must enter a value' : '';
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'sample2-delete',
  templateUrl: 'sample2-delete.html',
  styleUrls: ['./buatpemborong/sample2-dialog.component.scss']
})
export class viewdialogDelete {
  ModelPemborongDelete: any = [];
  constructor(
    public dialogRef: MatDialogRef<viewdialogDelete>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
export const COMPONENT_LIST = [Sample2ViewDialog, viewdialogDelete];
