import {Button, Table} from "antd";
import React, {useLayoutEffect, useState} from "react";
import {getAllUsersForAdmin} from "../../store/slices/thunks/adminUsersThunks";
import {useAppDispatch, useAppSelector} from "../../hook/hook";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect.jsx";
import UserEditForm from "./UserEditForm.jsx";
import PaymentsModal from "./PaymentsModal.jsx";
import * as PropTypes from "prop-types";
import GamesModal from "./GamesModal.jsx";
import getDataForLine from "../../utils/getDataForLine.js";

function UsersTable() {
    const dispatch = useAppDispatch();

    const { users } = useAppSelector((state) => state.aUsers);
    const { token } = useAppSelector((state) => state.auth);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isPaymentsOpen, setPaymentsOpen] = useState(false);
    const [isGamesOpen, setGamesOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [userId, setUserId] = useState(null);


    const onRow = (record) => ({
        onClick: () => {
            setModalData(record?.attributes);
            setUserId(record?.id);
        }
    });

    const onPayments = () => {
        setPaymentsOpen(true);
    }

    const columnsForAdminUsers = [
        {
            title: 'ID',
            dataIndex: ['id'],
            key: 'ID',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Login',
            dataIndex: ['attributes', 'login'],
            key: 'login',
        },
        {
            title: 'Имя',
            dataIndex: ['attributes'],
            key: 'name',
            render: (attributes, row) => {
                const firstName = attributes?.firstName == 'undefined' ? '' : attributes?.firstName;
                const lastName = attributes?.lastName == 'undefined' ? '' : attributes?.lastName;
                return <span>{firstName} {lastName}</span>
            }
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: ['attributes', 'email'],
        },
        {
            title: 'Баланс',
            key: 'balance',
            dataIndex: ['attributes', 'balance'],
            sorter: (a, b) => a?.attributes?.balance - b?.attributes?.balance,
        },
        {
            title: 'Действия',
            key: 'actions',
            dataIndex: ['type'],
            render: () => {
                return (
                    <>
                        <Button
                            onClick={() => setModalOpen(true)}
                        >
                            Редактировать
                        </Button>
                        <Button
                            onClick={() => setPaymentsOpen(true)}
                            style={{ marginLeft: 4 }}
                        >
                            Платежи
                        </Button>
                        <Button
                            style={{ marginLeft: 4 }}
                            onClick={() => setGamesOpen(true)}
                        >
                            Игры
                        </Button>
                    </>
                )
            }
        },
    ]
    const onCancel = () => {
        setModalData({});
        setModalOpen(false);
        setPaymentsOpen(false);
        setGamesOpen(false);
        setUserId(null);
    }

    useLayoutEffect(() => {
        dispatch(getAllUsersForAdmin({
            token, size: 20, page: 1,
        }));
    }, []);

    return (
        <div
            style={{
                paddingTop: 70,
            }}
        >
            <div
                style={{
                    fontSize: 20,
                    color: "black",
                    marginLeft: '20%',
                    marginBottom: -80,
                }}
            >
                Users table
            </div>
            <Table
                style={{
                    marginTop: '100px',
                    width: '1000px',
                    marginLeft: '18%',
                    marginBottom: '1000px'
            }}
                columns={columnsForAdminUsers}
                dataSource={users}
                onRow={onRow}
            />
            <UserEditForm
                isModalOpen={isModalOpen}
                modalData={modalData}
                onCancel={onCancel}
                userId={userId}
            />
            <PaymentsModal
                isModalOpen={isPaymentsOpen}
                modalData={modalData}
                onCancel={onCancel}
                userId={userId}
            />
            <GamesModal
                isModalOpen={isGamesOpen}
                modalData={modalData}
                onCancel={onCancel}
                userId={userId}
            />
        </div>
    )
}

export default withAuthRedirect(UsersTable);