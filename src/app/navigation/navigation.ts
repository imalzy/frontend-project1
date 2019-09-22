import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'daftarmenu',
                title    : 'Daftar Menu',
                translate: 'NAV.DETAIL.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/listmenu',
                badge    : {
                    title    : '25',
                    translate: 'NAV.DETAIL.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
                
            },
            {
                id       : 'sample2',
                title    : 'Sample2',
                translate: 'NAV.SLIDE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample2',
                // badge    : {
                //     title    : '1',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
                
            },
            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'NAV.PROMO.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
                // badge    : {
                //     title    : '1',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
        ]
    },
    {
        id       : 'User',
        title    : 'User',
        translate: 'USER.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'User',
                title    : 'User',
                translate: 'USER.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample3',
                // badge    : {
                //     title    : '0',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
                
            },
            
        ]
    }
];
