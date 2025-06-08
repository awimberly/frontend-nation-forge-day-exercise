import React, { useCallback, useMemo } from "react";

// Types
import { DataGridProps, Ticker } from "../utils/types";

// AG Grid Imports
import { AgGridReact } from "ag-grid-react";
import {
  CellClassParams,
  ColDef,
  FirstDataRenderedEvent,
  GetRowIdParams,
  RowSelectionOptions,
  SelectionChangedEvent,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";

// Cell Renderers
import { TickerCellRenderer } from "./TickerCellRenderer";

// Default Col Def (Applies to All Columns)
const defaultColDef = {
  filter: true,
  flex: 1,
};

// Currency Value Formatter
const currencyFormatter = (params: ValueFormatterParams): string => {
  // TODO: Implement currency formatter (Step 2)
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(params.value);
};

// Profit And Loss Value Getter
const calculateProfitAndLoss = (params: ValueGetterParams) => {
  const { shares, averagePrice, currentPrice } = params.data as Ticker;
  const profitAndLost = shares * currentPrice - shares * averagePrice;
  return profitAndLost;
};

// Profit And Loss Cell Style
const getProfitAndLossCellStyle = (params: CellClassParams) => {
  const profitAndLost = params.value as number;
  return {
    color: profitAndLost > 0 ? "green" : "red",
    fontWeight: "bold",
  };
};

// Row Selection Options
const rowSelection = {
  mode: "single",
} as RowSelectionOptions;

// On First Data Rendered Event
const onFirstDataRendered = (params: FirstDataRenderedEvent) => {
  params.api.createRangeChart({
    cellRange: {
      columns: ["ticker", "averagePrice", "PnL"],
    },
    chartType: "treemap",
    chartThemeOverrides: {
      common: {
        title: {
          text: "Portfolio Allocation",
          enabled: true,
        },
        listeners: {
          seriesNodeClick: (event) => {
            const selectedNode = params.api.getRowNode(event.datum.ticker);
            selectedNode?.setSelected(true);
            params.api.ensureIndexVisible(selectedNode?.rowIndex ?? 0, null);
          },
        },
      },
    },
  });
};

// Set Row ID Strategy
const getRowId = (params: GetRowIdParams): string => {
  return params.data.ticker; // Use ticker as the unique identifier for each row
};

const DataGrid: React.FC<DataGridProps> = ({ data = [], setSelectedRow }) => {
  // Data To be Displayed In The Data Grid
  const rowData = useMemo<Ticker[]>(() => data, []);

  // Column Definitions
  const colDefs = useMemo<ColDef[]>(() => {
    return [
      {
        field: "ticker",
        cellRenderer: TickerCellRenderer,
      },
      {
        field: "shares",
      },
      {
        field: "averagePrice",
        valueFormatter: currencyFormatter,
      },
      {
        field: "currentPrice",
        valueFormatter: currencyFormatter,
      },
      {
        field: "simplePriceHistory",
        headerName: "Last 30d",
        cellRenderer: "agSparklineCellRenderer",
      },
      {
        field: "PnL",
        headerName: "Profit & Loss",
        valueGetter: calculateProfitAndLoss,
        valueFormatter: currencyFormatter,
        cellStyle: getProfitAndLossCellStyle,
      },
    ];
  }, []);

  // Selection Changed Event Handler
  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    const currentlySelectedRowData = event.api.getSelectedNodes()[0]?.data;
    setSelectedRow(currentlySelectedRowData);
  }, []);

  return (
    <AgGridReact
      rowData={rowData}
      columnDefs={colDefs}
      defaultColDef={defaultColDef}
      rowSelection="single"
      onSelectionChanged={onSelectionChanged}
      onFirstDataRendered={onFirstDataRendered}
      getRowId={getRowId}
    />
  );
};

export default DataGrid;
