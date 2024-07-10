import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';
import './DataTable.css'; // Ensure this file exists or remove this line if not needed
import userData from '../../Data/UserData.json'; // Adjust path as needed
import NotFound from '../../Images/no-data-icon.svg'; // Ensure this file exists or replace with a valid path

interface TableRowData {
  [key: string]: any;
}

const useTable = () => {
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [showData, setShowData] = useState<boolean>(false);
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [selectedDatabase, setSelectedDatabase] = useState<string>('');

  const handleSelectTable = (table: any) => {
    setSelectedTable(table);
    setShowData(true);
  };

  const handleFilterColumn = (column: string) => {
    setFilterColumn(column);
  };

  const handleSelectDatabase = (database: string) => {
    setSelectedDatabase(database);
    setShowData(false); // Reset the table view when changing database
  };

  return { selectedTable, showData, filterColumn, handleSelectTable, handleFilterColumn, selectedDatabase, handleSelectDatabase };
};

const DataTable: React.FC = () => {
  const { selectedTable, showData, filterColumn, handleSelectTable, handleFilterColumn, selectedDatabase, handleSelectDatabase } = useTable();

  const dataFilter = userData.find((e) => e.tableName === filterColumn)?.data || [];

  const [tableData, setTableData] = useState<TableRowData[]>([]);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<TableRowData>({});

  useEffect(() => {
    setTableData(dataFilter);
  }, [dataFilter]);

  const handleEditClick = (row: TableRowData, rowIndex: number) => {
    setEditRowId(rowIndex);
    setEditFormData({ ...row });
  };

  const handleDeleteClick = (rowIndex: number) => {
    const updatedData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(updatedData);
  };

  const handleSaveClick = () => {
    const updatedData = tableData.map((row, index) =>
      index === editRowId ? { ...editFormData } : row
    );
    setTableData(updatedData);
    setEditRowId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const value = e.target.value;
    setEditFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handlePreviewClick = () => {
    const selectedTable = userData.find((table) => table.tableName === filterColumn && table.database === selectedDatabase);
    if (selectedTable) {
      handleSelectTable(selectedTable);
    }
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Database</InputLabel>
        <Select
          value={selectedDatabase}
          onChange={(e) => handleSelectDatabase(e.target.value as string)}
        >
          {Array.from(new Set(userData.map((data) => data.database))).map((database) => (
            <MenuItem key={database} value={database}>
              {database}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Table</InputLabel>
        <Select
          value={filterColumn}
          onChange={(e) => handleFilterColumn(e.target.value as string)}
          disabled={!selectedDatabase}
        >
          {userData
            .filter((data) => data.database === selectedDatabase)
            .map((table) => (
              <MenuItem key={table.tableName} value={table.tableName}>
                {table.tableName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Button onClick={handlePreviewClick} disabled={!filterColumn}>Preview</Button>

      {!showData && (
        <div className='notFound'>
          <img src={NotFound} alt='NotFound' />
          <p>Please select database and table</p>
        </div>
      )}
      {showData && (
        <div className='viewData'>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(dataFilter[0] || {}).map((columnName) => (
                    <TableCell key={columnName}>{columnName}</TableCell>
                  ))}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.keys(row).map((columnName) => (
                      <TableCell key={columnName}>
                        {editRowId === rowIndex ? (
                          <TextField
                            value={editFormData[columnName] || ''}
                            onChange={(e) => handleInputChange(e, columnName)}
                          />
                        ) : (
                          row[columnName]
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      {editRowId === rowIndex ? (
                        <IconButton onClick={handleSaveClick}>
                          <Save />
                        </IconButton>
                      ) : (
                        <>
                          <IconButton onClick={() => handleEditClick(row, rowIndex)}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteClick(rowIndex)}>
                            <Delete />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default DataTable;
