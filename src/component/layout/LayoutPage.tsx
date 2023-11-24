import React, {Suspense} from 'react'
import {Layout} from '@douyinfe/semi-ui'
import Header from '@component/header/Header.tsx'
import Sider from '@component/sider/Sider.tsx'
import Footer from '@component/footer/Footer.tsx'
import {Outlet} from 'react-router-dom'
import SuspendFallbackLoading from '@component/fallback-loading/SuspendFallbackLoading.tsx'

import './LayoutPage.css'

const LayoutPage: React.FC = () => {
    return (
        <Layout className="layout-page">
            <Sider/>
            <Layout>
                <Header/>
                <Layout.Content className="layout-content">
                    <Suspense fallback={<SuspendFallbackLoading message="正在加载中"/>}>
                        <Outlet/>
                    </Suspense>
                </Layout.Content>
                <Footer/>
            </Layout>
        </Layout>
    )
}

export default LayoutPage
