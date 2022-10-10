import { Layout, Menu } from "antd";
import styles from "@/assets/styles/home.module.scss";
import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Auth from "./pages/Auth";

const menuItems = [
    {
        key: "tag",
        path: "/tag",
        label: "标签",
    },
];

const RouterView = (props: any) => {
    console.log(props);
    return <div>1</div>;
};

function App(props: any) {
    console.log(props);
    const params = useParams();
    console.log(params);
    const [current, setCurrent] = useState("");
    const navigate = useNavigate();

    const onMenuChange = ({ key, item }: any) => {
        // @ts-ignore
        navigate(item.props.path);

        setCurrent(key);
    };
    return (
        <Auth>
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
                    <Layout.Content className={styles["content-wrapper"]}>
                        <Outlet></Outlet>
                    </Layout.Content>
                </Layout>
            </Layout>
        </Auth>
    );
}

export default App;
