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


