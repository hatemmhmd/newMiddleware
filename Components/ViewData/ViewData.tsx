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
