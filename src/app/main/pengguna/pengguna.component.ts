import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'pengguna',
  templateUrl: './pengguna.component.html',
  styleUrls: ['./pengguna.component.scss']
})

export class Pengguna implements OnInit {
  displayedColumns = ['nama', 'username', 'gender', 'keterangan', 'status'];
  dataSource = [];
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
    this.API.listPengguna()
      .subscribe(result => {
        console.log(result.json().Output);
        this.dataSource = result.json().Output;
        console.log(this.dataSource);
      });
  }
  filter(val: string): string[] {
    return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
}
export const COMPONENT_LIST = [Pengguna];
