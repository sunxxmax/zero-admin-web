import {FC, lazy, Suspense} from 'react'
import {RouteObject, RouteProps, useLocation} from 'react-router'
import {Navigate, useRoutes} from 'react-router-dom'
import Login from '@page/user/login/Login.tsx'
import LayoutPage from '@component/layout/LayoutPage.tsx'
import Empty from '@component/empty'
import {LayoutRouteProps} from "react-router/dist/lib/components";
import SuspendFallbackLoading from "@component/fallback-loading/SuspendFallbackLoading.tsx";
import {getLocalStorage} from "@util/storage.tsx";
import {TOKEN} from "@util/constant.tsx";
import Register from "@page/user/register/Register.tsx";

// 看板
const Workbench = lazy(() => import('@page/dashboard/Workbench.tsx'))

// 系统管理
const User = lazy(() => import('@page/system/User.tsx'))
const Role = lazy(() => import('@page/system/Role.tsx'))
const Dep = lazy(() => import('@page/system/Dep.tsx'))
const Job = lazy(() => import('@page/system/Job.tsx'))
const Menu = lazy(() => import('@page/system/Menu.tsx'))

// 系统配置
const Dict = lazy(() => import('@page/system/config/Dict.tsx'))
const DictType = lazy(() => import('@page/system/config/DictType.tsx'))

// 订单管理
const Purchase = lazy(() => import('@page/luke/Purchase.tsx'))
const Sales = lazy(() => import('@page/luke/Sales.tsx'))
const Partner = lazy(() => import('@page/luke/Partner.tsx'))

// 异常
const Abnormal403 = lazy(() => import('@page/abnormal/403.tsx'))
const Abnormal404 = lazy(() => import('@page/abnormal/404.tsx'))
const Abnormal500 = lazy(() => import('@page/abnormal/500.tsx'))

// 个人中心
const UserCenter = lazy(() => import('@page/user/Center.tsx'))
const UserSettings = lazy(() => import('@page/user/Settings.tsx'))


export interface WrapperRouteProps extends LayoutRouteProps {
    /** document title id */
    titleId: string
    /** authorization？ */
    auth?: boolean
}

const PublicRoute = (props: any) => {
    return props.element
}

const PrivateRoute: FC<RouteProps> = (props) => {
    const {pathname} = useLocation()

    const logged = getLocalStorage(TOKEN);
    return logged ? (
        pathname === '/' ? (
            <Navigate to={{pathname: `/dashboard/workbench`}} replace/>
        ) : (
            props.element
        )
    ) : (
        <Empty title="没有权限" description="您还没有登录，请先去登录" type="403"/>
    )
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({titleId, auth, ...props}) => {
    const WitchRoute = auth ? PrivateRoute : PublicRoute
    if (titleId) {
        document.title = titleId
    }
    return <WitchRoute {...props} />
}

const WrapperRouteWithOutLayoutComponent: FC<WrapperRouteProps> = ({titleId, auth, ...props}) => {
    if (titleId) {
        document.title = titleId
    }

    return <Suspense fallback={<SuspendFallbackLoading message="正在加载中"/>}>{props.element}</Suspense>
}

const routeList: RouteObject[] = [
    {
        path: '/',
        element: <WrapperRouteComponent element={<LayoutPage/>} titleId="" auth/>,
        children: [
            {
                path: 'dashboard/workbench',
                element: <WrapperRouteComponent element={<Workbench/>} titleId="工作台" auth/>
            },

            {
                path: 'system/user',
                element: <WrapperRouteComponent element={<User/>} titleId="用户管理" auth/>
            },
            {
                path: 'system/role',
                element: <WrapperRouteComponent element={<Role/>} titleId="角色管理" auth/>
            },
            {
                path: 'system/dep',
                element: <WrapperRouteComponent element={<Dep/>} titleId="部门管理" auth/>
            },
            {
                path: 'system/job',
                element: <WrapperRouteComponent element={<Job/>} titleId="岗位管理" auth/>
            },
            {
                path: 'system/menu',
                element: <WrapperRouteComponent element={<Menu/>} titleId="菜单管理" auth/>
            },

            {
                path: 'system/config/dict',
                element: <WrapperRouteComponent element={<Dict/>} titleId="字典配置" auth/>
            },
            {
                path: 'system/config/dict/type',
                element: <WrapperRouteComponent element={<DictType/>} titleId="字典类型" auth/>
            },

            {
                path: 'luke/purchase',
                element: <WrapperRouteComponent element={<Purchase/>} titleId="订单管理" auth/>
            },
            {
                path: 'luke/sales',
                element: <WrapperRouteComponent element={<Sales/>} titleId="出售管理" auth/>
            },
            {
                path: 'luke/partner',
                element: <WrapperRouteComponent element={<Partner/>} titleId="合作管理" auth/>
            },

            {
                path: 'abnormal/403',
                element: <WrapperRouteComponent element={<Abnormal403/>} titleId="403" auth/>
            },
            {
                path: 'abnormal/404',
                element: <WrapperRouteComponent element={<Abnormal404/>} titleId="404" auth/>
            },
            {
                path: 'abnormal/500',
                element: <WrapperRouteComponent element={<Abnormal500/>} titleId="500" auth/>
            },
            {
                path: 'user/center',
                element: <WrapperRouteComponent element={<UserCenter/>} titleId="用户中心页" auth/>
            },
            {
                path: 'user/settings',
                element: <WrapperRouteComponent element={<UserSettings/>} titleId="用户设置页" auth/>
            }
        ]
    },
    {
        path: 'login',
        element: <WrapperRouteWithOutLayoutComponent element={<Login/>} titleId="登录"/>
    },
    {
        path: 'register',
        element: <WrapperRouteWithOutLayoutComponent element={<Register/>} titleId="注册"/>
    },
    {
        path: '*',
        element: (
            <WrapperRouteWithOutLayoutComponent
                element={<Empty title="找不到咯" description="这里什么也没有~" type="404"/>}
                titleId="404"
            />
        )
    }
]

const RenderRouter: FC = () => {
    return useRoutes(routeList)
}

export default RenderRouter
