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


=======================================================

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



---------------


    import React from 'react';
import './DataTable.css';
import userData from '../../Data/UserData.json';
import { useTable } from '../CustomHook/CustomHook';
import NotFound from '../../Images/no-data-icon.svg';

const DataTable = () => {
    const { selectedTable, showData, filterColumn } = useTable();

    // Filter the data related to the selected table
    const dataFilter = userData.find((e) => e.tableName === filterColumn)?.data;

    return (
        <>
            {!showData ? (
                <div className='notFound'>
                    <img src={NotFound} alt='No Data Found' />
                    <p>Please select a database and table</p>
                </div>
            ) : (
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



----------

import React, { useState } from 'react';
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
} from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';
import './DataTable.css';
import userData from '../../Data/UserData.json';
import { useTable } from '../CustomHook/CustomHook';
import NotFound from '../../Images/no-data-icon.svg';

interface TableRowData {
  [key: string]: any;
}

const DataTable: React.FC = () => {
  const { selectedTable, showData, filterColumn } = useTable();

  const dataFilter = userData.find((e) => e.tableName === filterColumn)?.data || [];

  const [tableData, setTableData] = useState<TableRowData[]>(dataFilter);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<TableRowData>({});

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    setEditFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  return (
    <>
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
    </>
  );
};

export default DataTable;



Argument of type 'ChangeEvent<HTMLInputElement | HTMLTextAreaElement>' is not assignable to parameter of type 'ChangeEvent<HTMLInputElement>'.
  Type 'HTMLInputElement | HTMLTextAreaElement' is not assignable to type 'HTMLInputElement'.
    Type 'HTMLTextAreaElement' is missing the following properties from type 'HTMLInputElement': accept, align, alt, capture, and 29 more.ts(2345)
    
