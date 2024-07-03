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
