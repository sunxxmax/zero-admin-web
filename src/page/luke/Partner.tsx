import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Divider, Form, Modal, Row, Space, Table} from "@douyinfe/semi-ui";
import {usePagination} from "@src/hooks/usePagination.tsx";
import {partnerCreateApi, partnerPageApi} from "@util/api.tsx";
import {useTable} from "@src/hooks/useTable.tsx";
import {IconDelete, IconMore} from "@douyinfe/semi-icons";

const Partner: React.FC = () => {

    const [data, loading, setData, setLoading] = useTable();
    const [pagination, setPagination] = usePagination();

    const [createVisible, setCreateVisible] = useState<boolean>(false);
    const [createConfirmLoading, setCreateConfirmLoading] = useState<boolean>(false);
    const [createFormApi, setCreateFormApi] = useState<any>(null)
    const [statusList, _setStatusList] = useState([])

    let pageLoading = (page: number, size: number) => {
        partnerPageApi(page, size)
            .then((data: any) => {
                let total = data.totalElements
                let list: any[] = data.content.map((entity: any) => {
                    return {
                        key: entity.id,
                        name: entity.name,
                        phone: entity.phone,
                        address: entity.address,
                        status: entity.status,
                        createdAt: entity.auditMetadata?.createdAt,
                        createdBy: entity.auditMetadata?.createdBy?.username,
                        lastModifiedBy: entity.auditMetadata?.lastModifiedBy?.username,
                        lastModifiedAt: entity.auditMetadata?.lastModifiedAt,
                    }
                });
                return {
                    data: list,
                    total: total,
                }
            })
            .then((result: any) => {
                setData(result.data)
                setPagination({page: page, size: pagination.size, total: result.total})
            })
            .finally(() => setLoading(false));
    }

    // 使用 useEffect 来异步获取表格数据
    useEffect(() => {
        pageLoading(pagination.page, pagination.size);
    }, [])

    const handlePageChange = (page: number) => {
        setLoading(true)
        pageLoading(page, pagination.size);
    };

    const handleOk = () => {
        createFormApi.validate().then(
            async (values: any) => {
                await partnerCreateApi({name: values.name, address: values.address, phone: values.phone});
                setCreateVisible(false);
                pageLoading(pagination.page, pagination.size);
            }
        ).finally(() => {
            setCreateConfirmLoading(false);
        });
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '电话',
            dataIndex: 'phone',
        },
        {
            title: '地址',
            dataIndex: 'address',
        },
        {
            title: '状态',
            dataIndex: 'status',
        },
        {
            title: '创建人',
            dataIndex: 'createdBy',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
        },
        {
            title: '更新人',
            dataIndex: 'lastModifiedBy',
        },
        {
            title: '更新时间',
            dataIndex: 'lastModifiedAt',
        },
        {
            title: '操作',
            dataIndex: 'operate',
            render: () => {
                return (<>
                    <IconDelete/>
                    <Divider layout="vertical" margin='12px'/>
                    <IconMore style={{color: 'var(--semi-color-primary)'}}/>
                </>);
            },
        },
    ];

    return (
        <div>
            <Form labelPosition='inset'>
                <Row style={{backgroundColor: 'white', marginBottom: '1rem'}} type={'flex'} align={"middle"}>
                    <Col span={20}>
                        <Row type={'flex'} gutter={{xs: 8, sm: 16, md: 24}} style={{margin: '0 1rem'}}>
                            <Col>
                                <Form.Input label='平台' field={'name'}/>
                            </Col>

                            <Col>
                                <Form.Select label='状态' field='status' placeholder="请选择状态"
                                             optionList={statusList} showClear={true}/>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={4}>
                        <Space>
                            <ButtonGroup>
                                <Button type="primary" htmlType="submit">搜索</Button>
                                <Button htmlType="reset">重置</Button>
                            </ButtonGroup>
                            <Button onClick={() => setCreateVisible(true)}>添加</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>

            <Table loading={loading}
                   columns={columns}
                   dataSource={data}
                   pagination={{
                       currentPage: pagination.page,
                       pageSize: pagination.size,
                       total: pagination.total,
                       onPageChange: handlePageChange,
                   }}
            />

            <Modal
                key={'partner-add'}
                title="添加合作伙伴"
                visible={createVisible}
                closeOnEsc={true}
                onCancel={() => setCreateVisible(false)}
                confirmLoading={createConfirmLoading}
                onOk={handleOk}
            >
                <Form labelPosition={'left'}
                      labelAlign={'right'}
                      labelCol={{span: 6}}
                      wrapperCol={{span: 16}}

                      getFormApi={(formApi) => setCreateFormApi(formApi)}>

                    <Form.Input label={'姓名'} field='name' placeholder='请输入姓名' rules={[
                        {required: true, message: '姓名不能为空'}
                    ]}/>
                    <Form.Input label={'地址'} field='address' placeholder='请输入地址' rules={[
                        {required: true, message: '地址不能为空'}
                    ]}/>
                    <Form.Input label={'手机号码'} field='phone' placeholder='请输入手机号码' rules={[
                        {required: true, message: '手机号码不能为空'}
                    ]}/>

                </Form>
            </Modal>
        </div>
    )
}

export default Partner
