import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';



@Component({
  selector: 'perkiraan',
  templateUrl: './perkiraan.component.html',
  styleUrls: ['./perkiraan.component.scss'],
  animations: fuseAnimations
})
export class Perkiraan implements OnInit {
  displayedColumns = ['id', 'rekening', 'kelompok'];
  dataSource = [];
  rek: any = [];
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
    this.API.listperkiraan()
      .subscribe(result => {
        console.log(result.json().Output);
        this.dataSource = result.json().Output;
        console.log(this.dataSource);
      });
  }

  save_data() {
    this.API.perkiraan_Create(this.rek.glid, this.rek.rekening, this.rek.kelompok).subscribe(
      result => {
        console.log(result);
        const status = result.json().status;
        const desc = result.json().desc;

        if (result.status === 200) {
          if (status === 'OK') {
            this.ambil_data();
            this.rek = [];
          }
          console.log(this.rek);
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
      this.rek = result;
      console.log(this.rek);
      this.save_data();
    });
  }
}

@Component({
  selector: 'buatkas',
  templateUrl: '/buatperkiraan/buatperkiraan.html',
  styleUrls: ['./buatperkiraan/buatperkiraan.component.scss']
})
export class formDialogSimpan {
  rek: any = [];
  constructor(
    public dialogRef: MatDialogRef<formDialogSimpan>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
export const COMPONENT_LIST = [Perkiraan, formDialogSimpan];
