import React, {useEffect, useMemo, useState} from "react";
import {
    Button,
    ButtonGroup,
    Col, Form, InputNumber, Row,
    SideSheet,
    Space,
    Table, Toast,
} from "@douyinfe/semi-ui";
import {useModal} from "@src/hooks/useModal.tsx";
import {useTable} from "@src/hooks/useTable.tsx";
import {usePagination} from "@src/hooks/usePagination.tsx";
import Section from "@douyinfe/semi-ui/lib/es/form/section";
import {
    dict4TypeApi,
    purchaseUsableApi,
    salesCreateApi,
    salesDetailApi,
    salesFinishedApi,
    salesPageApi,
    salesPaybackApi
} from "@util/api.tsx";
import {ColumnProps} from "@douyinfe/semi-ui/lib/es/table";


const Sales: React.FC = () => {

    const [data, loading, setData, setLoading] = useTable();
    const [pagination, setPagination] = usePagination();

    const [_key, _setKey, visible, setVisible, setModal] = useModal();

    // 详情 state
    const [showKey, _setShowKey, showVisible, setShowVisible, setShowModal] = useModal();
    const [showData, showLoading, setShowData, _setShowLoading] = useTable();
    const [showColumnKey, setShowColumnKey] = useState(null);

    //
    const [purchases, setPurchases] = useState();
    const [stallList, setStallList] = useState();

    const [selectedValue, setSelectedValue] = useState<[]>([]);
    const [formApi4Add, setFormApi4Add] = useState<any>(null)

    // 页面加载
    let pageLoading = (page: number, size: number) => {
        setLoading(true)
        salesPageApi(page, size)
            .then((data: any) => {
                return {
                    data: data.content.map((entity: any) => {
                        return {
                            key: entity.id,
                            no: entity.no,
                            status: entity.status,
                            totalPid: entity.totalPid,
                            totalPayback: entity.totalPayback,
                            totalRevenue: entity.totalRevenue,
                            loss: entity.loss,
                            stall: entity.stall,
                            remark: entity.remark,
                            createdAt: entity.auditMetadata?.createdAt
                        }
                    }),
                    total: data.totalElements,
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

    // 页码改动
    const pageChange = (page: number) => pageLoading(page, pagination.size);

    // 添加按钮
    const btn4Add = async () => {
        setVisible(true);

        // 获取可出售订单
        await purchaseUsableApi()
            .then((data: any) => {
                return data.map((entity: any) => {
                    return {
                        key: entity.id,
                        name: entity.name,
                        status: entity.status,
                        paid: entity.paid,
                    }
                })
            })
            .then((result: any) => setPurchases(result));

        // 档口列表
        await dict4TypeApi(2)
            .then((data: any) => {
                return data.map((entity: any) => {
                    return {
                        otherKey: entity.id,
                        label: entity.name,
                        value: entity.name
                    }
                });
            }).then((result: any) => setStallList(result));
    }

    const selection4Sales = useMemo(() => ({
            onChange: (_selectedRowKeys: any, selectedRows: any) => setSelectedValue(selectedRows)
        }), []
    );

    const submit4Add = async () => {
        await formApi4Add.validate()
            .then((values: any) => salesCreateApi({
                stall: values.stall,
                loss: values.loss,
                remark: values.remark,
                items: selectedValue.map((value: any) => {
                    return {
                        purchase: value.key,
                    }
                })
            }))
            .then(() => setModal({key: null, visible: false, loading: false}))
            .then(() => pageLoading(pagination.page, pagination.size));
    }

    const cancel4Add = () => setVisible(false)

    // 主页面 table 页面
    const columns = [
        {
            title: '出售单号',
            dataIndex: 'no',
        },
        {
            title: '状态',
            dataIndex: 'status',
        },
        {
            title: '总回款',
            dataIndex: 'totalPayback',
        },
        {
            title: '总成本',
            dataIndex: 'totalPid',
        },
        {
            title: '出售损耗',
            dataIndex: 'loss',
        },
        {
            title: '总收益',
            dataIndex: 'totalRevenue',
        },
        {
            title: '出售档口',
            dataIndex: 'stall',
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        {
            title: '出售时间',
            dataIndex: 'createdAt',
        },
        {
            title: '操作',
            dataIndex: 'operate',
            render: (_text: any, record: any) => {
                return (
                    <>
                        <ButtonGroup>
                            <Button theme='borderless' onClick={() => detail(record.key)}>明细</Button>
                            <Button theme='borderless' onClick={() => finished(record.key)}>完成</Button>
                        </ButtonGroup>
                    </>);
            },
        },
    ];

    // 弹出-可出售订单
    const columnsPurchase2Sales = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '状态',
            dataIndex: 'status',
        },
        {
            title: '实付金额',
            dataIndex: 'paid',
        }
    ];

    // 弹窗-已出售订单
    const columnsPurchase: ColumnProps[] = [
        {
            title: '名称',
            dataIndex: 'name',
        },

        {
            title: '购买用户',
            dataIndex: 'buyer',
        },
        {
            title: '购入渠道',
            dataIndex: 'channel',
        },
        {
            title: '状态',
            dataIndex: 'status',
        },
        {
            title: '实付金额',
            dataIndex: 'paid',
            render: (_text, record) => {
                return '￥' + record.paid
            }
        },
        {
            title: '回款金额',
            dataIndex: 'payback',
            width: 180,
            onCell: (record: any, _rowIndex: any) => {
                return {
                    onDoubleClick: _event => {
                        setShowColumnKey(record.key)
                    },
                };
            },
            render: (_text: any, record: any) => {
                return showColumnKey === record.key ?
                    (
                        <InputNumber defaultValue={record.payback} innerButtons={true}
                                     onEnterPress={(e: any) => savePaybackEnterPress(e.target.value, record.key, record.payback)}
                                     onBlur={(e) => savePaybackBlur(e.target.value, record.key, record.payback)}
                        />
                    ) : record.payback
            },
        },
        {
            title: '订单时间',
            dataIndex: 'buyAt',
        },
        {
            title: '运输方式',
            dataIndex: 'transport',
        },

    ];

    let salesDetailData = (id: any) => salesDetailApi(id).then((data: any) => {
        return data.items.map((entity: any) => {
            return {
                key: entity.id,
                payback: entity.payback,
                name: entity.purchase?.name,
                paid: entity.purchase?.paid,
                buyer: entity.purchase?.buyer.name,
                channel: entity.purchase?.channel,
                status: entity.purchase?.status,
                buyAt: entity.purchase?.buyAt,
                transport: entity.purchase?.transport,
            }
        });
    })

    const detail = async (id: any) => {
        setShowModal({key: id, visible: true, loading: false});
        await salesDetailData(id)
            .then((data: any) => {
                console.log(data)
                setShowData(data)
            });
    }

    const finished = async (id: any) => {
        await salesFinishedApi(id)
            .then(() => Toast.info("操作成功"))
            .then(() => pageLoading(pagination.page, pagination.size))
    }

    const savePaybackBlur = (value: any, key: any, payback: any) => {
        savePaybackEnterPress(value, key, payback);
    }
    const savePaybackEnterPress = (value: any, key: any, payback: any) => {
        setShowColumnKey(null);
        if (payback == value) {
            return;
        }
        salesPaybackApi(key, value)
            .then(() => pageLoading(pagination.page, pagination.size))
            .then(() => salesDetailData(showKey))
            .then((data: any) => setShowData(data));

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
                       currentPage: 1,
                       pageSize: 10,
                       total: 2,
                       onPageChange: pageChange,
                   }}
            />

            {/*弹出框-新增*/}
            <SideSheet
                key={'modal-add'}
                title={'创建出售单'}
                visible={visible}
                onCancel={cancel4Add}
                footer={
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button style={{marginRight: 8}} onClick={cancel4Add}>取消</Button>
                        <Button theme="solid" onClick={submit4Add} loading={false}>提交</Button>
                    </div>
                }
            >
                <Form
                    labelPosition={'top'}
                    getFormApi={(formApi) => setFormApi4Add(formApi)}
                >
                    <Section text={'出售信息'}>

                        <Form.Select label={'出货档口'} field='stall' placeholder='请选择出货档口'
                                     optionList={stallList}
                                     rules={[
                                         {required: true, message: '档口不能为空'}
                                     ]}/>
                        <Form.TextArea label={'出货说明'} field='method'
                                       placeholder='请输入出货说明（快递单号等其他描述）'
                                       rules={[
                                           {required: true, message: '出货说明不能为空'}
                                       ]}/>

                        <Form.InputNumber label={'损耗金额'} field='loss' placeholder='请输入损耗金额'
                                          min={0}
                                          initValue={0}
                                          precision={2}
                                          prefix={'￥'}
                                          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                          parser={value => value.replace(/(,*)/g, '')}
                                          rules={[
                                              {required: true, message: '损耗金额不能为空'}
                                          ]}/>
                    </Section>

                    <Section text={'待处理订单'}>
                        <Table loading={false}
                               size={'middle'}
                               columns={columnsPurchase2Sales}
                               dataSource={purchases}
                               rowSelection={selection4Sales}
                        />
                    </Section>
                </Form>
            </SideSheet>

            <SideSheet
                key={'modal-detail'}
                placement={'bottom'}
                visible={showVisible}
                onCancel={() => setShowVisible(false)}
            >
                <Table key={'detail'}
                       loading={showLoading}
                       columns={columnsPurchase}
                       dataSource={showData}
                />
            </SideSheet>
        </div>
    )
}

export default Sales
