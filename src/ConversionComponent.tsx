interface Props {
    amount?: number,
    amountWait?: number,
    conversion?: number
}

const GWEI_TO_ETH = 1 / 1000000000;

export const ConversionComponent: React.FC<Props> = (props: Props) => {

    const { amount, amountWait, conversion } = props;

    return (
        <p>
            Safe Low: {(amount ?? 0) / 10} Gwei - {(((amount ?? 0) / 10) * GWEI_TO_ETH).toFixed(9)} Eth - {((amount ?? 0) / 10) * GWEI_TO_ETH * (conversion ?? 0)} USD<br />
            <sub>{(amountWait ?? 0) * 60} seconds</sub>
        </p>
    )
}