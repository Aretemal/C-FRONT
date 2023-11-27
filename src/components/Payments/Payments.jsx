import {withAuthRedirect} from "../../hoc/WithAuthRedirect.jsx";
import {Button, Card, Col, Form, Input, Modal, Space} from "antd";
import React, {useEffect, useState} from "react";
import {getBalance, updateBalance} from "../../store/slices/thunks/paymentsThunks";
import {useAppDispatch, useAppSelector} from "../../hook/hook";
import {getToken} from "../../store/slices/selectors/authSelectors";
import {getBalanceFromStore} from "../../store/slices/selectors/paymentsSelectors";
import styles from "./Payments.module.css";
import {NotificationManager} from "react-notifications";

function Payments() {
    const dispatch = useAppDispatch();

    const [form] = Form.useForm();

    const token = useAppSelector(getToken);
    const balance = useAppSelector(getBalanceFromStore);

    const [modalOpen, setModalOpen] = useState({});

    const createPayment = async ({ total }) => {
        const amount = modalOpen?.isAdd ? total : -total;
        await dispatch(updateBalance({ token, amount }));
        dispatch(getBalance({ token }));
        NotificationManager.success(modalOpen?.isAdd ? 'Баланс пополнен успешно'
            : 'Заявка на вывод создана');
        setModalOpen({});
    }

    useEffect(() => {
        dispatch(getBalance({ token }));
    }, [token]);

    return (
        <>
        <div style={{
            background: '#4e2c9d',
        }}>
         <Col
             className={styles.container}
             span={13}
             style={{
                 borderRadius: '15px',
                 width: '100%',
                 height: '100vh',
                 marginLeft: '22%',
                 paddingTop: '282px',
                 paddingLeft: '126px'
             }}
         >
             <Card
               style={{
                 color: 'white',
                 border: 'none',
                 background: '#995ccd',
                 width: '600px',
                 height: '130px',
                 paddingTop: 6,
               }}>
                 <span style={{ marginLeft: 90, fontSize: '40px' }}>Ваш баланс: {+balance} BYN</span>
             </Card>
            <button
                className={styles.but}
                onClick={() => {}}
                style={{
                    width: '122px',
                    height: '42px',
                    borderRadius: '15px',
                    background: '#995ccd',
                    marginRight: 24,
                    marginLeft: 8,
                    marginTop: 14,
                }}
            >
                История поп.
            </button>
            <button
                className={styles.but}
                onClick={() => setModalOpen({ modalOpen: true, isAdd: true })}
                style={{
                    width: '122px',
                    height: '42px',
                    borderRadius: '15px',
                    background: '#995ccd',
                    marginRight: 32,
                }}
            >
                Пополнить
            </button>
            <button
                className={styles.but}
                onClick={() => setModalOpen({ modalOpen: true, isAdd: false })}
                style={{
                    width: '122px',
                    height: '42px',
                    borderRadius: '15px',
                    background: 'white',
                    color: '#995ccd',
                    marginRight: 28,
                }}
            >
                Вывести
            </button>
            <button
                className={styles.but}
                onClick={() => {}}
                style={{
                    width: '126px',
                    height: '42px',
                    borderRadius: '15px',
                    background: 'white',
                    color: '#995ccd',
                }}
            >
                История выв.
            </button>
             <Card
                 style={{
                     color: 'white',
                     border: 'none',
                     background: 'white',
                     marginLeft: 160,
                     marginTop: 20,
                     width: '240px',
                     height: '50px',
                 }}/>
         </Col>
        </div>
        <Modal
            open={modalOpen?.modalOpen}
            onCancel={() => setModalOpen({})}
            destroyOnClose={true}
            footer={false}
            centered={true}
            title={modalOpen?.isAdd ? 'Пополнить баланс' : 'Отправить заявку на вывод'}
            width={"400px"}
            // title={false}
        >
            <Form
                form={form}
                onFinish={createPayment}
            >
                <Form.Item
                    name="total"
                >
                    <Input placeholder="Введите сумму" style={{ width: "150px" }}/>
                </Form.Item>
                <Form.Item style={{ marginLeft: 240, marginBottom: -20, marginTop: -20 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Отправить
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}

export default withAuthRedirect(Payments);