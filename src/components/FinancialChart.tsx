import React, { useMemo } from "react";

// Types
import { FinancialChartProps } from "../utils/types";

// AG Charts Imports
import { AgFinancialCharts } from "ag-charts-react";
import { AgFinancialChartOptions } from "ag-charts-enterprise";

const FinancialChart: React.FC<FinancialChartProps> = ({ selectedRow }) => {
  const options = useMemo<AgFinancialChartOptions>(() => {
    return {
      data: selectedRow ? selectedRow.detailedPriceHistory : [],
      title: selectedRow
        ? selectedRow.ticker
        : "Select a ticker to see detailed price history",
      height: 500,
    };
  }, [selectedRow]);

  return <AgFinancialCharts options={options} />;
};

export default FinancialChart;
