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
  Pemborong_CreateHome(Nama: string, nik: string, alamat: string, no_telpon: string): Observable<any> {
    console.log(Nama);
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
  ListHome() {
    return this.http.get(this.BaseURL + 'welcome/')
      .pipe(map(response => {
        return response;
      }));
  }



  ListSppr() {
    return this.http.get(this.BaseURL + 'sppr/')
      .pipe(map(response => {
        return response;
      }));
  }
  Sppr_CreateSppr(post_tipe: string, post_harga: string, post_tanah: string,
    post_pagar: string,
    post_tambahan: string, post_potongan: string, post_book: string,
    post_dp: string, post_idPembeli: string): Observable<any> {
    let opt: RequestOptions;
    const headers = new Headers();
    const formData: FormData = new FormData();

    formData.append('post_tipe', post_tipe);
    formData.append('post_harga', post_harga);
    formData.append('post_tanah', post_tanah);
    formData.append('post_pagar', post_pagar);
    formData.append('post_tambahan', post_tambahan);
    formData.append('post_potongan', post_potongan);
    formData.append('post_book', post_book);
    formData.append('post_dp', post_dp);
    formData.append('post_idPembeli', post_idPembeli);

    return this.http.post(this.BaseURL + 'welcome/tambahsurat/', formData).pipe(
      map(response => {
        return response;
      })
    );
  }

  ListSurat() {
    return this.http.get(this.BaseURL + 'surat/')
      .pipe(map(response => {
        return response;
      }));
  }

  Surat_CreateSurat(pst_nosurat: string, pst_idpemborong: string, pst_tglsurat: string, pst_pekerjaan: string,
    pst_proyek: string, pst_nilai: string, pst_pelaksanaan: string,
    pst_awlpekerjaan: string, pst_akhirpekerjaan: string,
    pst_carabayar: string): Observable<any> {
    let opt: RequestOptions;
    const headers = new Headers();
    const formData: FormData = new FormData();

    formData.append('nomor_surat', pst_nosurat);
    formData.append('id_pemborong', pst_idpemborong);
    formData.append('tgl_surat', pst_tglsurat);
    formData.append('pekerjaan', pst_pekerjaan);
    formData.append('proyek', pst_proyek);
    formData.append('total_nilai', pst_nilai);
    formData.append('waktu_pelaksanaan', pst_pelaksanaan);
    formData.append('awal_pekerjaan', pst_awlpekerjaan);
    formData.append('akhir_pekerjaan', pst_akhirpekerjaan);
    formData.append('cara_pembayaran', pst_carabayar);

    return this.http.post(this.BaseURL + 'welcome/tambahsurat/', formData).pipe(
      map(response => {
        return response;
      })
    );
  }
  //Pemborong Method
  Pemborong_CreatePemborong(Nama: string, nik: string, alamat: string, no_telpon: string): Observable<any> {
    console.log(Nama);
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
  Pemborong_DeletePemborong(id_pemborong: string): Observable<any> {
    let opt: RequestOptions;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    opt = new RequestOptions({
      headers: headers
    });

    return this.http.get(this.BaseURL + 'pemborong/hapus/' + id_pemborong)
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

  listNama() {
    return this.http.get(this.BaseURL + 'welcome/getnama')
      .pipe(map(response => {
        console.log(response);
        return response;
      }));
  }

  listPengguna() {
    return this.http.get(this.BaseURL + 'pengguna/')
      .pipe(map(response => {
        console.log(response);
        return response;
      }));
  }

  listpembeli() {
    return this.http.get(this.BaseURL + 'pembeli/')
      .pipe(map(response => {
        return response;
      }));
  }
  Pembeli_CreatePembeli(nama_pembeli: string,
    ktp_pembeli: string, pekerjaan_pembeli: string,
    alamat_pembeli: string, kantor_pembeli: string,
    informasi_pembeli: string,
    alamat_lain: string): Observable<any> {
    console.log(nama_pembeli, ktp_pembeli, pekerjaan_pembeli, alamat_pembeli, kantor_pembeli, informasi_pembeli, alamat_lain);
    let opt: RequestOptions;
    const headers = new Headers();
    const formData: FormData = new FormData();

    formData.append('nama_pembeli', nama_pembeli);
    formData.append('ktp_pembeli', ktp_pembeli);
    formData.append('pekerjaan_pembeli', pekerjaan_pembeli);
    formData.append('alamat_pembeli', alamat_pembeli);
    formData.append('kantor_pembeli', kantor_pembeli);
    formData.append('informasi_pembeli', informasi_pembeli);
    formData.append('alamat_lain', alamat_lain);

    return this.http.post(this.BaseURL + 'pembeli/tambahpembeli/', formData)
      .pipe(map(response => {
        console.log(response);
        return response;
      }));
  }

  Pengguna_CreatePengguna(Name: string, Level: string, Username: string, Password: string, Gender: string): Observable<any> {
    let opt: RequestOptions;
    const headers = new Headers();
    const formData: FormData = new FormData();

    formData.append('Name', Name);
    formData.append('Level', Level);
    formData.append('Username', Username);
    formData.append('Password', Password);
    formData.append('Gender', Gender);

    return this.http.post(this.BaseURL + 'pengguna/buatpengguna/', formData)
      .pipe(map(response => {
        return response;
      }));
  }
}
