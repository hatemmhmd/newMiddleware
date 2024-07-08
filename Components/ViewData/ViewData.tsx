import './ViewData.css';
import userData from '../../Data/UserData.json';
import { useTable } from '../CustomHook/CustomHook';
import { useEffect, useState } from 'react';

function ViewData() {


    const { selectedTable, showData, filterColumn } = useTable();



    return (
        <>
            {showData && (
                <div className='viewData'>
                    <table>
                        <thead>
                            <tr>
                                {selectedTable?.columns.map((e) => {
                                    return (
                                        <th>{e.columnName}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((e) => {
                                return (
                                    e.Data.map((e) => {
                                        return (
                                            <tr>
                                                <td>{e.UserID}</td>
                                                <td>{e.UserName}</td>
                                                <td>{e.UserAge}</td>
                                                <td>{e.Gender}</td>
                                            </tr>
                                        )
                                    })
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default ViewData








-----------------------------------------------------------------------
import './DataTable.css';
import userData from '../../Data/UserData.json';
import data from '../../Data/SchemaDB.json';
import { useTable } from '../CustomHook/CustomHook';
import { useState } from 'react';

function DataTable() {

    interface DataSchema {
        database: string;
        tableName: string;
        data: {
            UserID: number;
            UserName: string;
            UserAge: number;
            Gender: string;
        }[];
    }

    const { selectedTable, showData, filterColumn } = useTable();

    // the data related to the selcted table under a specific database



    const [DataTest, setDataTest] = useState<DataSchema | undefined>(undefined);



    const dataFilter = userData.find((e) => { return e.tableName === filterColumn })?.data;
    


    return (
        <>
            {showData && (
                <div className='viewData'>
                    <table>
                        <thead>
                            <tr>
                                {selectedTable?.columns.map((e) => {
                                    return (
                                        <th>{e.columnName}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>


                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default DataTable





-----------------------------


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
    const {selectedTable, setSelectedTable, setFilterColumn , setShowData} = useTable();

    const handleDatabaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const databaseId = parseInt(event.target.value);
        const database = data.find(db => db.id === databaseId);
        setSelectedDatabase(database);
        event.target.value == "NULL" ? setShowDescription(false) : "";
    };


    const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tableId = parseInt(event.target.value);
        const table = selectedDatabase?.tables.find(tb => tb.tableId === tableId);
        setSelectedTable(table);
        event.target.value == "NULL" ? setDisabled(true) : setDisabled(false);
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
                    <select onChange={handleTableChange}>
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

-----------------------------------------
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

-------------------------------------

[
    {
        "id": 1,
        "name": "HR",
        "tables": [
            {
                "tableId": 1,
                "tableName": "Employees",
                "primaryKey": "EmployeeID",
                "description": "EMPLOYEE",
                "columns": [
                    {
                        "columnId": 1,
                        "columnName": "EmployeeID",
                        "dataType": "string"
                    },
                    {
                        "columnId": 12,
                        "columnName": "EmployeeName",
                        "dataType": "string"
                    }
                ]
            },
            {
                "tableId": 2,
                "tableName": "Users",
                "primaryKey": "UserID",
                "description": "USER",
                "columns": [
                    {
                        "columnId": 1,
                        "columnName": "UserID",
                        "dataType": "number"
                    },
                    {
                        "columnId": 1,
                        "columnName": "UserName",
                        "dataType": "string"
                    },
                    {
                        "columnId": 2,
                        "columnName": "UserAge",
                        "dataType": "string"
                    },
                    {
                        "columnId": 3,
                        "columnName": "Gender",
                        "dataType": "string"
                    }
                ]
            }
        ]
    },


    {
        "id": 2,
        "name": "Customer",
        "tables": [
            {
                "tableId": 3,
                "tableName": "Customer",
                "primaryKey": "CustomerID",
                "description": "CUSTOMER",
                "columns":[
                    {
                        "columnId": 1,
                        "columnName": "CustomerID",
                        "dataType": "string"
                    },
                    {
                        "columnId": 2,
                        "columnName": "CustomerName",
                        "dataType": "string"
                    }
                ]
            },
            {
                "tableId": 4,
                "tableName": "Order",
                "primaryKey": "UserID",
                "description": "ORDER",
                "columns": [
                    {
                        "columnId": 1,
                        "columnName": "OrderID",
                        "dataType": "number"
                    },
                    {
                        "columnId": 1,
                        "columnName": "OrderName",
                        "dataType": "number"
                    }
                ]
            }
        ]
    }
]
