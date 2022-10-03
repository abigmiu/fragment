import { useEffect, useState } from "react";
import { Button, Input, Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import http from "@/http/http";

interface DataType {
    id: number;
    name: string;
}

const Tag = () => {
    const [dataSource, setDateSource] = useState<DataType[]>([]);

    const [delModalVisible, setDelModalVisible] = useState(false);
    const [delId, setDelId] = useState(0);
    const onDel = (id: number) => {
        setDelId(id);
        setDelModalVisible(true);
    };

    const [contentModalVisible, setContentModalVisible] = useState(false);
    const [content, setContent] = useState("");
    const [contentId, setContentId] = useState(0);
    const onAddBtn = () => {
        setContentId(0);
        setContent("");
        setContentModalVisible(true);
    };
    const onEditBtn = (id: number, content: string) => {
        setContent(content);
        setContentId(id);
        setContentModalVisible(true);
    };
    const onConfirm = async () => {
        console.log(contentId);

        if (!contentId) {
            console.log("新增");
            await http.post("tag", {
                name: content,
            });
        } else {
            console.log("更新");
            await http.patch(`tag/${contentId}`, {
                name: content,
            });
        }

        fetchData();

        setContentModalVisible(false);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "名字",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "操作",
            key: "action",
            render: (_, record: DataType) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => onEditBtn(record.id, record.name)}
                    >
                        编辑
                    </Button>
                </>
            ),
        },
    ];
    const fetchData = async () => {
        const res = await http.get<DataType[]>("tag");
        setDateSource(res);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div style={{ marginBottom: "16px" }}>
                <Button type="primary" onClick={() => onAddBtn()}>
                    新增
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                rowKey={(record) => record.id}
            ></Table>

            <Modal
                title="删除"
                onCancel={() => setDelModalVisible(false)}
                open={delModalVisible}
            >
                <p>确定删除这条数据</p>
            </Modal>

            <Modal
                title="编辑"
                open={contentModalVisible}
                onCancel={() => setContentModalVisible(false)}
                onOk={() => onConfirm()}
            >
                <Input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></Input>
            </Modal>
        </div>
    );
};

export default Tag;
