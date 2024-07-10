import React, { useState } from 'react';
import data from '../../Data/SchemaDB.json';
import './FilterPanel.css';
import { useTable } from '../CustomHook/CustomHook';
import DataTable from './DataTable'; // Adjust path as needed

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
    const [selectedDatabase, setSelectedDatabase] = useState<Database | null>(null);
    const [disabled, setDisabled] = useState(true);
    const [showDescription, setShowDescription] = useState(false);
    const [disabledTable, setDisabledTable] = useState(true);
    const { selectedTable, setSelectedTable, setFilterColumn, setShowData } = useTable();
    const [showDataTable, setShowDataTable] = useState(false); // State to manage DataTable visibility

    const handleDatabaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const databaseId = parseInt(event.target.value);
        const database = data.find(db => db.id === databaseId);
        setSelectedDatabase(database || null);
        if (event.target.value === "NULL") {
            setShowDescription(false);
            setShowData(false);
            setDisabledTable(true);
            setSelectedTable(null);
        } else {
            setDisabledTable(false);
        }
    };

    const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tableId = parseInt(event.target.value);
        const table = selectedDatabase?.tables.find(tb => tb.tableId === tableId) || null;
        setSelectedTable(table);
        if (event.target.value === "NULL") {
            setDisabled(true);
            setShowData(false);
        } else {
            setDisabled(false);
        }
    };

    const handlePreviewClick = () => {
        setFilterColumn(selectedTable ? selectedTable.tableName : "");
        setShowData(true);
        setShowDataTable(true); // Show DataTable after preview click
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
                    <button onClick={handlePreviewClick} className={disabled || !selectedDatabase ? "disabledPreview" : ""}>preview</button>
                </div>
            </div>
            {showDataTable && selectedTable && (
                <DataTable selectedDatabase={selectedDatabase} selectedTable={selectedTable} />
            )}
        </div>
    );
};

export default FilterPanel;






------------------
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'; // Import necessary components from Material-UI
import { Edit, Delete } from '@mui/icons-material'; // Import icons for edit and delete actions

interface Column {
    columnId: number;
    columnName: string;
    dataType: string;
}

interface TableData {
    [key: string]: any;
}

interface Table {
    tableId: number;
    tableName: string;
    primaryKey: string;
    description: string;
    columns: Column[];
}

interface Props {
    selectedDatabase: string | null;
    selectedTable: Table | null;
}

const DataTable: React.FC<Props> = ({ selectedDatabase, selectedTable }) => {
    const [tableData, setTableData] = useState<TableData[]>([]);

    useEffect(() => {
        if (selectedTable) {
            // Replace with actual data fetching logic
            const fetchData = async () => {
                try {
                    // Simulating fetching data based on selected database and table
                    const response = await fetch(`https://api.example.com/${selectedDatabase}/${selectedTable.tableName}`);
                    const data = await response.json();
                    setTableData(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [selectedDatabase, selectedTable]);

    const handleEditClick = (row: TableData, rowIndex: number) => {
        // Implement edit logic here
        console.log('Edit clicked:', row, rowIndex);
    };

    const handleDeleteClick = (rowIndex: number) => {
        // Implement delete logic here
        console.log('Delete clicked:', rowIndex);
    };

    return (
        <div className='viewData'>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {selectedTable?.columns.map((column) => (
                                <TableCell key={column.columnId}>{column.columnName}</TableCell>
                            ))}
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {selectedTable?.columns.map((column) => (
                                    <TableCell key={column.columnId}>{row[column.columnName]}</TableCell>
                                ))}
                                <TableCell>
                                    <Edit onClick={() => handleEditClick(row, rowIndex)} />
                                    <Delete onClick={() => handleDeleteClick(rowIndex)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DataTable;


    
