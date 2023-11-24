import React from 'react'
import {Button, Col, Form, Layout, Row, Typography} from '@douyinfe/semi-ui'

import Footer from "@component/footer/Footer.tsx";
import {useNavigate} from "react-router-dom";
import {registerApi} from "@util/api.tsx";

const Register: React.FC = () => {

    const {Text} = Typography;

    const navigate = useNavigate()

    const passwordValidate = (value: any, values: any) => {
        if (!value) {
            return '确认密码不能为空';
        }
        if (values.password !== value) {
            return '两次密码不一致';
        }
        return '';
    }

    const submit = async (values: any) => {
        await registerApi(values.username, values.password, values.pwd);
        navigate(`/login`);
    }


    return (
        <Layout className={'login-container'}>

            <Layout.Content className={'login-content'}>
                <Row type="flex" justify="space-around" align="middle" className={'login-form'}>
                    <Col span={6} style={{padding: '2rem', border: '1px solid var(--semi-color-border)'}}>
                        <Form labelPosition={'left'}
                              labelAlign={'left'}
                              labelWidth={100}
                            // 数据验证成功后的回调函数
                              onSubmit={values => submit(values)}
                        >
                            <h2>注册</h2>
                            <Form.Input field={'username'} label={'用户名'} placeholder={'请输入用户名'}
                                        rules={[
                                            {required: true, message: '用户名不能为空'},
                                            {min: 4, message: '用户名格式错误'},
                                        ]}
                            />
                            <Form.Input field={'password'} label={'登录密码'} placeholder={'请输入密码'}
                                        type={'password'}
                                        rules={[{required: true, message: '登录密码不能为空'},]}
                            />

                            <Form.Input field={'pwd'} label={{text: '确认密码', required: true}}
                                        placeholder={'请再次输入密码'}
                                        type={'password'}
                                        trigger='blur'
                                        validate={(fieldValue, values) => passwordValidate(fieldValue, values)}
                            />

                            <div style={{marginTop: '2rem'}}>
                                <Button htmlType='submit' block theme={'solid'}>注册</Button>
                            </div>

                            <Row type={'flex'} justify="space-between" style={{marginTop: '2rem'}}>
                                <Text>
                                    已有帐号？<Text link={{href: '/login'}}>登录</Text>
                                </Text>

                                <Text>
                                    忘记密码？<Text link={{href: 'https://semi.design/'}}>找回密码</Text>
                                </Text>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Layout.Content>

            <Layout.Footer>
                <Footer/>
            </Layout.Footer>

        </Layout>

    )
}

export default Register
