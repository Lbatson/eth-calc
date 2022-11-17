export enum Unit {
    WEI = '1',
    GWEI = '1000000000',
    ETH = '1000000000000000000',
}

export type CaculatorState = {
    number: string
    operator: string
    unit: Unit
}