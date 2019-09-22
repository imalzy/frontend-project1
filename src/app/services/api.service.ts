import { Injectable, Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StringifyOptions } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BaseURL = environment.BaseUrl;

  constructor(private http: Http) { }

  Auth_Login(Userlogin: string, Password: string): Observable<any> {
    let opt: RequestOptions;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    opt = new RequestOptions({
      headers: headers
    });
    const formData: FormData = new FormData();

    formData.append('Userlogin', Userlogin);
    formData.append('Password', Password);
    return this.http.post(this.BaseURL + 'Pengguna/Auth/', formData)
      .pipe(map(response => {
        return response;
      }));
  }

  Auth_Verify(token: string, UserID: string): Observable<any> {
    let opt: RequestOptions;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'nineteen ' + token);
    opt = new RequestOptions({
      headers: headers
    });

    return this.http.post(this.BaseURL + 'user/Verify/',
      JSON.stringify({ UserID: UserID }), opt)
      .pipe(map(response => {
        return response;
      }));
  }

  Auth_ListUserApps(token: string): Observable<any> {
    // let opt: RequestOptions;
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', token);
    // headers.append('Accept','application/json');
    // opt = new RequestOptions({
    //   headers: headers
    // });

    return this.http.get(this.BaseURL + 'Menu/Tampil/')
      .pipe(map(response => {
        return response;
      }));
  }

  User_CreateUser(token: string, Name: string, Level: string, Username: string, Password: string, Gender: string): Observable<any> {
    // let opt: RequestOptions;
    // const headers = new Headers();
    const formData: FormData = new FormData();

    formData.append('Name', Name);
    formData.append('Level', Level);
    formData.append('Username', Username);
    formData.append('Gender', Gender);
    formData.append('Password', Password);

    // headers.append('Authorization', token);
    // opt = new RequestOptions({
    //   headers: headers,
    // });

    return this.http.post(this.BaseURL + 'pengguna/buatpengguna/', formData)
      .pipe(map(response => {
        return response;
      }));
  }

  ListPengguna() {
    return this.http.get(this.BaseURL + '')
      .pipe(map(response => {
        return response;
      }));
  }

  ListHome() {
    return this.http.get(this.BaseURL + 'welcome/')
      .pipe(map(response => {
        return response;
      }));
  }

  ListSurat() {
    return this.http.get(this.BaseURL + 'surat/')
      .pipe(map(response => {
        return response;
      }));
  }

  //Pemborong Method
  Pemborong_CreatePemborong(Nama: string, nik: string, alamat: string, no_telpon: string): Observable<any> {
    let opt: RequestOptions;
    const headers = new Headers();
    const formData: FormData = new FormData();

    formData.append('nama_pemborong', Nama);
    formData.append('ktp', nik);
    formData.append('alamat', alamat);
    formData.append('telpon', no_telpon);

    return this.http.post(this.BaseURL + 'pemborong/tambahpemborong/', formData)
      .pipe(map(response => {
        return response;
      }));
  }
  ListPemborong() {
    return this.http.get(this.BaseURL + 'pemborong/')
      .pipe(map(response => {
        return response;
      }));
  }
}
