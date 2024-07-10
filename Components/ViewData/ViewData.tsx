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
} from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';
import './DataTable.css';
import userData from '../../Data/UserData.json';
import NotFound from '../../Images/no-data-icon.svg';

interface TableRowData {
  [key: string]: any;
}

const useTable = () => {
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [showData, setShowData] = useState<boolean>(false);
  const [filterColumn, setFilterColumn] = useState<string>('');

  const handleSelectTable = (table: any) => {
    setSelectedTable(table);
    setShowData(true);
  };

  const handleFilterColumn = (column: string) => {
    setFilterColumn(column);
  };

  return { selectedTable, showData, filterColumn, handleSelectTable, handleFilterColumn };
};

const DataTable: React.FC = () => {
  const { selectedTable, showData, filterColumn, handleSelectTable, handleFilterColumn } = useTable();

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
    const selectedTable = userData.find((table) => table.tableName === 'yourTableName');
    if (selectedTable) {
      handleSelectTable(selectedTable);
      handleFilterColumn('yourTableName'); // Update this line with appropriate column name if needed
    }
  };

  return (
    <div>
      <Button onClick={handlePreviewClick}>Preview</Button>
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
                  {selectedTable?.columns.map((column: any) => (
                    <TableCell key={column.columnId}>{column.columnName}</TableCell>
                  ))}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {selectedTable?.columns.map((column: any) => (
                      <TableCell key={column.columnId}>
                        {editRowId === rowIndex ? (
                          <TextField
                            value={editFormData[column.columnName] || ''}
                            onChange={(e) => handleInputChange(e, column.columnName)}
                          />
                        ) : (
                          row[column.columnName]
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
