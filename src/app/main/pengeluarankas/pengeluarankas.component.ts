import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'pengeluarankas',
  templateUrl: './pengeluarankas.component.html',
  styleUrls: ['./pengeluarankas.component.scss']
})
export class Pengeluarankas implements OnInit {
  displayedColumns = ['bukti', 'tgl', 'rekening', 'perkiraan', 'ket', 'jumlah'];
  dataSource = [];
  kas: any = [];
  myControl: FormControl = new FormControl();

  options = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    this.ambil_data();
  }
  constructor(http: Http, private API: ApiService, public dialog: MatDialog) { }

  ambil_data() {
    this.API.listPengeluarankas()
      .subscribe(result => {
        console.log(result.json().Output);
        this.dataSource = result.json().Output;
        console.log(this.dataSource);
      });
  }

  save_data() {
    this.API.pengeluaran_CreateKas(this.kas.no_bukti, this.kas.tanggal, this.kas.rekening,
      this.kas.perkiraan, this.kas.keterangan, this.kas.jumlah).subscribe(
        result => {
          console.log(result);
          const status = result.json().status;
          const desc = result.json().desc;

          if (result.status === 200) {
            if (status === 'OK') {
              this.ambil_data();
              this.kas = [];
            }
            console.log(this.kas);
          }
        }
      );
  }

  dialogSave(): void {
    const dialogRef = this.dialog.open(formDialogSimpan, {
      height: '650px',
      width: '400px',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      // alert('Data berhasil disimpan');
      this.kas = result;
      console.log(this.kas);
      this.save_data();
    });
  }

}
@Component({
  selector: 'buatkas',
  templateUrl: '/buatkas/buatkas.html',
  styleUrls: ['./buatkas/buatkas.component.scss']
})
export class formDialogSimpan {
  kas: any = [];
  constructor(
    public dialogRef: MatDialogRef<formDialogSimpan>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export const COMPONENT_LIST = [Pengeluarankas, formDialogSimpan];
