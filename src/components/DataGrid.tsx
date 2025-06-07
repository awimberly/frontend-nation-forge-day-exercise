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
};

// Profit And Loss Value Getter
const calculateProfitAndLoss = (params: ValueGetterParams) => {
  // TODO: Implement profit and loss calculation (Step 5)
};

// Profit And Loss Cell Style
const getProfitAndLossCellStyle = (params: CellClassParams) => {
  // TODO: Implement conditional cell styles for Profit & Loss Column (Step 6)
};

// Row Selection Options
const rowSelection = {
  // TODO: Implement Row Selection Strategy (Step 7)
} as RowSelectionOptions;

// On First Data Rendered Event
const onFirstDataRendered = (params: FirstDataRenderedEvent) => {
  // TODO:  Create Integrated TreeMap Chart on Load (Step 10)
};

// Set Row ID Strategy
const getRowId = (params: GetRowIdParams): string => {
  // TODO: Implement Row ID strategy to uniquely identify each row (Bonus Task)
};

const DataGrid: React.FC<DataGridProps> = ({ data = [], setSelectedRow }) => {
  // Data To be Displayed In The Data Grid
  const rowData = useMemo<Ticker[]>(() => data, []);

  // Column Definitions
  const colDefs = useMemo<ColDef[]>(() => {
    return [
      {
        field: "ticker",
      },
      {
        field: "shares",
      },
      {
        field: "averagePrice",
      },
      {
        field: "currentPrice",
      },
      {
        field: "simplePriceHistory",
        headerName: "Last 30d",
      },
    ];
  }, []);

  // Selection Changed Event Handler
  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    // TODO: Implement Selection Changed Event Handler to get currently selected row and pass its data to parent component (Step 7)
  }, []);

  return (
    <AgGridReact
      rowData={rowData}
      columnDefs={colDefs}
      defaultColDef={defaultColDef}
    />
  );
};

export default DataGrid;
