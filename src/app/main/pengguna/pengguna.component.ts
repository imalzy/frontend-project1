import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormControl, FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ErrorStateMatcher } from '@angular/material/core';
import { fuseAnimations } from '@fuse/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pengguna',
  templateUrl: './pengguna.component.html',
  styleUrls: ['./pengguna.component.scss'],
  animations: fuseAnimations
})

export class Pengguna implements OnInit {
  displayedColumns = ['nama', 'username', 'gender', 'keterangan', 'level'];
  dataSource = [];
  ModelPengguna: any = [];
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

  save_data() {
    this.API.Pengguna_CreatePengguna(this.ModelPengguna.pst_password, this.ModelPengguna.post_username,
      this.ModelPengguna.nama_lengkap, this.ModelPengguna.post_gender, this.ModelPengguna.post_level).subscribe(
        result => {
          console.log(result);
          const status = result.json().status;
          const desc = result.json().desc;

          if (result.status === 200) {
            if (status === 'OK') {
              this.ambil_data();
              this.ModelPengguna = [];
            }
            console.log(this.ModelPengguna);
          }
        }
      );
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
      this.ModelPengguna = result;
      this.save_data();
    });
  }
}

//validation password
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'buatpengguna',
  templateUrl: 'buatpengguna.html',
  styleUrls: ['./buatpengguna.component.scss'],
  animations: fuseAnimations
})
export class Sample2ViewDialog {
  ModelPengguna: any = [];
  myForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(public dialogRef: MatDialogRef<Sample2ViewDialog>, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    },
      { validator: this.checkPasswords },
    );
  }


  namalengkapFormControl = new FormControl('', [Validators.required]);
  jkControl = new FormControl('', [Validators.required]);
  lvlControl = new FormControl('', [Validators.required]);
  usernameControl = new FormControl('', [Validators.required]);
  passControl = new FormControl('', [Validators.required, (control) => this.validatePasswords(control, 'passControl')]);
  confpassControl = new FormControl('', [Validators.required, (control) => this.validatePasswords(control, 'confpassControl')]);


  penggunaForm: FormGroup = new FormGroup({
    namalengkapGroup: this.namalengkapFormControl,
    jkControlGroup: this.jkControl,
    lvlControlGroup: this.lvlControl,
    usernameControlGroup: this.usernameControl,
    passControlGroup: this.passControl,
    confpassControlGroup: this.confpassControl,
  });

  validatePasswords(control: AbstractControl, name: string) {
    if (this.penggunaForm === undefined || this.passControl.value === '' || this.confpassControl.value === '') {
      return null;
    } else if (this.passControl.value === this.confpassControl.value) {
      if (name === 'password1' && this.confpassControl.hasError('passwordMismatch')) {
        this.passControl.setErrors(null);
        this.confpassControl.updateValueAndValidity();
      } else if (name === 'password2' && this.passControl.hasError('passwordMismatch')) {
        this.confpassControl.setErrors(null);
        this.passControl.updateValueAndValidity();
      }
      return null;
    } else {
      return {
        'passwordMismatch': { value: 'The provided passwords do not match' }
      };
    }
  }

  get password1(): AbstractControl {
    return this.penggunaForm.get('passControl');
  }

  get password2(): AbstractControl {
    return this.penggunaForm.get('confpassControl');
  }

  showToaster() {
    this.toastr.success("Data Berhasil disimpan", 'Informasi');
  }


  getRequiredErrorMessage(field: any) {
    return this.penggunaForm.get(field).hasError('required') ? 'Data belum diisi' : '';
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.ModelPengguna);
  }
}
export interface DialogData {
  animal: string;
  name: string;
}

export const COMPONENT_LIST = [Pengguna, Sample2ViewDialog];
