import { environment } from './environment';
import axios from 'axios';

export type price = number;

export type minutes = number;

export interface GasTable {
    average: number,
    avgWait: number,
    blockNum: number,
    block_time: number,
    fast: number,
    fastWait: number,
    fastest: number,
    fastestWait: number,
    gasPriceRange: Record<price, minutes>,
    safeLow: number,
    safeLowWait: number,
    speed: number
}

export interface GeckoConversionTable {
    ethereum: { usd: number }
}

export const getGas = async (): Promise<GasTable> => {
    const res = await axios.get<GasTable>(`${environment.GAS_BASE_API}${environment.GAS_TABLE_ENDPOINT}'?api-key=${environment.GAS_API_KEY}`);
    console.log(res.data)
    return res.data
}

export const getConversion = async (): Promise<GeckoConversionTable> => {
    const res = await axios.get<GeckoConversionTable>(`${environment.CONVERSION_ETH_API}?ids=ethereum&vs_currencies=usd`);
    return res.data
}