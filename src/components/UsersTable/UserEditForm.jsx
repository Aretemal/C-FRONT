import React, {useLayoutEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hook/hook";
import {Input, Modal, Form, Col, Row, Tag, Checkbox, Space, Button, Alert} from "antd";
import {requestUserUpdate} from "../../api/api.js";
import {getToken} from "../../store/slices/selectors/authSelectors.js";

import {getAllUsersForAdmin} from "../../store/slices/thunks/adminUsersThunks";
import { NotificationManager } from "react-notifications";

export default function UserEditForm({
  isModalOpen,
  modalData = {},
  onCancel,
  userId,
}) {
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    const token = useAppSelector(getToken);

    const {
        firstName: defaultFirstName,
        lastName: defaultLastName,
        login: defaultLogin,
        email: defaultEmail,
        balance: defaultBalance,
        role: defaultRole,
    } = modalData;

    const onFinish = async (values) => {
        const {
            firstName,
            lastName,
            login,
            email,
            balance,
        } = values;

        const newData = {}

        if (!(firstName === defaultFirstName)) newData.firstName = firstName;
        if (!(lastName === defaultLastName)) newData.lastName = lastName;
        if (!(login === defaultLogin)) newData.login = login;
        if (!(email === defaultEmail)) newData.email = email;
        if (!(+balance === +defaultBalance)) newData.balance = balance;

        const res = await requestUserUpdate({
           id: userId, token, data: newData,
        });
        if (res?.data?.status === 'Success') {
            dispatch(getAllUsersForAdmin({
                token, size: 20, page: 1,
            }));
            NotificationManager.success('Пользователь успешно изменен');
        }
        onCancel();
    }

    useLayoutEffect(() => {
        form.setFields([
            {
                name: 'firstName',
                value: defaultFirstName
            },
            {
                name: 'lastName',
                value: defaultLastName
            },
            {
                name: 'login',
                value: defaultLogin
            },
            {
                name: 'email',
                value: defaultEmail
            },
            {
                name: 'balance',
                value: defaultBalance
            },
            {
                name: 'role',
                value: defaultRole
            },
        ]);
    }, [
        defaultLogin,
        defaultLastName,
        defaultFirstName,
        defaultEmail,
        defaultBalance,
        defaultRole,
    ])
    return (
        <Modal
            title={`Пользователь ${defaultLogin}`}
            open={isModalOpen}
            footer={true}
            destroyOnClose={true}
            onCancel={onCancel}
        >
            <Form
                form={form}
                layout="horizontal"
                style={{ width: 700, marginTop: 20 }}
                initialValues={{
                    firstName: defaultFirstName,
                    lastName: defaultLastName,
                    login: defaultLogin,
                    email: defaultEmail,
                    balance: +defaultBalance,
                }}
                onFinish={onFinish}
            >
                <Row>
                <Form.Item
                    label="First name"
                    name="firstName"
                >
                    <Input style={{ width: "150px" }}/>
                </Form.Item>
                <Form.Item
                    label="Last name"
                    name="lastName"
                    style={{ marginLeft: 16 }}
                >
                    <Input style={{ width: "150px" }}/>
                </Form.Item>
                </Row>
                <Form.Item
                    label="Login"
                    name="login"
                >
                    <Input style={{ width: "300px" }}/>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input style={{ width: "300px" }}/>
                </Form.Item>
                <Form.Item
                    label="Balance"
                    name="balance"
                >
                    <Input
                        type="number"
                        style={{ width: "300px" }}
                    />
                </Form.Item>
                <div>
                    <span>Type: </span>
                    <Tag style={{ marginLeft: 6, fontSize: 14 }} color="cyan" >{defaultRole}</Tag>
                </div>
                <Form.Item style={{ marginTop: 30, marginLeft: 370, marginBottom: -20 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    )
}