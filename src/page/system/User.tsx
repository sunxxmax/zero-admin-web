import React, {useEffect} from 'react'
import {Divider, Table} from "@douyinfe/semi-ui";
import {IconDelete, IconMore} from '@douyinfe/semi-icons';

import {usePagination} from "@src/hooks/usePagination.tsx";
import {userPageApi} from "@util/api.tsx";
import {useTable} from "@src/hooks/useTable.tsx";

const User: React.FC = () => {

    const [data, loading, setData, setLoading] = useTable();
    const [pagination, setPagination] = usePagination();

    let pageLoading = async (page: number, size: number) => {
        setLoading(true)
        userPageApi(page, size)
            .then((data: any) => {
                return {
                    data: data.content.map((entity: any) => {
                        return {
                            key: entity.id,
                            username: entity.username,
                            phone: '13000000000',
                            createBy: '系统管理员',
                            createTime: '2020-02-02 05:13',
                        }
                    }),
                    total: data.totalElements,
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

    const pageChange = (page: number) => pageLoading(page, pagination.size);

    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '手机号码',
            dataIndex: 'phone',
        },
        {
            title: '创建人',
            dataIndex: 'createBy',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
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
        </div>
    )
}

export default User
