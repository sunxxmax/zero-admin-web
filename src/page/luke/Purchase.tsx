import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Divider, Form, Modal, Row, Space, Table} from "@douyinfe/semi-ui";
import {usePagination} from "@src/hooks/usePagination.tsx";
import {dict4TypeApi, partnerListApi, purchaseCreateApi, purchasePageApi} from "@util/api.tsx";
import {useTable} from "@src/hooks/useTable.tsx";
import {format} from 'date-fns'
import {truncateString} from "@util/utils.tsx";
import {IconDelete, IconMore} from "@douyinfe/semi-icons";

const Purchase: React.FC = () => {

    const [data, loading, setData, setLoading] = useTable();
    const [pagination, setPagination] = usePagination();

    const [createVisible, setCreateVisible] = useState<boolean>(false);
    const [createConfirmLoading, _setCreateConfirmLoading] = useState<boolean>(false);
    const [createFormApi, setCreateFormApi] = useState<any>(null)
    const [statusList, _setStatusList] = useState([])
    const [partnerList, setPartnerList] = useState([])
    const [platformList, setPlatformList] = useState([]);

    let pageLoading = (page: number, size: number) => {
        setLoading(true)
        purchasePageApi(page, size)
            .then((data: any) => {
                return {
                    data: data.content.map((entity: any) => {
                        return {
                            key: entity.id,
                            no: entity.no,
                            name: entity.name,
                            num: entity.num,
                            price: entity.price,
                            payable: entity.payable,
                            paid: entity.paid,
                            buyerName: entity.buyer.name,
                            channel: entity.channel,
                            status: entity.status,
                            buyAt: entity.buyAt,
                            transport: entity.transport
                        }
                    }),
                    total: data.numberOfElements,
                }
            })
            .then((result: any) => {
                setData(result.data)
                setPagination({page: pagination.page, size: pagination.size, total: result.total})
            })
            .finally(() => {
                setLoading(false)
            });
    }

    // 使用 useEffect 来异步获取表格数据
    useEffect(() => {
        pageLoading(pagination.page, pagination.size);
    }, [])

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '数量',
            dataIndex: 'num',
        },
        {
            title: '价格',
            dataIndex: 'price',
        },
        {
            title: '应付金额',
            dataIndex: 'payable',
        },
        {
            title: '实付金额',
            dataIndex: 'paid',
        },
        {
            title: '购买用户',
            dataIndex: 'buyerName',
        },
        {
            title: '购入渠道',
            dataIndex: 'channel',
        },
        {
            title: '订单号',
            dataIndex: 'no',
            // ellipsis: { showTitle: false },
            render: (text: any) => {
                return truncateString(text, 8);
            },
        },
        {
            title: '状态',
            dataIndex: 'status',
        },
        {
            title: '订单时间',
            dataIndex: 'buyAt',
        },
        {
            title: '运输方式',
            dataIndex: 'transport',
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

    const pageChange = (page: number) => {
        pageLoading(page, pagination.size);
    };

    const btn4Add = async () => {
        // 合作伙伴
        partnerListApi()
            .then((data: any) => {
                return data.map((entity: any) => {
                    return {
                        otherKey: entity.id,
                        label: entity.name,
                        value: entity.id
                    }
                });
            })
            .then((data: any) => {
                setPartnerList(data);
            })
            .then(() => dict4TypeApi(1).then((data: any) => {
                return data.map((entity: any) => {
                    return {
                        otherKey: entity.id,
                        label: entity.name,
                        value: entity.name
                    }
                });
            }))
            .then((data: any) => {
                setPlatformList(data);
            })
            .then(() => setCreateVisible(true))

    }

    const submit4Add = async () => {
        const handlerData = (values: any) => {
            return {
                no: values.no,
                name: values.name,
                num: values.num,
                price: values.price,
                payable: values.payable,
                paid: values.paid,
                buyer: values.buyer,
                channel: values.channel,
                buyAt: format(values.buyAt, "yyyy-MM-dd HH:mm:ss"),
                transport: values.transport
            };
        }
        await createFormApi.validate()
            .then(async (values: any) => {
                let data = handlerData(values);
                await purchaseCreateApi(data)
                    .then(() => {
                        setCreateVisible(false);
                        pageLoading(pagination.page, pagination.size);
                    });
            });
    }

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
                            <Button onClick={btn4Add}>添加</Button>
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
                       onPageChange: pageChange,
                   }}
            />

            <Modal
                key={"modal-add"}
                title="添加合作伙伴"
                visible={createVisible}
                closeOnEsc={true}
                onCancel={() => setCreateVisible(false)}
                confirmLoading={createConfirmLoading}
                onOk={submit4Add}
            >
                <Form labelPosition={'left'}
                      labelAlign={'right'}
                      wrapperCol={{span: 16}}
                      labelCol={{span: 6}}

                      getFormApi={(formApi) => setCreateFormApi(formApi)}>

                    <Form.Input label={'订单号'} field='no' placeholder='请输入订单号' rules={[
                        {required: true, message: '订单号不能为空'}
                    ]}/>
                    <Form.Input label={'商品名称'} field='name' placeholder='请输入商品名称' rules={[
                        {required: true, message: '商品名称不能为空'}
                    ]}/>
                    <Form.InputNumber label={'商品数量'} field='num' placeholder='请输入商品数量'
                                      defaultValue={1}
                                      min={1}
                                      rules={[
                                          {required: true, message: '商品数量不能为空'}
                                      ]}/>

                    <Form.InputNumber label={'商品单价'} field='price' placeholder='请输入商品单价'
                                      min={0}
                                      precision={2}
                                      prefix={'￥'}
                                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                      parser={value => value.replace(/(,*)/g, '')}
                                      rules={[
                                          {required: true, message: '商品单价不能为空'}
                                      ]}/>

                    <Form.InputNumber label={'应付金额'} field='payable' placeholder='请输入应付金额'
                                      min={0}
                                      precision={2}
                                      prefix={'￥'}
                                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                      parser={value => value.replace(/(,*)/g, '')}
                                      rules={[
                                          {required: true, message: '应付金额不能为空'}
                                      ]}/>
                    <Form.InputNumber label={'实付金额'} field='paid' placeholder='请输入实付金额'
                                      min={0}
                                      precision={2}
                                      prefix={'￥'}
                                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                      parser={value => value.replace(/(,*)/g, '')}
                                      rules={[
                                          {required: true, message: '实付金额不能为空'}
                                      ]}/>

                    <Form.Select label={'购买人'} field='buyer' placeholder='请选择购买人' optionList={partnerList}
                                 rules={[
                                     {required: true, message: '购买人不能为空'}
                                 ]}/>

                    <Form.Select label={'购买渠道'} field='channel' placeholder='请选择购买渠道'
                                 optionList={platformList}
                                 rules={[
                                     {required: true, message: '购买渠道不能为空'}
                                 ]}/>

                    <Form.DatePicker type="dateTime" density="compact" label={'购买时间'} field='buyAt'
                                     placeholder='请输入购买时间'
                                     format={'yyyy-MM-dd HH:mm:ss'}
                                     rules={[
                                         {required: true, message: '购买时间不能为空'}
                                     ]}/>

                    <Form.Input label={'运送方式'} field='transport' placeholder='请输入运送方式' rules={[
                        {required: true, message: '运送方式不能为空'}
                    ]}/>

                </Form>
            </Modal>
        </div>
    )
}

export default Purchase
