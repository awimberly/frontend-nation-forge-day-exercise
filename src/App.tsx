// React
import React, { useState } from "react";

// Styles & Demo Utils
import Header from "./layout/Header";
import { getData } from "./utils/data";
import "./App.css";

// AG Grid Module Registration
import { AgChartsEnterpriseModule } from "ag-charts-enterprise";
import { ModuleRegistry } from "ag-grid-community";
import { AllEnterpriseModule } from "ag-grid-enterprise";

// Custom Components
import DataGrid from "./components/DataGrid";
import FinancialChart from "./components/FinancialChart";

// AG Grid Module Registration (move outside component)
ModuleRegistry.registerModules([
  AllEnterpriseModule.with(AgChartsEnterpriseModule),
]);

function App() {
  const [selectedRow, setSelectedRow] = useState<any>(null);

  console.log(`Selected Row: ${selectedRow}`);

  return (
    <div className="container">
      <Header />
      <div className="componentContainer">
        <div className="chartsContainer">
          <FinancialChart selectedRow={selectedRow} />
        </div>
        <div className="gridContainer">
          <DataGrid data={getData()} setSelectedRow={setSelectedRow} />
        </div>
      </div>
    </div>
  );
}

export default App;
