import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule, } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { fuseConfig } from 'app/fuse-config';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { SampleModule2 } from 'app/main/sample2/sample2.module';
import { DaftarMenuModule } from 'app/main/daftarmenu/daftarmenu.module';
import { PenggunaModule } from 'app/main/pengguna/pengguna.module';
import { PembeliModule } from 'app/main/pembeli/pembeli.module';
import { PengeluarankasModule } from 'app/main/pengeluarankas/pengeluarankas.module';
import { PerkiraanModule } from 'app/main/perkiraan/perkiraan.module';
import { PembayaranModule } from 'app/main/pembayaran/pembayaran.module';

import { ApiService } from './services/api.service';

const appRoutes: Routes = [
    {
        path: '**',
        redirectTo: 'sample'
    }
];

@NgModule({

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            // toast-top-full-width
            //top-Right
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            closeButton: true,
        }),

        HttpClientModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        AngularFireStorageModule,
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        SampleModule2,
        DaftarMenuModule,
        PenggunaModule,
        PembeliModule,
        PengeluarankasModule,
        PerkiraanModule,
        PembayaranModule,


    ],
    declarations: [
        AppComponent,
    ],
    providers: [ApiService],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
