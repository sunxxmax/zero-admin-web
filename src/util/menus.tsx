import {
    IconGallery,
    IconShoppingBag,
    IconUserSetting,
    IconUser
} from '@douyinfe/semi-icons'
import React from 'react'

export interface MenuItem {
    itemKey: string
    text: string
    icon?: any
    path?: string
    items?: MenuItem[]
    component?: React.ComponentType<any>
}

const MENU_CONFIG: MenuItem[] = [
    {
        itemKey: '1',
        text: 'app.menu.dashboard',
        icon: IconGallery,
        items: [
            {
                itemKey: '1-1',
                text: 'app.menu.dashboard.workbench',
                path: '/dashboard/workbench'
            },
        ]
    },
    {
        itemKey: '2',
        text: 'app.menu.system',
        icon: IconUserSetting,
        items: [
            {
                itemKey: '2-1',
                text: 'app.menu.system.user',
                path: '/system/user'
            },
            {
                itemKey: '2-2',
                text: 'app.menu.system.role',
                path: '/system/role'
            },
            {
                itemKey: '2-3',
                text: 'app.menu.system.dep',
                path: '/system/dep'
            },
            {
                itemKey: '2-4',
                text: 'app.menu.system.job',
                path: '/system/job'
            },
            {
                itemKey: '2-5',
                text: 'app.menu.system.menu',
                path: '/system/menu'
            },
            {
                itemKey: '2-6',
                text: 'app.menu.system.config',
                items: [
                    {
                        itemKey: '2-6-1',
                        text: 'app.menu.system.config.dict',
                        path: '/system/config/dict'
                    },
                    {
                        itemKey: '2-6-2',
                        text: 'app.menu.system.config.dictType',
                        path: '/system/config/dict/type'
                    }
                ]
            }
        ]
    },
    {
        itemKey: '3',
        text: 'app.menu.luke',
        icon: IconShoppingBag,
        items: [
            {
                itemKey: '3-1',
                text: 'app.menu.luke.purchase',
                path: '/luke/purchase'
            },
            {
                itemKey: '3-2',
                text: 'app.menu.luke.sales',
                path: '/luke/sales'
            },
            {
                itemKey: '3-3',
                text: 'app.menu.luke.partner',
                path: '/luke/partner'
            },
        ]
    },
    // {
    //     itemKey: '3',
    //     text: 'app.menu.list',
    //     icon: IconGridRectangle,
    //     items: [
    //         {
    //             itemKey: '3-1',
    //             text: 'app.menu.list.search',
    //             path: '/list/search'
    //         },
    //         {
    //             itemKey: '3-2',
    //             text: 'app.menu.list.inquire',
    //             path: '/list/inquire'
    //         },
    //         {
    //             itemKey: '3-3',
    //             text: 'app.menu.list.standard',
    //             path: '/list/standard'
    //         },
    //         {
    //             itemKey: '3-4',
    //             text: 'app.menu.list.card',
    //             path: '/list/card'
    //         }
    //     ]
    // },
    // {
    //     itemKey: '4',
    //     text: 'app.detail',
    //     icon: IconApps,
    //     items: [
    //         {
    //             itemKey: '4-1',
    //             text: 'app.detail.basic',
    //             path: '/detail/basic'
    //         },
    //         {
    //             itemKey: '4-2',
    //             text: 'app.detail.advanced',
    //             path: '/detail/advanced'
    //         }
    //     ]
    // },
    // {
    //     itemKey: '5',
    //     text: 'app.result',
    //     icon: IconTickCircle,
    //     items: [
    //         {
    //             itemKey: '5-1',
    //             text: 'app.result.success',
    //             path: '/result/success'
    //         },
    //         {
    //             itemKey: '5-2',
    //             text: 'app.result.failed',
    //             path: '/result/failed'
    //         }
    //     ]
    // },
    // {
    //     itemKey: '6',
    //     text: 'app.abnormal',
    //     icon: IconAlertTriangle,
    //     items: [
    //         {
    //             itemKey: '6-1',
    //             text: 'app.abnormal.403',
    //             path: '/abnormal/403'
    //         },
    //         {
    //             itemKey: '6-2',
    //             text: 'app.abnormal.404',
    //             path: '/abnormal/404'
    //         },
    //         {
    //             itemKey: '6-3',
    //             text: 'app.abnormal.500',
    //             path: '/abnormal/500'
    //         }
    //     ]
    // },
    {
        itemKey: '7',
        text: 'app.user',
        icon: IconUser,
        items: [
            {
                itemKey: '7-1',
                text: 'app.user.center',
                path: '/user/center'
            },
            {
                itemKey: '7-2',
                text: 'app.user.settings',
                path: '/user/settings'
            }
        ]
    },
]

export default MENU_CONFIG
