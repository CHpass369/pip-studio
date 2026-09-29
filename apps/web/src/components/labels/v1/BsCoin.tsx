import { CSSProperties } from 'react';
import { useSelector } from 'react-redux';

import './BsCoin.scss';

const style: CSSProperties = {
  // '-webkit-user-select': 'none',
  // '-moz-user-select': 'none',
  // '-ms-user-select': 'none',
  userSelect: 'none',
};

interface BsCoinProps {
  value: number | string;
}

const BsCoin = ({ value }: BsCoinProps) => {
  const { settings } = useSelector((state: any) => state.settings);
  const round = settings?.round ?? 2;

  let str;

  if (!isNaN(value as number) && !isNaN(parseFloat(value as string))) {
    const formatted = (value as number).toLocaleString('en-US', {
      minimumFractionDigits: round,
      maximumFractionDigits: round,
    });
    str = `${formatted} Bs`;
  } else {
    str = 'NO APPLICA';
  }

  return (
    <div className="label-1-label-coin" title={str} style={style}>
      {str}
    </div>
  );
};

interface RoundingProps {
  value: number;
}

const Rounding = ({ value }: RoundingProps) => {
  return (
    <div className="label-1-label-coin" style={style}>
      {`${value.toFixed(2)}`}
    </div>
  );
};

const Label = { BsCoin, Rounding };

export { Label };
