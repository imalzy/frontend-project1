import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'pembeli',
  templateUrl: './pembeli.component.html',
  styleUrls: ['./pembeli.component.scss'],
  animations: fuseAnimations
})
export class Pembeli implements OnInit {
  displayedColumns = ['nama', 'ktp', 'alamat_rumah', 'pekerjaan', 'alamat_kantor'];
  dataSource = [];
  ModelPembeli: any = [];
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
    this.API.listpembeli()
      .subscribe(result => {
        console.log(result.json().Output);
        this.dataSource = result.json().Output;
        console.log(this.dataSource);
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

  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  dialogSave(): void {
    const dialogRef = this.dialog.open(Sample2ViewDialog, {
      height: '650px',
      width: '400px',
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
  styleUrls: ['./buatpembeli/buatpembeli.component.scss']
})
export class Sample2ViewDialog {
  ModelPembeli: any = [];
  constructor(
    public dialogRef: MatDialogRef<Sample2ViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export const COMPONENT_LIST = [Pembeli, Sample2ViewDialog];
