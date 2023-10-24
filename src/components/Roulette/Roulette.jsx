import React, {useRef, useEffect, useState} from 'react';
import { Formik, Form, Field } from 'formik';
import styles from './Roulette.module.css';
import Wheel from './Wheel.com.png';

const Roulette = ({
  onSelectNumber, isWin, result,
}) => {
  const [isBroken, setIsBroken] = useState(true);
  let b = 1440
    let a = result*10;
    let style = {
        width: '300px',
        height: '300px',
        transition: '2s',
        transform: `rotate(${a+b}deg)`
    }
    useEffect(() => {
        setTimeout(()=> {
            console.log(12)
            setIsBroken(false)
        }, 2000)
    }, [result])
  return (
    <div className={styles.container}>
        {isBroken ? <img src={Wheel} className={`${styles.img1}`} alt="Wheel"
             style={style}/> : null}
      {isWin ? <div>{`You win ${result}`}</div> : <div>{`You lose ${result}`}</div>}
      <Formik
        initialValues={{
          selectedNumber: '',
        }}
        onSubmit={(values) => {
          onSelectNumber({
            selectedNumber: values.selectedNumber,
          });
        }}
      >
        {() => (
          <Form>
            <Field
              name="selectedNumber"
              placeholder="Select number"
            />
            <button
              type="submit"
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Roulette;
