import {withAuthRedirect} from "../../hoc/WithAuthRedirect.jsx";
import {useEffect, useLayoutEffect, useState} from "react";
import {getAllUsersForAdmin} from "../../store/slices/thunks/adminUsersThunks.ts";
import {useAppDispatch, useAppSelector} from "../../hook/hook.ts";
import {getToken} from "../../store/slices/selectors/authSelectors.js";
import getDataForLine from "../../utils/getDataForLine.js";
import { Column, Line } from '@ant-design/plots';
import {Card, Row} from "antd";
import {requestPayments} from "../../api/api.js";
import getDataForPayments from "../../utils/getDataPayments.js";

function ChartLineCreator({ data = [], title = '' }) {

    const configForLine = {
        data,
        xField: 'date',
        yField: 'users',
        maxColumnWidth: 40,
        height: 250,
    };

    return (
        <>
            <Card
                style={{
                    height: 350,
                    width: 500,
                    marginTop: 20,
                    marginRight: 20,
                }}
                title={title}
            >
                {configForLine.data.length ? <Line {...configForLine} /> : null}
            </Card>
        </>
    )
}

function ChartColumnCreator({ data = [], title = '' }) {

    const configForColumn = {
        data,
        xField: 'date',
        yField: 'value',
        seriesField: 'type',
        maxColumnWidth: 40,
        isGroup: true,
        height: 250,
    };

    return (
        <>
            <Card
                style={{
                    height: 350,
                    width: 500,
                    marginTop: 20,
                    marginRight: 20,
                }}
                title={title}
            >
                {configForColumn.data.length ? <Column {...configForColumn} /> : null}
            </Card>
        </>
    )
}

function AdminCharts() {
    const dispatch = useAppDispatch();

    const { users } = useAppSelector((state) => state.aUsers);
    const token = useAppSelector(getToken);

    const [dataUsersRegistration, setDataUsersRegistration] = useState([]);
    const [payments, setPayments] = useState([]);
    const [dataPayments, setDataPayments] = useState([]);

    useLayoutEffect(() => {
        dispatch(getAllUsersForAdmin({
            token,
        }));
    }, []);

    useEffect(() => {
        const data = getDataForLine(users, 'users');
        setDataUsersRegistration(data);
    }, [users, token]);

    useEffect(() => {
        async function fetchPayments() {
                const res = await requestPayments({ token })
                setPayments(res?.data?.data);
        }
        fetchPayments();
    }, [token]);

    useEffect(() => {
        const data = getDataForPayments(payments, 'value');
        setDataPayments(data);
    }, [payments, token]);

    return (
        <Row gutter={[16, 16]} style={{ marginLeft: 250, marginTop: 50 }}>
            <ChartLineCreator
                data={dataUsersRegistration}
                title={"Статистика по зарегестрированным пользователям"}/>
            <ChartColumnCreator
                data={dataPayments}
                title={"Статистика по денежным операциям"}/>
        </Row>
    )
}

export default withAuthRedirect(AdminCharts)