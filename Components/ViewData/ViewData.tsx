import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface TableContextType {
    selectedTable: Table | undefined;
    setSelectedTable: React.Dispatch<React.SetStateAction<Table | undefined>>;

    showData: boolean,
    setShowData: React.Dispatch<React.SetStateAction<boolean>>;

    filterColumn: string,
    setFilterColumn: React.Dispatch<React.SetStateAction<string>>;

}

export const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


    const [selectedTable, setSelectedTable] = useState<Table | undefined>();
    const [showData, setShowData] = useState(false);
    const [filterColumn, setFilterColumn] = useState<string>("");

    const values = { selectedTable, setSelectedTable, showData, setShowData, filterColumn, setFilterColumn }

    return (
        <TableContext.Provider value={values}>
            {children}
        </TableContext.Provider>
    );
};

export const useTable = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('useTable must be used within a TableContextProvider');
    }
    return context;
};



---------------------------------------------------

    import './DataTable.css';
import userData from '../../Data/UserData.json';
import { useTable } from '../CustomHook/CustomHook';
import NotFounf from '../../Images/no-data-icon.svg'

const DataTable = () => {
    const { selectedTable, showData, filterColumn } = useTable();


    const dataFilter = userData.find((e) => e.tableName === filterColumn)?.data;


    return (
        <>

            <>
                {!showData &&
                    <div className='notFound'>
                        <img src={NotFounf} alt='NotFound' />
                        <p>please select database and table</p>
                    </div>}
            </>
            {showData && (
                <div className='viewData'>
                    <table>
                        <thead>
                            <tr>
                                {selectedTable?.columns.map((column) => (
                                    <th key={column.columnId}>{column.columnName}</th>
                                ))}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataFilter?.map((row: any, rowIndex: number) => (
                                <tr key={rowIndex}>
                                    {selectedTable?.columns.map((column) => (
                                        <td key={column.columnId}>{row[column.columnName]}</td>
                                    ))}
                                    <td>
                                        <i className="bi bi-pencil-square"></i>
                                        <i className="bi bi-archive"></i>
                                    </td>
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

-------------------------------------------
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
    const [disabledTable , setDisabledTable] = useState(true);
    const {selectedTable, setSelectedTable, setFilterColumn , setShowData} = useTable();

    const handleDatabaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const databaseId = parseInt(event.target.value);
        const database = data.find(db => db.id === databaseId);
        setSelectedDatabase(database);
        if(event.target.value == "NULL"){
            setShowDescription(false);
            setShowData(false);
            setDisabledTable(true)
        }
        else{
            setDisabledTable(false);
        }
    };

    const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tableId = parseInt(event.target.value);
        const table = selectedDatabase?.tables.find(tb => tb.tableId === tableId);
        setSelectedTable(table);
        if(event.target.value == "NULL"){
            setDisabled(true);
            setShowData(false);
        }
        else{
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
                    <button onClick={()=>{FilterData()}} className={disabled || !selectedDatabase ? "disabledPreview" : ""}>preview</button>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;


---------------------------------------

    
    [
    {
        "database": "HR",
        "tableName": "Users",
        "data": [
            {
                "UserID": 1,
                "UserName": "Ammar",
                "UserAge": 22,
                "Gender": "Male"
            },
            {
                "UserID": 2,
                "UserName": "Ali",
                "UserAge": 32,
                "Gender": "Male"
            },
            {
                "UserID": 3,
                "UserName": "Sara",
                "UserAge": 24,
                "Gender": "Female"
            },
            {
                "UserID": 4,
                "UserName": "Sanad",
                "UserAge": 20,
                "Gender": "Male"
            }
        ]
    },
    {
        "database": "HR",
        "tableName": "Employees",
        "data": [
            {
                "EmployeeID": 1,
                "EmployeeName": "Alia"
            },
            {
                "EmployeeID": 2,
                "EmployeeName": "Ali"
            },
            {
                "EmployeeID": 3,
                "EmployeeName": "Ammen"
            }
        ]
    },
    {
        "database": "Customer",
        "tableName": "Customer",
        "data": [
            {
                "CustomerID": 1112,
                "CustomerName": "Alia"
            },
            {
                "CustomerID": 4212,
                "CustomerName": "Ali"
            },
            {
                "CustomerID": 2301,
                "CustomerName": "Ammen"
            }
        ]
    },
    {
        "database": "Customer",
        "tableName": "Order",
        "data": [
            {
                "OrderID": 1112,
                "OrderName": "Order 1"
            },
            {
                "OrderID": 4212,
                "OrderName": "Order 2"
            },
            {
                "OrderID": 2301,
                "OrderName": "Order 3"
            }
        ]
    }
]

    
