import { Layout, Menu, MenuProps } from "antd";
import styles from "@/assets/styles/home.module.scss";
import { useState } from "react";
import { Route, useNavigate } from "react-router-dom";

const menuItems = [
    {
        key: "tag",
        path: "/tag",
        label: "标签",
    },
];

const Home = () => {
    const [current, setCurrent] = useState("");
    const navigate = useNavigate();

    const onMenuChange = ({ key, item }: any) => {
        // @ts-ignore
        navigate(item.props.path);

        setCurrent(key);
    };
    return (
        <>
            <Layout className={styles["home-wrapper"]}>
                <Layout.Sider theme="light">
                    <Menu
                        items={menuItems}
                        mode="inline"
                        onClick={onMenuChange}
                        selectedKeys={[current]}
                    ></Menu>
                </Layout.Sider>
                <Layout>
                    <Layout.Header style={{ background: "white" }}>
                        Header
                    </Layout.Header>
                    <Layout.Content>
                        <Route path="*"></Route>
                    </Layout.Content>
                </Layout>
            </Layout>
        </>
    );
};

export default Home;
