import React, { type FunctionComponent } from "react";
import type { CustomCellRendererProps } from "ag-grid-react";
import "../styles/TickerCellRenderer.css";

export const TickerCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  data,
}) => {
  return (
    <div className="tickerContainer">
      <img
        src={`https://www.ag-grid.com/example/finance/logos/${data.ticker}.png`}
        alt={data.ticker}
      />
      <b>{data.ticker}</b>
    </div>
  );
};
