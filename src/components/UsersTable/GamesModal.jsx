import React, {useEffect, useLayoutEffect, useState,} from "react";
import {useAppDispatch, useAppSelector} from "../../hook/hook";
import { Modal, Table } from "antd";
import {requestGames, requestPayments,} from "../../api/api.js";
import {getToken} from "../../store/slices/selectors/authSelectors.js";
import moment from "moment";

export default function GamesModal({
  isModalOpen,
  modalData = {},
  onCancel,
  userId,
}) {
    const token = useAppSelector(getToken);

    const [games, setGames] = useState([])

    const {
        login: defaultLogin,
    } = modalData;

    const columns = [
        {
            dataIndex: ['id'],
            width: 120,
            title: 'ID',
            sorter: (a, b) => +a.id - +b.id,
        },
        {
            dataIndex: ['attributes', 'game'],
            title: 'Игра',
            width: 120,
        },
        {
            dataIndex: ['attributes', 'selected'],
            title: 'Выбран',
            width: 120,
        },
        {
            dataIndex: ['attributes', 'amount'],
            title: 'Ставка',
            width: 120,
            render: (amount) => {
                return +amount >= 0 ?
                    <span style={{ color: 'green' }}>{amount}</span>
                    : <span style={{ color: 'red' }}>{amount}</span> ;
            },
            sorter: (a, b) => +a?.attributes?.amount - +b?.attributes?.amount,
        },
        {
            dataIndex: ['attributes', 'result'],
            title: 'Результат',
            width: 120,
        },
        {
            dataIndex: ['attributes', 'created'],
            title: 'Дата',
            width: 220,
            render: (created) => {
                return moment(created).format('DD-MM-YYYY');
            },
            sorter: (a, b) => {
                return moment(a).isBefore(moment(b));
            },
        }
    ]

    useEffect(() => {
        async function fetchPayments() {
            if (userId !== 0) {
                const res = await requestGames({ token, id: userId })
                setGames(res?.data?.data);
            }
        }
        fetchPayments();
    }, [userId]);

    return (
        <Modal
            title={`Пользователь ${defaultLogin} (история игр)`}
            open={isModalOpen}
            footer={true}
            destroyOnClose={true}
            onCancel={onCancel}
            width={800}
        >
            <Table
                columns={columns}
                dataSource={games}
            />
        </Modal>
    )
}