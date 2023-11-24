import {FC} from 'react'
import {Layout, Nav, Button, Avatar, Badge, Dropdown, RadioGroup, Radio} from '@douyinfe/semi-ui'
import {IconBell, IconHelpCircle} from '@douyinfe/semi-icons'
import Breadcrumb from '@src/component/breadcrumb'
import Tags from '@src/component/tags'
import '@component/layout/LayoutPage.css'
import {useAppContext} from "@component/context";
import {getLocalStorage, removeLocalStorage} from "@util/storage.tsx";
import {TOKEN, USER} from "@util/constant.tsx";
import {useNavigate} from "react-router-dom";

const Header: FC = () => {

    const {locale, toggleLocale} = useAppContext();
    const navigate = useNavigate();

    const selectLocale = (locale: 'zh_CN' | 'en_GB') => {
        toggleLocale(locale);
    }

    const question = () => {
        window.open('https://github.com/xieyezi/semi-design-pro/issues')
    }

    const logout = () => {
        removeLocalStorage(TOKEN)
        navigate(`/login`);
    }

    const username = (): string => {
        let username = getLocalStorage(USER);
        return username ? username : '未知';
    }

    return (
        <Layout.Header className="layout-header">
            <Nav
                mode="horizontal"
                header={<Breadcrumb/>}
                footer={
                    <>
                        <Button
                            theme="borderless"
                            icon={<IconHelpCircle size="large"/>}
                            style={{
                                color: 'var(--semi-color-text-2)',
                                marginRight: '12px'
                            }}
                            onClick={question}
                        />
                        <Badge count={5} type="danger">
                            <Button
                                theme="borderless"
                                icon={<IconBell/>}
                                style={{
                                    color: 'var(--semi-color-text-2)',
                                    marginRight: '12px'
                                }}
                            />
                        </Badge>

                        <Dropdown
                            render={
                                <Dropdown.Menu>
                                    <Dropdown.Item>个人中心</Dropdown.Item>
                                    <Dropdown.Item>个人设置</Dropdown.Item>
                                    <Dropdown.Item onClick={logout}>退出登录</Dropdown.Item>
                                </Dropdown.Menu>
                            }
                        >
                            <Avatar color="orange" size="small">{username()}</Avatar>
                        </Dropdown>

                        <RadioGroup type="button" defaultValue={locale} style={{marginLeft: '20px'}}>
                            <Radio value={'zh_CN'} onChange={() => selectLocale('zh_CN')}>
                                中文
                            </Radio>
                            <Radio value={'en_GB'} onChange={() => selectLocale('en_GB')}>
                                EN
                            </Radio>
                        </RadioGroup>
                    </>
                }
            ></Nav>
            <Tags/>
        </Layout.Header>
    )
}

export default Header
