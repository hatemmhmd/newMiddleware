import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface TableContextType {
    selectedTable: Table | undefined;
    setSelectedTable: React.Dispatch<React.SetStateAction<Table | undefined>>;

    showData: boolean,
    setShowData: React.Dispatch<React.SetStateAction<boolean>>;

    filterColumn: string,
    setFilterColumn: React.Dispatch<React.SetStateAction<string>>;
}

export const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedTable, setSelectedTable] = useState<Table | undefined>();

    const [showData, setShowData] = useState(false);

    const [filterColumn, setFilterColumn] = useState("");


    const values = { selectedTable, setSelectedTable, showData, setShowData, filterColumn, setFilterColumn }

    return (
        <TableContext.Provider value={values}>
            {children}
        </TableContext.Provider>
    );
};

export const useTable = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error('useTable must be used within a TableContextProvider');
    }
    return context;
};