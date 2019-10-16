import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'sample',
                title: 'Surat SPMK',
                translate: 'NAV.PROMO.TITLE',
                type: 'collapsable',
                icon: 'border_all',
                children: [
                    {
                        id: 'sample2',
                        title: 'Data Pemborong',
                        translate: 'NAV.SLIDE.TITLE',
                        type: 'item',
                        icon: 'supervisor_account',
                        url: '/pemborong',
                    },

                    {
                        id: 'daftarmenu',
                        title: 'Surat SPMK',
                        translate: 'NAV.DETAIL.TITLE',
                        type: 'item',
                        icon: 'email',
                        url: '/spmk',
                    }
                ]
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
                        title: 'Data Pembeli',
                        type: 'item',
                        icon: 'supervisor_account',
                        url: '/pembeli',
                    },
                    {
                        id: 'pembayaran',
                        title: 'Pembayaran / Cicilan',
                        type: 'item',
                        icon: 'money',
                        url: '/pembayaran',
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
            {
                id: 'accounting',
                title: 'ACCOUNTING',
                translate: 'NAV.DETAIL.TITLE',
                type: 'item',
                icon: 'insert_chart',
                url: '#',
            },
            {
                id: 'pengeluaran_kas',
                title: 'PENGELUARAN KAS',
                translate: 'NAV.DETAIL.TITLE',
                type: 'item',
                icon: 'insert_chart',
                url: '#',
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
                icon: 'supervisor_account',
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
