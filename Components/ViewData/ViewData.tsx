import React, { useCallback, useState, useEffect } from 'react';
import Button from 'devextreme-react/button';
import DataGrid, {
  Column, Editing, Paging, Lookup,
} from 'devextreme-react/data-grid';
import { useTable } from '../CustomHook/CustomHook';
import userData from '../../Data/UserData.json';
import NotFound from '../../Images/no-data-icon.svg';
import './DataTable.css';

const DataTable = () => {
  const { selectedTable, showData, filterColumn } = useTable();

  // Define the type for the data state
  const [data, setData] = useState<Array<Record<string, any>>>([]);

  useEffect(() => {
    if (filterColumn) {
      const tableData = userData.find((e) => e.tableName === filterColumn)?.data || [];
      setData(tableData);
    }
  }, [filterColumn]);

  const [events, setEvents] = useState<string[]>([]);

  const logEvent = useCallback((eventName: string) => {
    setEvents((previousEvents) => [eventName, ...previousEvents]);
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

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
            keyExpr="ID"
            allowColumnReordering={true}
            showBorders={true}
            onEditingStart={() => logEvent('EditingStart')}
            onInitNewRow={() => logEvent('InitNewRow')}
            onRowInserting={() => logEvent('RowInserting')}
            onRowInserted={() => logEvent('RowInserted')}
            onRowUpdating={() => logEvent('RowUpdating')}
            onRowUpdated={() => logEvent('RowUpdated')}
            onRowRemoving={() => logEvent('RowRemoving')}
            onRowRemoved={() => logEvent('RowRemoved')}
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
            {selectedTable?.columns.map((column) => (
              <Column key={column.columnId} dataField={column.columnName} />
            ))}
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
