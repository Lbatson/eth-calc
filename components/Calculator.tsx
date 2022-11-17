import { ChangeEvent, useState } from 'react';
import { CaculatorState, Unit } from '../utils/Types';
import { calculateFromQueue, convertUnit } from '../utils/Helpers';
import Button from '../components/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import styles from '../styles/Calculator.module.css'

const numbers = [9,8,7,6,5,4,3,2,1,'ac',0,'.'];
const operators = ['/', 'x', '-', '+', '='];
const initialState: CaculatorState = { number: '0', operator: '', unit: Unit.ETH };
let queue: string[] = [];
let hasDecimal = false;

export default function Main() {
  const [values, setValues] = useState<CaculatorState>(initialState);

  const parseDecimal = (value: string) => {
    const isDecimal = value == '.';

    if (hasDecimal && isDecimal) {
      return '';
    }

    hasDecimal = hasDecimal || isDecimal;
    return value;
  }

  const calculate = () => {
    const result = calculateFromQueue(queue);
    clear({ ...values, number: result.toString(), operator: '=' }, !result.isInteger());
  }

  const clear = (newState: CaculatorState = initialState, hasDecimal = false) => {
    queue = [];
    hasDecimal = false
    setValues(newState);
  }

  const handleClear = () => {
    clear();
  }

  const handleConversion = (newUnit: string) => {
    console.log('unit', values.unit);
    console.log('newUnit:', newUnit);
    const number = convertUnit(values.number, values.unit, newUnit).toString();
    setValues({ ...values, number, unit: newUnit as Unit });
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value
    setValues({ ...values, number })
  }

  const handleNumberClick = (value: string) => {
    let number = parseDecimal(value);

    if (values.number && values.operator) {
      hasDecimal = false;
      queue.push(values.number, values.operator);
      setValues({ ...values, number: value, operator: '' });
    } else {
      if (values.operator == '=') {
        setValues({ ...values, number, operator: '' });
      } else {
        number = values.number != '0' ? values.number + number : number;
        setValues({ ...values, number });
      }
    }
  };

  const handleOperatorClick = (operator: string) => {
    if (operator == '=') {
      queue.push(values.number);
      calculate();
    } else {
      setValues({ ...values, operator });
    }
  }

  return (
    <Grid container direction="row" spacing={1} className={styles.calculator}>
      <Grid item xs={12}>
        <TextField fullWidth value={values.number} onChange={handleChange} />
      </Grid>
      <Grid container item direction="column" xs={10}>
        <Grid container item justifyContent="space-between" flexWrap="nowrap">
          <Grid flexBasis="33%">
            <Button text="eth" value={Unit.ETH} onClick={handleConversion} />
          </Grid>
          <Grid flexBasis="33%">
          <Button text="gwei" value={Unit.GWEI} onClick={handleConversion} />
          </Grid>
          <Grid flexBasis="33%">
          <Button text="wei" value={Unit.WEI} onClick={handleConversion} />
          </Grid>
        </Grid>
        <Grid container item justifyContent="space-between" flexBasis="33%" className={styles.numbers}>
          {numbers.map((n) => (
            <Grid key={n} item flexBasis="33%">
              <Button text={n.toString()} value={n.toString()} onClick={n == 'ac' ? handleClear : handleNumberClick} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container item direction="column" justifyContent="start" xs={2}>
        {operators.map((o) => <Button key={o} text={o.toString()} value={o.toString()} onClick={handleOperatorClick} />)}
      </Grid>
      <div className={styles.gradient}></div>
    </Grid>
  )
}
