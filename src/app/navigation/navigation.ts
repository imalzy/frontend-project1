import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'daftarmenu',
                title: 'SPMK',
                translate: 'NAV.DETAIL.TITLE',
                type: 'item',
                icon: 'home',
                url: '/spmk',
                // badge: {
                //     title: '',
                //     translate: 'NAV.DETAIL.BADGE',
                //     bg: '#F44336',
                //     fg: '#FFFFFF'
                // }

            },
            {
                id: 'sample2',
                title: 'DATA PEMBORONG',
                translate: 'NAV.SLIDE.TITLE',
                type: 'item',
                icon: 'supervisor_account',
                url: '/pemborong',
                // badge    : {
                //     title    : '1',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }

            },
            {
                id: 'sample',
                title: 'SPPR',
                translate: 'NAV.PROMO.TITLE',
                type: 'collapsable',
                icon: 'border_all',
                children: [
                    {
                        id: 'pembeli',
                        title: 'Pembeli',
                        type: 'item',
                        icon: 'supervisor_account',
                        url: '/pembeli',
                    },

                    {
                        id: 'sppr',
                        title: 'Surat SPPR',
                        type: 'item',
                        icon: 'email',
                        url: '/sppr',
                    }
                ]
            },
        ]
    },
    {
        id: 'User',
        title: 'User',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'User',
                title: 'PENGGUNA',
                translate: 'NAV.SLIDE.TITLE',
                type: 'item',
                icon: 'email',
                url: '/pengguna',
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
