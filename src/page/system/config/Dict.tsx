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
import Section from "@douyinfe/semi-ui/lib/es/form/section";
import {IconDelete, IconMore} from "@douyinfe/semi-icons";
import {dictPageApi} from "@util/api.tsx";


const Dict: React.FC = () => {

    const [data, loading, setData, setLoading] = useTable();
    const [pagination, setPagination] = usePagination();

    const [_key, _setKey, visible, setVisible, _setModal] = useModal();
    const [_formApi4Add, setFormApi4Add] = useState<any>(null)

    let pageLoading = (page: number, size: number) => {
        setLoading(true)
        dictPageApi(page, size)
            .then((data: any) => {
                return {
                    data: data.content.map((entity: any) => {
                        return {
                            key: entity.id,
                            name: entity.name,
                            type: entity.type.name,
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

    const btn4Add = async () => {
    }

    const cancel4Add = () => setVisible(false)

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '类型',
            dataIndex: 'type',
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
                            <Button onClick={btn4Add}>添加</Button>
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
                title={'创建字典'}
                visible={visible}
                onCancel={cancel4Add}
            >
                <Form
                    labelPosition={'top'}
                    getFormApi={(formApi) => setFormApi4Add(formApi)}
                >
                    <Section text={'出售信息'}>


                        <Form.InputNumber label={'损耗金额'} field='loss' placeholder='请输入损耗金额'
                                          min={0}
                                          precision={2}
                                          prefix={'￥'}
                                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                          parser={value => value.replace(/(,*)/g, '')}
                                          rules={[
                                              {required: true, message: '损耗金额不能为空'}
                                          ]}/>
                    </Section>
                </Form>
            </Modal>
        </div>
    )
}

export default Dict
