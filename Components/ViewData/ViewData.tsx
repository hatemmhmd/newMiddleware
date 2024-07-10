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


--------------------------------
