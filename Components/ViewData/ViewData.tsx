import React, { useEffect, useState } from 'react';
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css'; // Import DevExtreme styles
import './DataGridComponent.css'; // Import custom styles
import axios from 'axios';
import DateBox from 'devextreme-react/date-box';

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

  const onCellPrepared = (e) => {
    if (e.column.dataField === 'callSchedule' && e.rowType === 'data') {
      e.cellElement.classList.add('dx-editor-cell');
    }
  };

  const renderDateBox = (cellInfo) => {
    return (
      <DateBox
        value={cellInfo.data[cellInfo.column.dataField]}
        type="datetime"
        displayFormat="MM/dd/yyyy HH:mm"
        dateSerializationFormat="yyyy-MM-ddTHH:mm:ss"
        onValueChanged={(e) => {
          cellInfo.setValue(e.value);
        }}
      />
    );
  };

  return (
    <div className="data-grid-container">
      <DataGrid
        dataSource={data}
        showBorders={true}
        rowAlternationEnabled={true}
        height="100%"
        onCellPrepared={onCellPrepared}
      >
        <Editing mode="cell" allowUpdating={true} />
        <Column dataField="systemID" caption="System ID" alignment="center" />
        <Column dataField="pirid" caption="PIR ID" alignment="center" />
        <Column dataField="systemName" caption="System Name" alignment="center" />
        <Column dataField="country" caption="Country" alignment="center" />
        <Column dataField="isActive" caption="Is Active" dataType="boolean" alignment="center" />
        <Column 
          dataField="callSchedule"
          caption="Call Schedule" 
          alignment="center"
          cellRender={renderDateBox}
        />
      </DataGrid>
    </div>
  );
};

export default DataGridComponent;
