import React, {useEffect, useLayoutEffect, useState,} from "react";
import {useAppDispatch, useAppSelector} from "../../hook/hook";
import { Modal, Table } from "antd";
import {requestPayments, } from "../../api/api.js";
import {getToken} from "../../store/slices/selectors/authSelectors.js";
import moment from "moment";

export default function PaymentsModal({
  isModalOpen,
  modalData = {},
  onCancel,
  userId,
}) {
    const token = useAppSelector(getToken);

    const [payments, setPayments] = useState([])

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
            dataIndex: ['attributes', 'amount'],
            title: 'Изменение',
            width: 120,
            render: (amount) => {
                return +amount >= 0 ?
                    <span style={{ color: 'green' }}>{amount}</span>
                    : <span style={{ color: 'red' }}>{amount}</span> ;
            },
            sorter: (a, b) => +a?.attributes?.amount - +b?.attributes?.amount,
        },
        {
            dataIndex: ['attributes', 'newBalance'],
            title: 'Баланс',
            width: 120,
            sorter: (a, b) => +a?.attributes?.newBalance - +b?.attributes?.newBalance,
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
                const res = await requestPayments({ token, id: userId })
                setPayments(res?.data?.data);
            }
        }
        fetchPayments();
    }, [userId]);

    return (
        <Modal
            title={`Пользователь ${defaultLogin} (история баланса)`}
            open={isModalOpen}
            footer={true}
            destroyOnClose={true}
            onCancel={onCancel}
            width={800}
        >
            <Table
                columns={columns}
                dataSource={payments}
            />
        </Modal>
    )
}