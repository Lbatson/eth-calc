import BigNumber from 'bignumber.js';

export const calculateFromQueue = function(queue: string[] = []): BigNumber {
    let result = new BigNumber(queue[0]);

    for (let i = 2; i < queue.length; i = i+2) {
      const number = new BigNumber(queue[i]);
      const operator = queue[i - 1];

      if (operator == '+') {
        result = result.plus(number); 
      } else if (operator == '-') {
        result = result.minus(number);
      } else if (operator == 'x') {
        result = result.multipliedBy(number);
      } else if (operator == '/') {
        result = !number.isZero() ? result.dividedBy(number) : new BigNumber(0);
      } else if (operator == '=') {
        result = number;
      }
    }

    return result;
}

export const convertUnit = function(number: string, from: string, to: string): BigNumber {
    return new BigNumber(number).multipliedBy(from).dividedBy(to);
}