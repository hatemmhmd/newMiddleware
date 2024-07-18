import React, { useEffect, useState } from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css'; // Import DevExtreme styles
import './DataGridComponent.css'; // Import custom styles
import axios from 'axios';

const DataGridComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://your-api-endpoint.com/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const renderPlayIcon = () => (
    <div className="icon-cell">
      <i className="dx-icon dx-icon-video"></i> {/* Use an available DevExtreme icon */}
    </div>
  );

  return (
    <div className="data-grid-container">
      <DataGrid
        dataSource={data}
        showBorders={true}
        rowAlternationEnabled={true}
        height="100%"
      >
        <Column dataField="systemID" caption="System ID" alignment="center" />
        <Column dataField="pirid" caption="PIR ID" alignment="center" />
        <Column dataField="systemName" caption="System Name" alignment="center" />
        <Column dataField="country" caption="Country" alignment="center" />
        <Column dataField="isActive" caption="Is Active" dataType="boolean" alignment="center" />
        <Column caption="Action" alignment="center" cellRender={renderPlayIcon} />
      </DataGrid>
    </div>
  );
};

export default DataGridComponent;



-----------
import DataGrid, { Column } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css'; // Import DevExtreme styles
import './Design.css';
import data from './Data.json'; // Import the JSON data

const home = () => {
  const renderPlayIcon = () => (
    <div className="icon-cell">
      <i className="dx-icon dx-icon-video"></i> {/* Use an available DevExtreme icon */}
    </div>
  );

  return (
    <div className="data-grid-container">
      <DataGrid
        dataSource={data}
        showBorders={true}
        rowAlternationEnabled={true}
        height="100%"
      >
        <Column dataField="systemID" caption="System ID" alignment="center" />
        <Column dataField="pirid" caption="PIR ID" alignment="center" />
        <Column dataField="systemName" caption="System Name" alignment="center" />
        <Column dataField="country" caption="Country" alignment="center" />
        <Column dataField="isActive" caption="Is Active" dataType="boolean" alignment="center" />
        <Column caption="Action" alignment="center" cellRender={renderPlayIcon} />
      </DataGrid>
    </div>
  );
};

export default home;



------------------------------- 

.data-grid-container .dx-datagrid-headers {
    background-color: #111 !important;
    /* Change header color */
}

.data-grid-container .dx-header-row .dx-datagrid-text-content {
    text-align: center;
    /* Center header text */
}

.data-grid-container .dx-data-row .dx-datagrid-text-content {
    text-align: center;
    padding: 24px 0 !important;
}

.data-grid-container {
    height: 100vh !important;
}


.data-grid-container .icon-cell {
    display: flex;
    justify-content: center;
    align-items: center;
}

.data-grid-container .icon-cell .dx-icon {
    font-size: 20px;
    /* Customize icon size */
    color: #4CAF50;
    /* Customize icon color */
    cursor: pointer;
}
