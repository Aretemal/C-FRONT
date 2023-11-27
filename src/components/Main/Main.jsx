import { withAuthRedirect } from "../../hoc/WithAuthRedirect.jsx";
import {Card, Image} from "antd";
import Wheel from '../../assets/images/Wheel.com.png';
import React, {useState} from "react";
import {Navigate, NavLink, redirect} from "react-router-dom";
import styles from "../Header/UserHeader/UserHeader.module.css";

function Main() {
    const [rouletteRedirect, setRouletteRedirect] = useState(false);

    if (rouletteRedirect) {
        return <Navigate to='/roulette' />
    }
    const onRedirectToRoulette = () => {
        setRouletteRedirect(true);
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                background: '#4e2c9d',
                paddingLeft: 420,
                paddingTop: 150
            }}
        >
            <Card
                style={{
                    width: 300,
                    height: 330,
                    background: 'white',
                    cursor: 'pointer'
                }}
                onClick={onRedirectToRoulette}
            >
                <Image
                    src={Wheel}
                    preview={false}
                    style={{
                        height: 240,
                        width: 240,
                    }}
                />
                <div
                    style={{
                        color: '#4e2c9d',
                        fontSize: '32px',
                        textDecoration: 'none',
                    }}
                >
                    Колесо фортуны
                </div>
            </Card>
        </div>
    )
}
export default withAuthRedirect(Main);