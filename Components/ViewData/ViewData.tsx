import React, { useState } from 'react';
import data from '../../Data/SchemaDB.json';
import './FilterPanel.css';
import { useTable } from '../CustomHook/CustomHook';

interface Column {
  columnId: number;
  columnName: string;
  dataType: string;
}

interface Table {
  tableId: number;
  tableName: string;
  primaryKey: string;
  description: string;
  columns: Column[];
}

interface Database {
  id: number;
  name: string;
  tables: Table[];
}

const FilterPanel = () => {
  const [selectedDatabase, setSelectedDatabase] = useState<Database>();
  const [disabled, setDisabled] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [disabledTable, setDisabledTable] = useState(true);
  const { selectedTable, setSelectedTable, setFilterColumn, setShowData } = useTable();

  const handleDatabaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const databaseId = parseInt(event.target.value);
    const database = data.find(db => db.id === databaseId);
    setSelectedDatabase(database);
    if (event.target.value == "NULL") {
      setShowDescription(false);
      setShowData(false);
      setDisabledTable(true);
    } else {
      setDisabledTable(false);
    }
  };

  const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tableId = parseInt(event.target.value);
    const table = selectedDatabase?.tables.find(tb => tb.tableId === tableId);
    setSelectedTable(table);
    if (event.target.value == "NULL") {
      setDisabled(true);
      setShowData(false);
    } else {
      setDisabled(false);
    }
  };

  const FilterData = () => {
    setFilterColumn(selectedTable ? selectedTable.tableName : "");
    setShowData(true);
  }

  return (
    <div className='NavBar'>
      <div className='logo'>
        <p>middleware<br />system</p>
      </div>

      <div className='chooses'>
        <div className='dbSelect'>
          <select onChange={handleDatabaseChange}>
            <option value="NULL">Select a database</option>
            {data.map(db => (
              <option key={db.id} value={db.id}>{db.name}</option>
            ))}
          </select>
          <i className="bi bi-caret-down"></i>
        </div>

        <div className='tableSelect'>
          <select onChange={handleTableChange} disabled={disabledTable}>
            <option value="NULL">Select a table</option>
            {selectedDatabase?.tables.map(tb => (
              <option key={tb.tableId} value={tb.tableId}>{tb.tableName}</option>
            ))}
          </select>
          <i className="bi bi-caret-down"></i>
        </div>

        <div className='description'>
          <button onClick={() => { setShowDescription(prev => !prev) }} className={disabled || !selectedDatabase ? "disabled" : ""}>description</button>
          {!disabled && showDescription && selectedDatabase && (
            <div className='content'>
              <i className="bi bi-caret-up-fill"></i>
              <h3>{selectedTable?.description}</h3>
            </div>
          )}
        </div>

        <div className='preview'>
          <button onClick={FilterData} className={disabled || !selectedDatabase ? "disabledPreview" : ""}>preview</button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;



---------



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
  const [data, setData] = useState([]);

  useEffect(() => {
    if (filterColumn) {
      const tableData = userData.find((e) => e.tableName === filterColumn)?.data || [];
      setData(tableData);
    }
  }, [filterColumn]);

  const [events, setEvents] = useState([]);

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






-------------------------------------------

  Argument of type '{ UserID: number; UserName: string; UserAge: number; Gender: string; }[] | { EmployeeID: number; EmployeeName: string; }[] | { CustomerID: number; CustomerName: string; }[] | { OrderID: number; OrderName: string; }[]' is not assignable to parameter of type 'SetStateAction<never[]>'.
  Type '{ UserID: number; UserName: string; UserAge: number; Gender: string; }[]' is not assignable to type 'SetStateAction<never[]>'.
    Type '{ UserID: number; UserName: string; UserAge: number; Gender: string; }[]' is not assignable to type 'never[]'.
      Type '{ UserID: number; UserName: string; UserAge: number; Gender: string; }' is not assignable to type 'never'.ts(2345)
const tableData: {
    UserID: number;
    UserName: string;
    UserAge: number;
    Gender: string;
}[] | {
    EmployeeID: number;
    EmployeeName: string;
}[] | {
    CustomerID: number;
    CustomerName: string;
}[] | {
    OrderID: number;
    OrderName: string;
}[]

Argument of type '(previousEvents: never[]) => string[]' is not assignable to parameter of type 'SetStateAction<never[]>'.
  Type '(previousEvents: never[]) => string[]' is not assignable to type '(prevState: never[]) => never[]'.
    Type 'string[]' is not assignable to type 'never[]'.
      Type 'string' is not assignable to type 'never'.ts(2345)



  
