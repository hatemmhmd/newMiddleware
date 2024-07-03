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
