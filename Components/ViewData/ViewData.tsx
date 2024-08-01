تتت


import React, { useEffect, useState } from 'react';
import DataGrid, { Column, Editing, FilterRow, Pager, Paging, Button as GridButton, Scrolling } from 'devextreme-react/data-grid';
import DateBox from 'devextreme-react/date-box';
import { Button } from 'devextreme-react/button';
import 'devextreme/dist/css/dx.light.css';
import './Adminstration.css';
import { TagBox } from 'devextreme-react';
import axios from 'axios';
import { createCustomStore } from './custom-store';

interface System {
  systemID: number;
  pirid: number | null;
  systemName: string;
  country: string[];
  startDate: Date | null;
  endDate: Date | null;
  isRunning: boolean;
}

type SystemField = keyof System;

const GridTable: React.FC = () => {
  const [editingRowKey, setEditingRowKey] = useState<number | null>(null);
  const customstore = createCustomStore();

  useEffect(() => {
    const interval = setInterval(() => {
      customstore.load();
    }, 180000);
    return () => clearInterval(interval);
  }, [customstore]);

  const dateCellRender = (cellData: any, dateField: SystemField) => (
    <DateBox
      placeholder='Please Enter Date'
      type='datetime'
      value={cellData.data[dateField]}
      displayFormat='dd/MM/yyyy  hh:mm aa'
      readOnly
    />
  );

  const systemNameCellRender = (cellData: any) => (
    <div className="flex-container-system-name">
      <div>
        {cellData.data.systemName}
      </div>
      <div>
        {cellData.data.isRunning && (
          <div className="running-text"><Button icon="datapie" className='spinner' /></div>
        )}
      </div>
    </div>
  );

  const countryCellRender = (cellData: any) => (
    <TagBox readOnly value={cellData.data.country?.split(',')}
      dataSource={[]}
      showClearButton={false}
      stylingMode="underlined"
    />
  );

  const OnStop = async (pirId: number) => {
    try {
      await axios.put(`https://localhost:7249/api/Adminstration/Stoppir`, pirId, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const onEditCanceling = (e: any) => {
    setEditingRowKey(null);
  };

  const onEditingStart = (e: any) => {
    if (e.data.isRunning) {
      e.component.columnOption("startDate", "allowEditing", false);
      e.component.columnOption("endDate", "allowEditing", true);
    } else {
      e.component.columnOption("startDate", "allowEditing", true);
      e.component.columnOption("endDate", "allowEditing", true);
    }
    setEditingRowKey(e.key);
  };

  return (
    <DataGrid
      dataSource={customstore}
      onEditCanceling={onEditCanceling}
      hoverStateEnabled={true}
      onEditingStart={onEditingStart}
    >
      <Scrolling mode="standard" />

      <Editing
        mode="row"
        allowUpdating={true}
        useIcons={true}
        startEditAction="click"
      />

      <FilterRow visible={true} />
      <Paging defaultPageSize={50} />
      <Pager
        visible={true}
        allowedPageSizes={[10, 20, 50]}
        showPageSizeSelector={true}
        showInfo={true}
        showNavigationButtons={true}
      />

      <Column
        dataField="systemName"
        caption="SYSTEM"
        cellRender={systemNameCellRender}
        width={"20%"}
        allowEditing={false}
      />

      <Column
        dataField="country"
        caption="COUNTRY"
        allowEditing={false}
        width={"30%"}
        cellRender={countryCellRender}
      />

      <Column
        width={"30%"}
        dataField="startDate"
        caption="START DATE"
        dataType="datetime"
        cellRender={(cellData) => dateCellRender(cellData, 'startDate')}
        editorOptions={{
          displayFormat: "dd/MM/yyyy  hh:mm aa",
          showClearButton: true,
          stylingMode: "underlined"
        }}
        allowEditing={false}
      />

      <Column
        width={"30%"}
        dataField="endDate"
        caption="END DATE"
        dataType="datetime"
        cellRender={(cellData) => dateCellRender(cellData, 'endDate')}
        editorOptions={{
          displayFormat: "dd/MM/yyyy  hh:mm aa",
          showClearButton: true,
          stylingMode: "underlined"
        }}
        allowEditing={false} // Set default editing state
      />

      <Column type="buttons" caption="ACTIONS">
        <GridButton name="edit" icon="event" text='Edit' />
        <GridButton name="edit" icon="square" cssClass={"action-stop"} visible={(e) => e.row.data.isRunning} onClick={(e) => { OnStop(e.row?.data.pirid) }} text='Stop' />
        <GridButton name="edit" icon="chart" onClick={(e) => console.log(e.row?.data)} text='Dashboard' visible={(e) => e.row.data.isRunning} />
        <GridButton name="edit" icon="toolbox" onClick={() => null} visible={(e) => e.row.data.isRunning} text='Details' />
        <GridButton name="edit" icon="download" onClick={() => null} visible={(e) => e.row.data.isRunning} text='Download' />
      </Column>
    </DataGrid>
  );
};

export default GridTable;
