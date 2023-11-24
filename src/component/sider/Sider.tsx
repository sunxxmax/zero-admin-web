import {FC, useEffect, useMemo, useState} from 'react'
import {Layout, Nav} from '@douyinfe/semi-ui'
import {IconMember} from '@douyinfe/semi-icons'
import menuList, {MenuItem} from '@util/menus.tsx'
import {useLocation, useNavigate} from 'react-router'
import {useLocale} from '@src/locale'
import '@component/layout/LayoutPage.css'
import {useAppContext} from "@component/context";

function renderIcon(icon: any) {
    if (!icon) {
        return null
    }
    return icon.render()
}

function findMenuByPath(menus: MenuItem[], path: string, keys: any[]): any {
    for (const menu of menus) {
        if (menu.path === path) {
            return [...keys, menu.itemKey]
        }
        if (menu.items && menu.items.length > 0) {
            const result = findMenuByPath(menu.items, path, [...keys, menu.itemKey])
            if (result.length === 0) {
                continue
            }
            return result
        }
    }
    return []
}

const Sider: FC = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const {formatMessage} = useLocale()
    const [openKeys, setOpenKeys] = useState<string[]>([])
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const {locale} = useAppContext()

    /**
     * 递归菜单
     * @param menuList 菜单列表
     */
    const menuRecursion: any = (menuList: MenuItem[]) => {
        return menuList.map(e => {
            return {
                ...e,
                text: formatMessage({id: e.text}),
                icon: e?.icon ? renderIcon(e.icon) : null,
                items: e?.items ? menuRecursion(e.items) : []
            }
        })
    }

    const navList = useMemo(() => {
        return menuRecursion(menuList)
    }, [menuList, locale])

    const onSelect = (data: any) => {
        setSelectedKeys([...data.selectedKeys])
        navigate(data.selectedItems[0].path as string)
    }
    const onOpenChange = (data: any) => {
        setOpenKeys([...data.openKeys])
    }

    // setSelectedKeys 和 path 双向绑定
    useEffect(() => {
        const keys: string[] = findMenuByPath(menuList, pathname, [])
        setSelectedKeys([keys.pop() as string])
        setOpenKeys(Array.from(new Set([...openKeys, ...keys])))
    }, [pathname])

    return (
        <Layout.Sider style={{backgroundColor: 'var(--semi-color-bg-1)'}}>
            <Nav
                items={navList}
                limitIndent={false}
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                onSelect={onSelect}
                onOpenChange={onOpenChange}
                style={{maxWidth: 220, height: '100%'}}
                header={{
                    logo: <IconMember style={{fontSize: 32}}/>,
                    text: 'Zero Admin'
                }}
                footer={{
                    collapseButton: true
                }}
            />
        </Layout.Sider>
    )
}

export default Sider
