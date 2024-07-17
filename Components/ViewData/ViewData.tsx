https://localhost:7249/data


-------
import React from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup
} from 'devextreme-react/data-grid';

export default function Task() {
  return (
    <React.Fragment>
      <h2 className={'content-block'}>Tasks</h2>

      <DataGrid
        className={'dx-card wide-card'}
        dataSource={dataSource as any}
        showBorders={false}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />

        <Column dataField={'Task_ID'} width={90} hidingPriority={2} />
        <Column
          dataField={'Task_Subject'}
          width={190}
          caption={'Subject'}
          hidingPriority={8}
        />
        <Column
          dataField={'Task_Status'}
          caption={'Status'}
          hidingPriority={6}
        />
        <Column
          dataField={'Task_Priority'}
          caption={'Priority'}
          hidingPriority={5}
        >
          <Lookup
            dataSource={priorities}
            valueExpr={'value'}
            displayExpr={'name'}
          />
        </Column>
        <Column
          dataField={'ResponsibleEmployee.Employee_Full_Name'}
          caption={'Assigned To'}
          allowSorting={false}
          hidingPriority={7}
        />
        <Column
          dataField={'Task_Start_Date'}
          caption={'Start Date'}
          dataType={'date'}
          hidingPriority={3}
        />
        <Column
          dataField={'Task_Due_Date'}
          caption={'Due Date'}
          dataType={'date'}
          hidingPriority={4}
        />
        <Column
          dataField={'Task_Priority'}
          caption={'Priority'}
          name={'Priority'}
          hidingPriority={1}
        />
        <Column
          dataField={'Task_Completion'}
          caption={'Completion'}
          hidingPriority={0}
        />
      </DataGrid>
    </React.Fragment>
  )
}

const dataSource = {
  store: {
    version: 2,
    type: 'odata',
    key: 'Task_ID',
    url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
  },
  expand: 'ResponsibleEmployee',
  select: [
    'Task_ID',
    'Task_Subject',
    'Task_Start_Date',
    'Task_Due_Date',
    'Task_Status',
    'Task_Priority',
    'Task_Completion',
    'ResponsibleEmployee/Employee_Full_Name'
  ]
};

const priorities = [
  { name: 'High', value: 4 },
  { name: 'Urgent', value: 3 },
  { name: 'Normal', value: 2 },
  { name: 'Low', value: 1 }
];


---------------------------------------------------


[
    {
        "id": 1,
        "SystemName": "Reflect",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Salaries",
                "status": {
                    "success": 10,
                    "errors": 0,
                    "warnings": 200,
                    "PartiallyExecuted": 100
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "SystemName": "Reflect",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Domsteic Transfer",
                "status": {
                    "success": 10,
                    "errors": 30,
                    "warnings": 0,
                    "PartiallyExecuted": 20
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 3,
        "SystemName": "Reflect",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Abroad Transfers",
                "status": {
                    "success": 10,
                    "errors": 10,
                    "warnings": 10,
                    "PartiallyExecuted": 8
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 4,
        "SystemName": "Reflect",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Accounts",
                "status": {
                    "success": 30,
                    "errors": 200,
                    "warnings": 10,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 5,
        "SystemName": "Reflect",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "QuickPay",
                "status": {
                    "success": 100,
                    "errors": 20,
                    "warnings": 10,
                    "PartiallyExecuted": 22
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 6,
        "SystemName": "Reflect",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Document Manager",
                "status": {
                    "success": 10,
                    "errors": 0,
                    "warnings": 100,
                    "PartiallyExecuted": 110
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 7,
        "SystemName": "Reflect",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "CLIQ",
                "status": {
                    "success": 100,
                    "errors": 40,
                    "warnings": 0,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 8,
        "SystemName": "Reflect",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Company Switching",
                "status": {
                    "success": 0,
                    "errors": 0,
                    "warnings": 10,
                    "PartiallyExecuted": 40
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 100,
        "SystemName": "Arabia",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Salaries",
                "status": {
                    "success": 72,
                    "errors": 11,
                    "warnings": 37,
                    "PartiallyExecuted": 20
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 9,
        "SystemName": "Arabia",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Domestic Transfer",
                "status": {
                    "success": 44,
                    "errors": 28,
                    "warnings": 9,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 10,
        "SystemName": "Arabia",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Abroad Transfers",
                "status": {
                    "success": 59,
                    "errors": 4,
                    "warnings": 13,
                    "PartiallyExecuted": 19
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 11,
        "SystemName": "Arabia",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Accounts",
                "status": {
                    "success": 85,
                    "errors": 16,
                    "warnings": 3,
                    "PartiallyExecuted": 20
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 12,
        "SystemName": "Arabia",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "QuickPay",
                "status": {
                    "success": 95,
                    "errors": 31,
                    "warnings": 48,
                    "PartiallyExecuted": 90
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 13,
        "SystemName": "Arabia",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Document Manager",
                "status": {
                    "success": 67,
                    "errors": 15,
                    "warnings": 112,
                    "PartiallyExecuted": 100
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 14,
        "SystemName": "Arabia",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "CLIQ",
                "status": {
                    "success": 10,
                    "errors": 10,
                    "warnings": 10,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 15,
        "SystemName": "Arabia",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Company Switching",
                "status": {
                    "success": 18,
                    "errors": 60,
                    "warnings": 20,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 17,
        "SystemName": "FundBot",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Salaries",
                "status": {
                    "success": 16,
                    "errors": 10,
                    "warnings": 31,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 18,
        "SystemName": "FundBot",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Domestic Transfer",
                "status": {
                    "success": 34,
                    "errors": 7,
                    "warnings": 43,
                    "PartiallyExecuted": 29
                    
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 19,
        "SystemName": "FundBot",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Abroad Transfers",
                "status": {
                    "success": 76,
                    "errors": 13,
                    "warnings": 28,
                    "PartiallyExecuted": 19
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 20,
        "SystemName": "FundBot",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Accounts",
                "status": {
                    "success": 55,
                    "errors": 89,
                    "warnings": 17,
                    "PartiallyExecuted": 16
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 21,
        "SystemName": "FundBot",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "QuickPay",
                "status": {
                    "success": 94,
                    "errors": 17,
                    "warnings": 35,
                    "PartiallyExecuted": 40
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 22,
        "SystemName": "FundBot",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Document Manager",
                "status": {
                    "success": 53,
                    "errors": 66,
                    "warnings": 12,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 23,
        "SystemName": "FundBot",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "CLIQ",
                "status": {
                    "success": 33,
                    "errors": 57,
                    "warnings": 38,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 24,
        "SystemName": "FundBot",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Company Switching",
                "status": {
                    "success": 66,
                    "errors": 73,
                    "warnings": 27,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 25,
        "SystemName": "Helios",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Salaries",
                "status": {
                    "success": 85,
                    "errors": 7,
                    "warnings": 49,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 26,
        "SystemName": "Helios",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Domestic Transfer",
                "status": {
                    "success": 32,
                    "errors": 63,
                    "warnings": 75,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 27,
        "SystemName": "Helios",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Abroad Transfers",
                "status": {
                    "success": 74,
                    "errors": 22,
                    "warnings": 11,
                    "PartiallyExecuted": 60
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 28,
        "SystemName": "Helios",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Accounts",
                "status": {
                    "success": 46,
                    "errors": 18,
                    "warnings": 82,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 29,
        "SystemName": "Helios",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "QuickPay",
                "status": {
                    "success": 92,
                    "errors": 4,
                    "warnings": 60,
                    "PartiallyExecuted": 15
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 30,
        "SystemName": "Helios",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Document Manager",
                "status": {
                    "success": 61,
                    "errors": 31,
                    "warnings": 19,
                    "PartiallyExecuted": 90
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 43,
        "SystemName": "Helios",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "CLIQ",
                "status": {
                    "success": 36,
                    "errors": 17,
                    "warnings": 28,
                    "PartiallyExecuted": 100
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 24,
        "SystemName": "Helios",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Company Switching",
                "status": {
                    "success": 60,
                    "errors": 15,
                    "warnings": 20,
                    "PartiallyExecuted": 30
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 31,
        "SystemName": "COB",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Salaries",
                "status": {
                    "success": 62,
                    "errors": 41,
                    "warnings": 73,
                    "PartiallyExecuted": 100
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 32,
        "SystemName": "COB",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Domestic Transfer",
                "status": {
                    "success": 83,
                    "errors": 25,
                    "warnings": 57,
                    "Partially Executed": 55 
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 33,
        "SystemName": "COB",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Abroad Transfers",
                "status": {
                    "success": 14,
                    "errors": 93,
                    "warnings": 36,
                    "PartiallyExecuted": 70
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 34,
        "SystemName": "COB",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Accounts",
                "status": {
                    "success": 70,
                    "errors": 11,
                    "warnings": 89,
                    "PartiallyExecuted": 61
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 35,
        "SystemName": "COB",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "QuickPay",
                "status": {
                    "success": 41,
                    "errors": 87,
                    "warnings": 5,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 36,
        "SystemName": "COB",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Document Manager",
                "status": {
                    "success": 58,
                    "errors": 40,
                    "warnings": 94,
                    "PartiallyExecuted": 15
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 37,
        "SystemName": "COB",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "CLIQ",
                "status": {
                    "success": 100,
                    "errors": 40,
                    "warnings": 0,
                    "PartiallyExecuted": 0
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 38,
        "SystemName": "COB",
        "timeRange": {
            "start": "2023-12-10T23:00:00",
            "end": "2023-12-11T00:00:00"
        },
        "modules": [
            {
                "moduleName": "Company Switching",
                "status": {
                    "success": 10,
                    "errors": 40,
                    "warnings": 20,
                    "PartiallyExecuted": 10
                },
                "detailedStatus": [
                    {
                        "statusType": "success",
                        "details": [
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "succsee": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "failure",
                        "details": [
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "error": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    },
                    {
                        "statusType": "warning",
                        "details": [
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            },
                            {
                                "warning": "Neobanking/customer-experience/v2/consents"
                            }
                        ]
                    }
                ]
            }
        ]
    }
]


--------------------
import { useContext, useState } from 'react';
import '../Systems/System.css';
import { CheckContext } from '../CutomHook/CustomHookProvider';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function System() {
    const { setDateTime, setSelectedModule } = useContext(CheckContext);

    const navigate = useNavigate();

    const initialSystems = [
        { name: 'Arabia', loading: false, startTime: '', endTime: '' },
        { name: 'FundBot', loading: false, startTime: '', endTime: '' },
        { name: 'COB', loading: false, startTime: '', endTime: '' },
        { name: 'Helios', loading: false, startTime: '', endTime: '' },
        { name: 'Reflect', loading: false, startTime: '', endTime: '' },
    ];

    const [systems, setSystems] = useState(initialSystems);

    const sortSystems = (systemsArray: typeof initialSystems) => {
        return systemsArray.sort((a, b) => (a.loading === b.loading) ? 0 : a.loading ? -1 : 1);
    };

    const ifuserCheck = (index: number) => {
        const system = systems[index];
        if (!system.startTime) {
            toast.error('Please Enter Start Date Time..', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                className: 'custom-toast',
                transition: Bounce,
            });
            return;
        }
        const newSystems = [...systems];
        newSystems[index].loading = true;

        setSystems(sortSystems(newSystems));
    };

    const handleClick = (index: number) => {
        const system = systems[index];
        setSelectedModule(system.name);
        setDateTime(system.startTime);
        navigate('/DataPage');
    };

    const handleInputChange = (index: number, field: string, value: string | boolean) => {
        const newSystems = [...systems];
        newSystems[index][field] = value;
        if (field === 'startTime' && typeof value === 'string') {
            if (newSystems[index].endTime && new Date(value) >= new Date(newSystems[index].endTime)) {
                newSystems[index].endTime = '';
            }
        }
        setSystems(sortSystems(newSystems));
    };

    const handleStop = (index: number) => {
        const newSystems = [...systems];
        newSystems[index].loading = false;
        newSystems[index].startTime = '';
        newSystems[index].endTime = '';
        setSystems(sortSystems(newSystems));
    };

    return (
        <div className="tableParent">
            <ToastContainer />
            <table className='SystemTable'>
                <thead>
                    <tr>
                        <th>System</th>
                        <th>Schedule</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {systems.map((system, index) => (
                        <tr key={system.name}>
                            <td className='systemName'>
                                {system.loading && <i className="bi bi-arrow-repeat"></i>}
                                <label>{system.name}</label>
                            </td>
                            <td className='dateTime'>
                                <input
                                    type='datetime-local'
                                    value={system.startTime}
                                    onChange={(e) => handleInputChange(index, 'startTime', e.target.value)}
                                    disabled={system.loading} className={system.loading ? "disable" : ""} />

                                <span> <i className="bi bi-arrow-right"></i> </span>

                                <input
                                    type='datetime-local'
                                    value={system.endTime}
                                    min={system.startTime}
                                    onChange={(e) => handleInputChange(index, 'endTime', e.target.value)}
                                    disabled={system.loading} className={system.loading ? "disable" : ""}
                                />
                            </td>
                            <td className='actions'>
                                {system.loading ? (
                                    <div className='stop-download'>
                                        <i className="bi bi-stop-circle" onClick={() => handleStop(index)}></i>
                                        <i className="bi bi-file-earmark-arrow-down"></i>
                                        <button onClick={() => handleClick(index)}>details</button>
                                    </div>
                                ) : (
                                    <i className="bi bi-play-circle" onClick={() => ifuserCheck(index)}></i>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default System;

