import React from 'react';
import DublImage from '../../assets/images/DublImage.png';
import {Col, Image, Input, Form, Row} from "antd";
import {useAppDispatch, useAppSelector} from "../../hook/hook";
import {getToken} from "../../store/slices/selectors/authSelectors.js";

const getDegree = (result) => {
    switch (`${result}`) {
        case '32': return 360;
        case '15': return 350;
        case '19': return 340;
        case '4': return 330;
        case '21': return 320;
        case '2': return 310;
        case '25': return 300;
        case '17': return 290;
        case '34': return 280;
        case '6': return 270;
        case '27': return 260;
        case '13': return 250;
        case '36': return 240;
        case '11': return 230;
        case '30': return 220;
        case '8': return 210;
        case '23': return 200;
        case '10': return 190;
        case '5': return 180;
        case '24': return 170;
        case '16': return 160;
        case '33': return 150;
        case '1': return 140;
        case '20': return 130;
        case '14': return 120;
        case '31': return 110;
        case '9': return 100;
        case '22': return 90;
        case '18': return 80;
        case '29': return 70;
        case '7': return 60;
        case '28': return 50;
        case '12': return 40;
        case '35': return 30;
        case '3': return 20;
        case '26': return 10;
        case '0': return 0;
    }
}

const Roulette = ({
  onSelectNumber, isWin, result,
}) => {
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();

    const token = useAppSelector(getToken);

  return (
      <Row>
      <Row
          style={{
              width: '60%',
              minWidth: '740px',
              height: 500,
              background: 'linear-gradient(180deg, rgba(49, 64, 68, 0.70) 0%, rgba(22, 22, 22, 0.70) 99.22%)',
              marginLeft: '20%',
              borderRadius: '15px',
              marginTop: 120,
          }}
      >
          <Col>
          <Image
              src={DublImage}
              preview={false}
          />
          </Col>
          <Col>
              <Form
                  form={form}
                  style={{
                      marginTop: 200
                  }}
              >
                  <Form.Item
                      name="amount"
                  >
                    <Input
                        style={{
                            height: '44px',
                            color: '#B8B8B8',
                            fontSize: '14px',
                            fontWeight: '500',
                            borderRadius: '6px',
                            border: '1px solid #585A5C',
                            background: '#2C3136',
                            cursor: 'pointer',
                            boxShadow: 'none',
                            verticalAlign: 'middle',
                        }}
                        preview={false}
                    />
                  </Form.Item>
              </Form>
          </Col>
      </Row>
      </Row>
  );
};

export default Roulette;
