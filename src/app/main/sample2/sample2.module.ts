import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
    MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule,
    MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
    MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
    MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
    MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatMomentDateModule, } from '@angular/material-moment-adapter';
import { AutocompleteAutoActiveFirstOptionExample } from './sample2.component';
import { COMPONENT_LIST } from './sample2.component';
const routes = [
    {
        path: 'sample2',
        component: AutocompleteAutoActiveFirstOptionExample
    }
];

@NgModule({
    declarations: [
        [...COMPONENT_LIST],
        AutocompleteAutoActiveFirstOptionExample
    ],
    entryComponents: COMPONENT_LIST,
    imports: [
        RouterModule.forChild(routes),
        MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule,
        MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
        MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
        MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule,
        MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
        MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
        MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule,
        TranslateModule, MatMomentDateModule,
        FuseSharedModule,
    ],
    exports: [
        AutocompleteAutoActiveFirstOptionExample,
        MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule,
        MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
        MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
        MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule,
        MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
        MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
        MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatMomentDateModule
    ]
})

export class SampleModule2 {
}
