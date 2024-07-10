import React, { useMemo, useState } from 'react';
import { useTable, useRowSelect, usePagination } from 'react-table';
import EditableCell from './EditableCell';
import NotFound from '../../Images/no-data-icon.svg';
import userData from '../../Data/UserData.json';
import { useTable as useTableContext } from '../CustomHook/CustomHook';
import './DataTable.css';

const DataTable = () => {
  const { selectedTable, showData, filterColumn } = useTableContext();
  const dataFilter = userData.find((e) => e.tableName === filterColumn)?.data || [];

  const [data, setData] = useState(dataFilter);

  const columns = useMemo(() => {
    if (!selectedTable) return [];
    return [
      ...selectedTable.columns.map((column) => ({
        Header: column.columnName,
        accessor: column.columnName,
        Cell: EditableCell,
      })),
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <button onClick={() => handleDelete(row.index)}>Delete</button>
          </div>
        ),
      },
    ];
  }, [selectedTable]);

  const handleDelete = (index) => {
    setData((oldData) => oldData.filter((_, i) => i !== index));
  };

  const updateMyData = (rowIndex, columnId, value) => {
    setData((oldData) =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const tableInstance = useTable(
    {
      columns,
      data,
      updateMyData,
    },
    usePagination,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    canNextPage,
    canPreviousPage,
  } = tableInstance;

  return (
    <>
      {!showData && (
        <div className="notFound">
          <img src={NotFound} alt="NotFound" />
          <p>Please select a database and table</p>
        </div>
      )}
      {showData && (
        <div className="viewData">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>
            <button onClick={() => gotoPage(Math.ceil(data.length / pageSize) - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
              </strong>{' '}
            </span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;
