import React, { useEffect, useRef, useState } from 'react';
import DataGrid, { Column, Editing, FilterRow, Pager, Paging, Button as GridButton, Scrolling } from 'devextreme-react/data-grid';
import DateBox from 'devextreme-react/date-box';
import { Button } from 'devextreme-react/button';
import 'devextreme/dist/css/dx.light.css';
import './Adminstration.css';
import { TagBox } from 'devextreme-react';
import axios from 'axios';
import { createCustomStore } from './custom-store';

interface System {
  systemID: number;
  pirid: number | null;
  systemName: string;
  country: string[];
  startDate: Date | null;
  endDate: Date | null;
  isRunning: boolean;
}

type SystemField = keyof System;

const GridTable: React.FC = () => {


  const [editingRowKey, setEditingRowKey] = useState<number | null>(null);
  const customstore = createCustomStore();

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 180_000);
    return () => clearInterval(interval);
  }, []);

  const dateCellRender = (cellData: any, dateField: SystemField) => (
    <DateBox
      placeholder='Please Enter Date'
      type='datetime'
      value={cellData.data[dateField]}
      displayFormat='dd/MM/yyyy  hh:mm aa'
      readOnly
    />
  );

  const systemNameCellRender = (cellData: any) => (
    <div className="flex-container-system-name">
      <div>
        {cellData.data.systemName}
      </div>
      <div>
        {cellData.data.isRunning && (
          <div className='pirId-spinner'>
            <div className="running-text"> <Button icon="datapie" className='spinner' /> </div>
            <div className='pirId'>{cellData.data.pirid}</div>
          </div>
        )}
      </div>
    </div>
  );

  const countryCellRender = (cellData: any) => (
    <TagBox readOnly value={cellData.data.country?.split(',')}
      dataSource={[]}
      showClearButton={false}
      stylingMode="underlined"
    />
  );

  const OnStop = async (pirId: number) => {
    try {
      await axios.put(`https://localhost:44382/api/Adminstration/Stoppir`,
        pirId,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    } catch (error) {
      console.log('Error:', error);
    }
    window.location.reload();
  };

  const onEditCanceling = () => {
    setEditingRowKey(null);
  };

  const [startDate, setStartDate] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(true);

  const [currentPir, setCurrentPir] = useState<number>();


  const onEditingStart = (e: any, n: number) => {

    setCurrentPir(n);

    if (e.pirid == n) {
      setCheck(false)
    }

    if (e.isRunning) {
      setStartDate(false);
      setEndDate(true);
    } else {
      setStartDate(true);
      setEndDate(true);
    }
  };

  const onSave = () => {
    setEditingRowKey(null);
  };



  return (
    <DataGrid
      dataSource={customstore}
      onEditCanceling={onEditCanceling}
      hoverStateEnabled={true}
      onEditingStart={(e) => onEditingStart(e.data, e.data.pirid)}
      onSaved={onSave}
    >
      <Scrolling mode="standard" />

      <Editing
        mode="row"
        allowUpdating={true}
        useIcons={true}
        startEditAction="click"
      />

      <FilterRow visible={true} />
      <Paging defaultPageSize={50} />
      <Pager
        visible={true}
        allowedPageSizes={[10, 20, 50]}
        showPageSizeSelector={true}
        showInfo={true}
        showNavigationButtons={true}
      />

      <Column
        dataField="systemName"
        caption="SYSTEM"
        cellRender={systemNameCellRender}
        width={"20%"}
        allowEditing={false}
      />

      <Column
        dataField="country"
        caption="COUNTRY"
        allowEditing={false}
        width={"25%"}
        cellRender={countryCellRender}
      />

      <Column
        width={"25%"}
        dataField="startDate"
        caption="START DATE"
        dataType="datetime"
        cellRender={(cellData) => dateCellRender(cellData, 'startDate')}
        editorOptions={{
          displayFormat: "dd/MM/yyyy  hh:mm aa",
          showClearButton: true,
          stylingMode: "underlined"
        }}
        allowEditing={startDate}

      />

      <Column
        width={"25%"}
        dataField="endDate"
        caption="END DATE"
        dataType="datetime"
        cellRender={(cellData) => dateCellRender(cellData, 'endDate')}
        editorOptions={{
          displayFormat: "dd/MM/yyyy  hh:mm aa",
          showClearButton: true,
          stylingMode: "underlined"
        }}
        allowEditing={endDate}
      />

      <Column type="buttons" caption="ACTIONS" width={"25%"}>
        <GridButton name="edit" icon="event" text='Edit' />
        <GridButton name="edit" icon="square" cssClass={"action-stop"} visible={(e) => e.row.data.isRunning && check} onClick={(e) => { OnStop(e.row?.data.pirid) }} text='Stop' />
        <GridButton name="edit" icon="chart" text='Dashboard' visible={(e) => e.row.data.isRunning} />
        <GridButton name="edit" icon="toolbox" onClick={() => null} visible={(e) => e.row.data.isRunning} text='Details' />
        <GridButton name="edit" icon="download" onClick={() => null} visible={(e) => e.row.data.isRunning} text='Download' />
      </Column>


    </DataGrid>
  );
};

export default GridTable;








--------------------------------------------


import CustomStore from 'devextreme/data/custom_store';
import axios, { AxiosError } from 'axios';
import notify from 'devextreme/ui/notify';
import _ from 'lodash';



export function createCustomStore() {
    let fullDataCache: any[] = [];
    const sucessHandler = (mode: "update" | "delete") => {
        let msg = `${mode.toUpperCase()} request submitted successfully! It is on the way for Checker review`;
        notify(msg, "success", 3000);
    }

    const exceptionHandler = (error: any) => {
        if (error instanceof AxiosError) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
            }
        } else if (typeof error === "string") {
            let msg = `Error: ${error}`;
            notify(msg, "error", 3000);
        }
    }

    function isNotEmpty(value: string | undefined | null) {
        return value !== undefined && value !== null && value !== '';
    }

    const myStore = new CustomStore({
        load: (loadOptions: any) => {
            const paramNames = [
                'skip', 'take', 'requireTotalCount', 'requireGroupCount',
                'sort', 'filter', 'totalSummary', 'group', 'groupSummary',
            ];
            return new Promise((resolve) => {
                try {
                    axios.get(`https://localhost:44382/api/Adminstration?`)
                        .then(async response => {
                            fullDataCache = response.data.data;
                            const totalCount = response.data.totalCount;
                            resolve({
                                data: fullDataCache,
                                totalCount: totalCount || 1
                            });
                        }).catch(error => {
                            exceptionHandler(error);
                            resolve({
                                data: [],
                                totalCount: 0
                            });
                        });
                } catch (error) {
                    console.error('Error in load function:', error);
                    resolve({
                        data: [],
                        totalCount: 0
                    });
                }
            });
        },

        update: (key: any, values: any) => {
            const api = key.startDate == null && key.endDate == null
                ? "https://localhost:44382/api/Adminstration/insertpir"
                : "https://localhost:44382/api/Adminstration/updatepir"
            let result: any = _.cloneDeep({ ...key, ...values });

            const today = new Date().toLocaleDateString()
            if (result.startDate == null || result.endDate == null) {
                notify('Start And End Date Is Required', 'error', 2000);
                return Promise.resolve();
            }
            if (result.startDate && new Date(result.startDate).toLocaleDateString() < today) {
                notify('Start Date Cannot Be In The Past', 'error', 2000);
                return Promise.resolve();
            }
            if (result.endDate && new Date(result.endDate).getTime() < new Date(result.startDate || result.startDate).getTime()) {
                notify('End date must be greater than or equal to the start date', 'warning', 2000);
                return Promise.resolve();
            }


            if (result.pirid == null) {
                return axios.post(
                    api,
                    {
                        systemID: result.systemID,
                        StartDate: result.startDate,
                        EndDate: result.endDate
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                    .then(() => {
                        sucessHandler("update");
                    }).catch((error) => {
                        exceptionHandler(error);
                    })
            }
            else {
                return axios.put(
                    api,
                    {
                        systemID: result.systemID,
                        PIRId: result.pirid,
                        StartDate: result.startDate,
                        EndDate: result.endDate
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                    .then(() => {
                        sucessHandler("update");
                    }).catch((error) => {
                        exceptionHandler(error);
                    })
            }
        },
    });
    return myStore;
}


