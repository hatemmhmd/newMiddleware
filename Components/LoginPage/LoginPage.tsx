import './LoginPage.css';
import Logo from '../../Images/Logo.jpg';
import { useNavigate } from 'react-router';

function LoginPage() {
    const HomePage = useNavigate();
    return (
        <div className='LoginPage'>
            <div className='content'>
                <div className='Logo'>
                    <img src={Logo} alt='Arabi Bank' />
                </div>
                <div className='userInput'>
                    <div className="input_wrap">
                        <input type="text" required />
                        <label>user name</label>
                        <i className="bi bi-person-fill"></i>
                    </div>

                    <div className="input_wrap">
                        <input type="password" required />
                        <label>password</label>
                        <i className="bi bi-key-fill"></i>
                    </div>

                    <div className='LoginBtn'>
                        <button onClick={() => { HomePage('/') }}>login</button>
                        <p>forget password ?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage


-------------------------
import { useState } from 'react';
import { Table } from '../../Data/SchemaDB.json';

interface UseTable {
    selectedTable: Table | undefined;
    setSelectedTable: (table: Table | undefined) => void;
    showData: boolean;
    setShowData: (show: boolean) => void;
    filterColumn: string;
    setFilterColumn: (column: string) => void;
}

export const useTable = (): UseTable => {
    const [selectedTable, setSelectedTable] = useState<Table | undefined>(undefined);
    const [showData, setShowData] = useState<boolean>(false);
    const [filterColumn, setFilterColumn] = useState<string>('');

    return {
        selectedTable,
        setSelectedTable,
        showData,
        setShowData,
        filterColumn,
        setFilterColumn
    };
};


-------------
 import React, { useState } from 'react';
import data from '../../Data/SchemaDB.json';
import './FilterPanel.css';
import { useTable } from '../CustomHook/CustomHook';

const FilterPanel = () => {
    const [selectedDatabase, setSelectedDatabase] = useState<any>();
    const [disabled, setDisabled] = useState(true);
    const [showDescription, setShowDescription] = useState(false);
    const { selectedTable, setSelectedTable, setFilterColumn, setShowData } = useTable();

    const handleDatabaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const databaseId = parseInt(event.target.value);
        const database = data.find(db => db.id === databaseId);
        setSelectedDatabase(database);
        event.target.value === "NULL" ? setShowDescription(false) : setShowDescription(true);
    };

    const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tableId = parseInt(event.target.value);
        const table = selectedDatabase?.tables.find((tb: any) => tb.tableId === tableId);
        setSelectedTable(table);
        event.target.value === "NULL" ? setDisabled(true) : setDisabled(false);
    };

    const FilterData = () => {
        setFilterColumn(selectedTable ? selectedTable.tableName : "");
        setShowData(true);
    };

    return (
        <div className='NavBar'>
            <div className='logo'>
                <p>middleware<br />system</p>
            </div>
            <div className='chooses'>
                <div className='dbSelect'>
                    <select onChange={handleDatabaseChange}>
                        <option value="NULL">Select a database</option>
                        {data.map((db: any) => (
                            <option key={db.id} value={db.id}>{db.name}</option>
                        ))}
                    </select>
                    <i className="bi bi-caret-down"></i>
                </div>
                <div className='tableSelect'>
                    <select onChange={handleTableChange}>
                        <option value="NULL">Select a table</option>
                        {selectedDatabase?.tables.map((tb: any) => (
                            <option key={tb.tableId} value={tb.tableId}>{tb.tableName}</option>
                        ))}
                    </select>
                    <i className="bi bi-caret-down"></i>
                </div>
                <div className='description'>
                    <button onClick={() => { setShowDescription(prev => !prev) }} className={disabled || !selectedDatabase ? "disabled" : ""}>description</button>
                    {!disabled && showDescription && selectedDatabase && (
                        <div className='content'>
                            <h3>{selectedTable?.description}</h3>
                        </div>
                    )}
                </div>
                <div className='preview'>
                    <button onClick={() => { FilterData() }}>preview</button>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;


-----------------

 import './DataTable.css';
import userData from '../../Data/UserData.json';
import { useTable } from '../CustomHook/CustomHook';

const DataTable = () => {
    const { selectedTable, showData, filterColumn } = useTable();

    // the data related to the selected table under a specific database
    const dataFilter = userData.find((e) => e.tableName === filterColumn)?.data;

    return (
        <>
            {showData && (
                <div className='viewData'>
                    <table>
                        <thead>
                            <tr>
                                {selectedTable?.columns.map((column) => (
                                    <th key={column.columnId}>{column.columnName}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dataFilter?.map((row: any, rowIndex: number) => (
                                <tr key={rowIndex}>
                                    {selectedTable?.columns.map((column) => (
                                        <td key={column.columnId}>{row[column.columnName]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default DataTable;
   
