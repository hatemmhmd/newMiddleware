import React, { useEffect, useState } from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css'; // Import DevExtreme styles
import './DataGridComponent.css'; // Import custom styles
import axios from 'axios';
import { DateBox } from 'devextreme-react/date-box';

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
        <Column 
          caption="Call Schedule" 
          alignment="center" 
          editCellRender={cellData => (
            <DateBox 
              type="datetime" 
              defaultValue={cellData.value}
              onValueChanged={(e) => cellData.setValue(e.value)}
            />
          )}
        />
      </DataGrid>
    </div>
  );
};

export default DataGridComponent;
