import React, { useState } from "react";
import { price } from "./api-request";

interface Props {
    amount?: number,
    amountWait?: number,
    conversion: number,
    lookupTable: Record<price, number>
}

const GWEI_TO_ETH = 1 / 1000000000;

export const ConversionComponent: React.FC<Props> = (props: Props) => {

    const { amount, amountWait, conversion, lookupTable } = props;
    const [gweiState, setGweiState] = useState<string>(`${(amount ?? 0) / 10}`);
    const [ethState, setEthState] = useState<string>((((amount ?? 0) / 10) * GWEI_TO_ETH).toFixed(9));
    const [usdState, setUsdState] = useState<string>(`${((amount ?? 0) / 10) * GWEI_TO_ETH * conversion}`);
    const [waitState, setWaitState] = useState(`${(amountWait ?? 0) * 60}`);

    const findNearest = (value: number): number => {
        const nearest = Object.keys(lookupTable).map(x => Number(x)).reduce((prev: number, curr: number) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
        return lookupTable[nearest] * 60;
    }

    const onGweiChange = (e: React.FormEvent<HTMLInputElement>) => {
        setGweiState(e.currentTarget.value);
        setEthState((Number(e.currentTarget.value) * GWEI_TO_ETH).toFixed(9))
        setUsdState(`${Number(e.currentTarget.value) * GWEI_TO_ETH * conversion}`)
        setWaitState(`${findNearest(Number(e.currentTarget.value) * 10)}`)
    }

    const onEthChange = (e: React.FormEvent<HTMLInputElement>) => {
        setGweiState(`${Number(e.currentTarget.value) / GWEI_TO_ETH}`);
        setEthState(e.currentTarget.value)
        setUsdState(`${Number(e.currentTarget.value) * conversion}`)
        setWaitState(`${findNearest(Number(e.currentTarget.value) / GWEI_TO_ETH)}`)
    }

    const onUsdChange = (e: React.FormEvent<HTMLInputElement>) => {
        setGweiState(`${Number(e.currentTarget.value) / conversion / GWEI_TO_ETH}`);
        setEthState((Number(e.currentTarget.value) / conversion).toFixed(9))
        setUsdState(e.currentTarget.value)
        setWaitState(`${findNearest(Number(e.currentTarget.value) / conversion / GWEI_TO_ETH)}`)
    }

    return (
        <p>
            <input value={gweiState} onChange={onGweiChange} /> Gwei - <input value={ethState} onChange={onEthChange} /> Eth - <input value={usdState} onChange={onUsdChange} /> USD<br />
            <sub>~{waitState} seconds</sub>
        </p>
    )
}