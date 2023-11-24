import React, {useEffect, useState} from "react";
import {
    Button,
    ButtonGroup,
    Col, Divider,
    Form, Modal, Row,
    Space,
    Table,
} from "@douyinfe/semi-ui";
import {useModal} from "@src/hooks/useModal.tsx";
import {useTable} from "@src/hooks/useTable.tsx";
import {usePagination} from "@src/hooks/usePagination.tsx";
import {IconDelete, IconMore} from "@douyinfe/semi-icons";
import {dictTypePageApi} from "@util/api.tsx";


const DictType: React.FC = () => {

    const [data, loading, setData, setLoading] = useTable();
    const [pagination, setPagination] = usePagination();

    const [_key, _setKey, visible, setVisible, _setModal] = useModal();

    const [_formApi4Add, setFormApi4Add] = useState<any>(null)

    let pageLoading = (page: number, size: number) => {
        setLoading(true)
        dictTypePageApi(page, size)
            .then((data: any) => {
                return {
                    data: data.content.map((entity: any) => {
                        return {
                            key: entity.id,
                            name: entity.name,
                            code: entity.code,
                            sort: entity.sort,
                            fixed: entity.fixed,
                        }
                    }),
                    total: data.numberOfElements,
                }
            })
            .then((result: any) => {
                setData(result.data)
                setPagination({page: pagination.page, size: pagination.size, total: result.total})
            })
            .finally(() => setLoading(false));
    }

    // 使用 useEffect 来异步获取表格数据
    useEffect(() => {
        pageLoading(pagination.page, pagination.size);
    }, [])

    const handlePageChange = (page: number) => {
        pageLoading(page, pagination.size);
    };

    const handler4Add = async () => {
        setVisible(true);
    }

    const handleCancel4Add = () => setVisible(false)

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '编码',
            dataIndex: 'code',
        },
        {
            title: '排序',
            dataIndex: 'sort',
        },
        {
            title: '是否固定',
            dataIndex: 'fixed',
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
                        </Row>
                    </Col>

                    <Col span={4}>
                        <Space>
                            <ButtonGroup>
                                <Button type="primary" htmlType="submit">搜索</Button>
                                <Button htmlType="reset">重置</Button>
                            </ButtonGroup>
                            <Button onClick={handler4Add}>添加</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>

            {/*数据表格*/}
            <Table key={'sales'}
                   loading={loading}
                   columns={columns}
                   dataSource={data}
                   pagination={{
                       currentPage: pagination.page,
                       pageSize: pagination.size,
                       total: pagination.total,
                       onPageChange: handlePageChange,
                   }}
            />

            {/*弹出框-新增*/}
            <Modal
                key={'modal-add'}
                title={'创建字典类型'}
                visible={visible}
                onCancel={() => handleCancel4Add()}>
                <Form
                    labelPosition={'left'}
                    labelAlign={'right'}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 16}}
                    getFormApi={(formApi) => setFormApi4Add(formApi)}
                >

                    <Form.Input label={'类型名称'} field='method' placeholder='请输入类型名称'
                                rules={[
                                    {required: true, message: '类型名称不能为空'}
                                ]}/>

                    <Form.Input label={'类型编码'} field='stall' placeholder='请输入类型编码'
                                rules={[
                                    {required: true, message: '类型编码不能为空'}
                                ]}/>
                    <Form.InputNumber label={'排序'} field='loss' placeholder='请输入排序'
                                      defaultValue={1} min={1}
                                      rules={[
                                          {required: true, message: '排序不能为空'}
                                      ]}/>
                </Form>
            </Modal>
        </div>
    )
}

export default DictType
