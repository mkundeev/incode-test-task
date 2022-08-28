export type tikersType = { ticker: string,
        exchange: 'NASDAQ',
        price: number,
        change: number,
        change_percent: number,
        dividend: number,
        yield: number,
    last_trade_time: 'string'
}
export type tikersFilterType = { [x:string]:boolean
        }[]