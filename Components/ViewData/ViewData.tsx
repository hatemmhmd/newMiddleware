.viewData {
  margin: 20px;
}

.notFound {
  text-align: center;
  margin-top: 50px;
}

.notFound img {
  width: 150px;
  height: auto;
}

.notFound p {
  font-size: 18px;
  color: #999;
}

#events {
  margin-top: 20px;
}

#events .caption {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

#events ul {
  list-style: none;
  padding: 0;
}

#events ul li {
  background: #f5f5f5;
  margin-bottom: 5px;
  padding: 10px;
  border: 1px solid #ddd;
}


import React, { useCallback, useEffect, useState } from 'react';
import Button from 'devextreme-react/button';
import DataGrid, { Column, Editing, Paging } from 'devextreme-react/data-grid';
import { useTable } from '../CustomHook/CustomHook';
import userData from '../../Data/UserData.json';
import NotFound from '../../Images/no-data-icon.svg';
import './DataTable.css';

const DataTable = () => {
  const { selectedTable, showData, filterColumn } = useTable();
  
  const [data, setData] = useState<Array<Record<string, any>>>([]);
  const [columns, setColumns] = useState<Array<any>>([]);
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    if (filterColumn) {
      const tableData = userData.find((e) => e.tableName === filterColumn)?.data || [];
      setData(tableData);

      const tableColumns = selectedTable?.columns.map((column) => ({
        dataField: column.columnName,
        dataType: column.dataType === 'number' ? 'number' : 'string',
      })) || [];
      setColumns(tableColumns);
    }
  }, [filterColumn, selectedTable]);

  const logEvent = useCallback((eventName: string) => {
    setEvents((previousEvents) => [eventName, ...previousEvents]);
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  const handleRowRemoving = useCallback((e) => {
    logEvent('RowRemoving');
    const newData = data.filter((row) => row[selectedTable.primaryKey] !== e.data[selectedTable.primaryKey]);
    setData(newData);
  }, [data, selectedTable, logEvent]);

  const handleRowUpdating = useCallback((e) => {
    logEvent('RowUpdating');
    const updatedData = data.map((row) => (row[selectedTable.primaryKey] === e.key ? { ...row, ...e.newData } : row));
    setData(updatedData);
  }, [data, selectedTable, logEvent]);

  return (
    <>
      {!showData && (
        <div className="notFound">
          <img src={NotFound} alt="NotFound" />
          <p>Please select a database and table</p>
        </div>
      )}
      {showData && (
        <div className="viewData">
          <DataGrid
            id="gridContainer"
            dataSource={data}
            keyExpr={selectedTable?.primaryKey}
            allowColumnReordering={true}
            showBorders={true}
            onRowRemoving={handleRowRemoving}
            onRowUpdating={handleRowUpdating}
            onEditingStart={() => logEvent('EditingStart')}
            onInitNewRow={() => logEvent('InitNewRow')}
            onRowInserting={() => logEvent('RowInserting')}
            onRowInserted={() => logEvent('RowInserted')}
            onRowUpdated={() => logEvent('RowUpdated')}
            onSaving={() => logEvent('Saving')}
            onSaved={() => logEvent('Saved')}
            onEditCanceling={() => logEvent('EditCanceling')}
            onEditCanceled={() => logEvent('EditCanceled')}
          >
            <Paging enabled={true} />
            <Editing
              mode="row"
              allowUpdating={true}
              allowDeleting={true}
              allowAdding={true}
            />
            {columns.map((column) => (
              <Column key={column.dataField} dataField={column.dataField} dataType={column.dataType} />
            ))}
            <Column type="buttons">
              <Button name="edit" />
              <Button name="delete" />
            </Column>
          </DataGrid>

          <div id="events">
            <div>
              <div className="caption">Fired events</div>
              <Button id="clear" text="Clear" onClick={clearEvents} />
            </div>
            <ul>
              {events.map((event, index) => <li key={index}>{event}</li>)}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;


