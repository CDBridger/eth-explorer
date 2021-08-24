import { environment } from './environment';
import axios from 'axios';

export interface GasTable {
    average: number,
    avgWait: number,
    blockNum: number,
    block_time: number,
    fast: number,
    fastWait: number,
    fastest: number,
    fastestWait: number,
    gasPriceRange: Record<number, number>,
    safeLow: number,
    safeLowWait: number,
    speed: number
}

export interface ConversionTable {
    data: {
        symbol: string,
        name: string,
        amount: number,
        last_updated: string,
        quote: {
            [currency: string]: {
                price: number,
                last_updated: string
            }
        }
    },
    status: {
        error_code: string
    }
}

export const getGas = async (): Promise<GasTable> => {
    const res = await axios.get<GasTable>(`${environment.GAS_BASE_API}${environment.GAS_TABLE_ENDPOINT}'?api-key=${environment.GAS_API_KEY}`);
    return res.data
}

// export const getConversion = async (): Promise<ConversionTable> => {
//     const res = await axios.get<ConversionTable>(environment.CONVERSION_ETH_API, {
//         params: {
//             'CMC_PRO_API_KEY': environment.CONVERSION_ETH_API,
//             amount: 1,
//             symbol: 'ETH',
//             convert: 'USD'
//         },   
//         // headers: {
//         //     'Access-Control-Allow-Headers': ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
//         //     "Access-Control-Allow-Origin": "*"
//         // }
//     })
//     console.log(res);
//     return res.data
// }

export const getConversion = async (): Promise<ConversionTable> => {
    const res = await axios.get<ConversionTable>('https://api.coinmarketcap.com/data-api/v3/tools/price-conversion?amount=1&convert=2781&id=1027');
    if (res.data.status.error_code === '500') {
        throw Error('Failed to get conversion rates');
    }
    return res.data
}