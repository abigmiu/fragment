import { Card, Form, Input, Button } from "antd";
import styles from "@/assets/styles/loginPage.module.scss";
const LoginPage = () => {
    return (
        <div className={styles["login-page-wrapper"]}>
            <Card className={styles["login-page"]}>
                <h1>登录</h1>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                    <Form.Item label="邮箱" name="account">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="密码" name=" password">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginPage;
