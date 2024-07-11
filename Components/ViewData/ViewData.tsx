import React, { useState } from 'react';
import data from '../../Data/SchemaDB.json';
import './FilterPanel.css';
import Example from './Example';
import { useTable } from '../CustomHook/CustomHook';

const FilterPanel = () => {
    const [selectedDatabase, setSelectedDatabase] = useState<Database>();
    const [disabled, setDisabled] = useState(true);
    const [showDescription, setShowDescription] = useState(false);
    const [disabledTable, setDisabledTable] = useState(true);
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const [showData, setShowData] = useState(false);

    const handleDatabaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const databaseId = parseInt(event.target.value);
        const database = data.find(db => db.id === databaseId);
        setSelectedDatabase(database);
        if (event.target.value == "NULL") {
            setShowDescription(false);
            setShowData(false);
            setDisabledTable(true);
        } else {
            setDisabledTable(false);
        }
    };

    const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tableId = parseInt(event.target.value);
        const table = selectedDatabase?.tables.find(tb => tb.tableId === tableId);
        setSelectedTable(table);
        if (event.target.value == "NULL") {
            setDisabled(true);
            setShowData(false);
        } else {
            setDisabled(false);
        }
    };

    const FilterData = () => {
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
                    <button onClick={FilterData} className={disabled || !selectedDatabase ? "disabledPreview" : ""}>preview</button>
                </div>
            </div>

            {showData && selectedTable && <Example selectedTable={selectedTable} />}
        </div>
    );
};

export default FilterPanel;

---------
import { useMemo, useState, useEffect } from 'react';
import { MRT_EditActionButtons, MaterialReactTable, type MRT_ColumnDef, type MRT_TableOptions, useMaterialReactTable } from 'material-react-table';
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type User, usStates } from './data';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Example = ({ selectedTable }) => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  
  const { data: fetchedUsers = [], refetch } = useGetUsers(selectedTable?.tableName);

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => selectedTable?.columns.map(col => ({
      accessorKey: col.columnName,
      header: col.columnName,
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors[col.columnName],
        helperText: validationErrors[col.columnName],
        onFocus: () => setValidationErrors({
          ...validationErrors,
          [col.columnName]: undefined,
        }),
      },
    })) || [],
    [validationErrors, selectedTable],
  );

  // Implement CREATE, UPDATE, DELETE hooks and handlers similar to your existing code

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: false,
    muiTableContainerProps: {
      sx: { minHeight: '500px' },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New User
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};


--------


[
    {
        "id": 1,
        "name": "HR",
        "tables": [
            {
                "tableId": 1,
                "tableName": "Employees",
                "primaryKey": "EmployeeID",
                "description": "Employee Table Contains Details About Employees, Including Their ID",
                "columns": [
                    {
                        "columnId": 1,
                        "columnName": "EmployeeID",
                        "dataType": "string"
                    },
                    {
                        "columnId": 12,
                        "columnName": "EmployeeName",
                        "dataType": "string"
                    }
                ]
            },
            {
                "tableId": 2,
                "tableName": "Users",
                "primaryKey": "UserID",
                "description": "The User Table Stores User Details, Such as ID , User Name And Age",
                "columns": [
                    {
                        "columnId": 1,
                        "columnName": "UserID",
                        "dataType": "number"
                    },
                    {
                        "columnId": 2,
                        "columnName": "UserName",
                        "dataType": "string"
                    },
                    {
                        "columnId": 3,
                        "columnName": "UserAge",
                        "dataType": "string"
                    },
                    {
                        "columnId": 4,
                        "columnName": "Gender",
                        "dataType": "string"
                    }
                ]
            }
        ]
    },


    {
        "id": 2,
        "name": "Customer",
        "tables": [
            {
                "tableId": 3,
                "tableName": "Customer",
                "primaryKey": "CustomerID",
                "description": "The Customer Table Stores Customer Information , Including ID and Name",
                "columns":[
                    {
                        "columnId": 1,
                        "columnName": "CustomerID",
                        "dataType": "string"
                    },
                    {
                        "columnId": 2,
                        "columnName": "CustomerName",
                        "dataType": "string"
                    }
                ]
            },
            {
                "tableId": 4,
                "tableName": "Order",
                "primaryKey": "UserID",
                "description": "The Order Table Contains Information About Order, Including Order ID and Order Name",
                "columns": [
                    {
                        "columnId": 1,
                        "columnName": "OrderID",
                        "dataType": "number"
                    },
                    {
                        "columnId": 2,
                        "columnName": "OrderName",
                        "dataType": "number"
                    }
                ]
            }
        ]
    }
]


------------------------------------- 

  [
    {
        "database": "HR",
        "tableName": "Users",
        "data": [
            {
                "UserID": 1,
                "UserName": "Ammar",
                "UserAge": 22,
                "Gender": "Male"
            },
            {
                "UserID": 2,
                "UserName": "Ali",
                "UserAge": 32,
                "Gender": "Male"
            },
            {
                "UserID": 3,
                "UserName": "Sara",
                "UserAge": 24,
                "Gender": "Female"
            },
            {
                "UserID": 4,
                "UserName": "Sanad",
                "UserAge": 20,
                "Gender": "Male"
            }
        ]
    },
    {
        "database": "HR",
        "tableName": "Employees",
        "data": [
            {
                "EmployeeID": 1,
                "EmployeeName": "Alia"
            },
            {
                "EmployeeID": 2,
                "EmployeeName": "Ali"
            },
            {
                "EmployeeID": 3,
                "EmployeeName": "Ammen"
            }
        ]
    },
    {
        "database": "Customer",
        "tableName": "Customer",
        "data": [
            {
                "CustomerID": 1112,
                "CustomerName": "Alia"
            },
            {
                "CustomerID": 4212,
                "CustomerName": "Ali"
            },
            {
                "CustomerID": 2301,
                "CustomerName": "Ammen"
            }
        ]
    },
    {
        "database": "Customer",
        "tableName": "Order",
        "data": [
            {
                "OrderID": 1112,
                "OrderName": "Order 1"
            },
            {
                "OrderID": 4212,
                "OrderName": "Order 2"
            },
            {
                "OrderID": 2301,
                "OrderName": "Order 3"
            }
        ]
    }
]



-----------------------------------

    import { useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { type User, fakeData, usStates } from './data';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Example = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.lastName,
          helperText: validationErrors?.lastName,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              lastName: undefined,
            }),
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: 'state',
        header: 'State',
        editVariant: 'select',
        editSelectOptions: usStates,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New User
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: User) => {
      queryClient.setQueryData(
        ['users'],
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as User[],
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: User) => {
      queryClient.setQueryData(['users'], (prevUsers: any) =>
        prevUsers?.map((prevUser: User) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
        ),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId: string) => {
      queryClient.setQueryData(['users'], (prevUsers: any) =>
        prevUsers?.filter((user: User) => user.id !== userId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

function validateUser(user: User) {
  return {
    firstName: !validateRequired(user.firstName)
      ? 'First Name is Required'
      : '',
    lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
    email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
  };
}

---------------------------------

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
    const [disabledTable, setDisabledTable] = useState(true);
    const { selectedTable, setSelectedTable, setFilterColumn, setShowData } = useTable();

    const handleDatabaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const databaseId = parseInt(event.target.value);
        const database = data.find(db => db.id === databaseId);
        setSelectedDatabase(database);
        if (event.target.value == "NULL") {
            setShowDescription(false);
            setShowData(false);
            setDisabledTable(true);
        } else {
            setDisabledTable(false);
        }
    };

    const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tableId = parseInt(event.target.value);
        const table = selectedDatabase?.tables.find(tb => tb.tableId === tableId);
        setSelectedTable(table);
        if (event.target.value == "NULL") {
            setDisabled(true);
            setShowData(false);
        } else {
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
                    <button onClick={FilterData} className={disabled || !selectedDatabase ? "disabledPreview" : ""}>preview</button>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
