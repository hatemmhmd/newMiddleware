import React, { useState } from 'react';

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

const databases: Database[] = [
    {
        id: 1,
        name: 'HR',
        tables: [
            {
                tableId: 1,
                tableName: 'Employees',
                primaryKey: 'EmployeeID',
                description: 'Description for Employees tables in database HR',
                columns: [
                    { columnId: 1, columnName: 'EmployeeID', dataType: 'string' },
                    { columnId: 2, columnName: 'EmployeeName', dataType: 'string' }
                ]
            },
            {
                tableId: 2,
                tableName: 'Users',
                primaryKey: 'UserID',
                description: 'Description for Users tables in database HR',
                columns: [
                    { columnId: 1, columnName: 'UserID', dataType: 'number' },
                    { columnId: 2, columnName: 'UserName', dataType: 'string' },
                    { columnId: 3, columnName: 'UserAge', dataType: 'string' },
                    { columnId: 4, columnName: 'Gender', dataType: 'string' }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Customer',
        tables: [
            {
                tableId: 3,
                tableName: 'Customer Name',
                primaryKey: 'CustomerID',
                description: 'Description for Customer Name tables in database Customers',
                columns: [
                    { columnId: 1, columnName: 'CustomerID', dataType: 'string' },
                    { columnId: 2, columnName: 'CustomerNmae', dataType: 'string' }
                ]
            },
            {
                tableId: 4,
                tableName: 'Customer Age',
                primaryKey: 'UserID',
                description: 'Description for Customer Age tables in database Customers',
                columns: [
                    { columnId: 1, columnName: 'Customer Gender', dataType: 'number' },
                    { columnId: 2, columnName: 'Customer Age', dataType: 'number' }
                ]
            }
        ]
    }
];

const data = {
    HR: {
        Employees: [
            { EmployeeID: 1, EmployeeName: 'Ammar' },
            { EmployeeID: 2, EmployeeName: 'Ali' },
            { EmployeeID: 3, EmployeeName: 'Sara' },
            { EmployeeID: 4, EmployeeName: 'Sanad' }
        ],
        Users: [
            { UserID: 1, UserName: 'Ammar', UserAge: 22, Gender: 'Male' },
            { UserID: 2, UserName: 'Ali', UserAge: 32, Gender: 'Male' },
            { UserID: 3, UserName: 'Sara', UserAge: 24, Gender: 'Female' },
            { UserID: 4, UserName: 'Sanad', UserAge: 20, Gender: 'Male' }
        ]
    },
    Customer: {
        'Customer Name': [
            { CustomerID: 1, CustomerNmae: 'Customer1' },
            { CustomerID: 2, CustomerNmae: 'Customer2' }
        ],
        'Customer Age': [
            { 'Customer Gender': 'Male', 'Customer Age': 30 },
            { 'Customer Gender': 'Female', 'Customer Age': 25 }
        ]
    }
};

const DatabaseViewer: React.FC = () => {
    const [selectedDatabase, setSelectedDatabase] = useState<string>('');
    const [selectedTable, setSelectedTable] = useState<string>('');
    const [tableData, setTableData] = useState<any[]>([]);
    const [tableColumns, setTableColumns] = useState<Column[]>([]);

    const handleDatabaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDatabase(event.target.value);
        setSelectedTable('');
        setTableData([]);
        setTableColumns([]);
    };

    const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tableName = event.target.value;
        setSelectedTable(tableName);
        const db = databases.find(db => db.name === selectedDatabase);
        const table = db?.tables.find(tbl => tbl.tableName === tableName);
        setTableColumns(table?.columns || []);
    };

    const handlePreview = () => {
        if (selectedDatabase && selectedTable) {
            setTableData(data[selectedDatabase][selectedTable]);
        }
    };

    return (
        <div>
            <select value={selectedDatabase} onChange={handleDatabaseChange}>
                <option value="" disabled>Select Database</option>
                {databases.map(db => (
                    <option key={db.id} value={db.name}>{db.name}</option>
                ))}
            </select>

            <select value={selectedTable} onChange={handleTableChange} disabled={!selectedDatabase}>
                <option value="" disabled>Select Table</option>
                {selectedDatabase && databases.find(db => db.name === selectedDatabase)?.tables.map(tbl => (
                    <option key={tbl.tableId} value={tbl.tableName}>{tbl.tableName}</option>
                ))}
            </select>

            <button onClick={handlePreview} disabled={!selectedTable}>Preview</button>

            {tableColumns.length > 0 && (
                <div>
                    <h3>Columns</h3>
                    <ul>
                        {tableColumns.map(col => (
                            <li key={col.columnId}>{col.columnName} ({col.dataType})</li>
                        ))}
                    </ul>
                </div>
            )}

            {tableData.length > 0 && (
                <div>
                    <h3>Data</h3>
                    <table>
                        <thead>
                            <tr>
                                {tableColumns.map(col => (
                                    <th key={col.columnId}>{col.columnName}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {tableColumns.map(col => (
                                        <td key={col.columnId}>{row[col.columnName]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DatabaseViewer;
