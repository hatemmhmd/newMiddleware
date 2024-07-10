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
