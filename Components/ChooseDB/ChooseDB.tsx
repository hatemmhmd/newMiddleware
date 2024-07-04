import React, { useState } from 'react';
import data from '../../Data/Data.json';
import './ChooseDB.css';
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


const ChooseDB = () => {


    const [selectedDatabase, setSelectedDatabase] = useState<Database>();

    const { selectedTable, setSelectedTable, setShowData, setFilterColumn } = useTable();

    const [disabled, setDisabled] = useState(true);
    const [showDescription, setShowDescription] = useState(false);

    const handleDatabaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const databaseId = parseInt(event.target.value);
        const database = data.find(db => db.id === databaseId);
        setSelectedDatabase(database);
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
                        <option value="">Select a database</option>
                        {data.map(db => (
                            <option key={db.id} value={db.id}>{db.name}</option>
                        ))}
                    </select>
                </div>

                <div className='tableSelect'>
                    <select onChange={handleTableChange}>
                        <option value="NULL">Select a table</option>
                        {selectedDatabase?.tables.map(tb => (
                            <option key={tb.tableId} value={tb.tableId}>{tb.tableName}</option>
                        ))}
                    </select>
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

export default ChooseDB;
















--------------------------------------------------------------

    Data USer

[
    {
        "database" : "HR" ,
        "tableName" : "Users" ,
        "data" : [
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
        }
]

--------------------------

schema Data

[
    {
        "id": 1,
        "name": "HR",
        "tables": [
            {
                "tableId": 1,
                "tableName": "Employees",
                "primaryKey": "EmployeeID",
                "description": "Description for Employees tables in database HR",
                "columns": [
                    {
                        "columnId": 1,
                        "columnName": "Employee ID",
                        "dataType": "string"
                    },
                    {
                        "columnId": 12,
                        "columnName": "Employee Name",
                        "dataType": "string"
                    }
                ]
            },
            {
                "tableId": 2,
                "tableName": "Users",
                "primaryKey": "UserID",
                "description": "Description for Users tables in database HR",
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
                "description": "Description for Customer Name tables in database Customers",
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
                "tableId": 2,
                "tableName": "Order",
                "primaryKey": "UserID",
                "description": "Description for Customer Age tables in database Customers",
                "columns": [
                    {
                        "columnId": 1,
                        "columnName": "Customer Gender",
                        "dataType": "number"
                    },
                    {
                        "columnId": 1,
                        "columnName": "Customer Age",
                        "dataType": "number"
                    }
                ]
            }
        ]
    }
]

--------------------------------------------------


DataTable


import './DataTable.css';
import userData from '../../Data/UserData.json';
import data from '../../Data/SchemaDB.json';
import { useTable } from '../CustomHook/CustomHook';
import { useEffect, useState } from 'react';

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



    const [DataTest , setDataTest]  = useState<DataSchema | undefined>();



useEffect(()=>{
    const dataFilter = userData.find((e) => { return e.tableName === filterColumn }); 
    setDataTest(dataFilter);
    console.log(DataTest);
} , [showData])


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


                            {/* {DataTest.map(dataRow =>
                                <tr>  {selectedTable?.columns.map(col => {
                                    return (
                                        <th>{dataRow[col.columnName]}</th>
                                    )
                                })}</tr>
                            )} */}


                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default DataTable


