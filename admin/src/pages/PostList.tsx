// 文章列表
import {Button, Table} from "antd";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import http from "@/http/http";

interface DataType {
    id: number;
    name: string;
}

const PostList = () => {
    const navigate = useNavigate()
    const onAdd = () => {
        navigate('/post/edit')
    }
    const onEdit = (id: number) => {
        navigate(`/post/edit?id=${id}`)
    }
    const [dataSource, setDataSource] = useState<DataType[]>([])
    const [total, setTotal] = useState(0)
    const columns: ColumnsType<DataType> = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: '标题',
            dataIndex: "title",
            key: "title",
        },
        {
            title: "操作",
            key: "action",
            render: (_, record: DataType) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => onEdit(record.id)}
                    >
                        编辑
                    </Button>
                </>
            ),
        },
    ]
    
    const fetchData = async () => {
        const res = await  http.get<any>('post/page', {
            params: pagination
        })
        setDataSource(res.content)
        setTotal(res.total)
    }
    
    const pagination = {
        page: 1,
        size: 10,
    }
    const onPaginationChange = (page: number, pageSize: number) => {
        pagination.page = page;
        pagination.size = pageSize;
        fetchData()
    }
    
    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <div>
            <div style={{marginBottom: "16px"}}>
                <Button type="primary" onClick={() => onAdd()}>
                    新增
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey={(record) => record.id}
                pagination={
                    {
                        defaultCurrent: 1,
                        onChange: onPaginationChange,
                        total: total,
                        defaultPageSize: pagination.size
                    }
                }
            ></Table>
        </div>
    )
}

export default PostList
