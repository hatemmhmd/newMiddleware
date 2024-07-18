import './Design.css';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import data from './Data.json'

const home = () => {
  const renderPlayIcon = () => (
    <div className="icon-cell">
      <i className="dx-icon-play"></i>
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


