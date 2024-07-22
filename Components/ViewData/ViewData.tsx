import React, { useContext, useEffect, useState } from 'react';
import DataGrid, { Column, Editing, Button as GridButton, ToolbarItem } from 'devextreme-react/data-grid';
import DateBox from 'devextreme-react/date-box';
import TagBox from 'devextreme-react/tag-box';
import { Button, Popup, Toolbar } from 'devextreme-react';
import 'devextreme/dist/css/dx.light.css';
import { CheckContext } from '../../CustomHook'; // Adjust the path as needed
import notify from 'devextreme/ui/notify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Adminstration.css';

interface System {
  systemID: number;
  pirid: number | null;
  systemName: string;
  country: string;
  startTime: string | null;
  endTime: string | null;
  isRunning: boolean;
}

type SystemField = keyof System;

const GridTable: React.FC = () => {
  const { setDateTime, setSelectedModule } = useContext(CheckContext);
  const [systems, setSystems] = useState<System[]>([]);
  const [activeModule, setActiveModule] = useState('selectedModule');
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedSystemID, setSelectedSystemID] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7249/api/Adminstration');
        const data: System[] = await response.json();

        const today = new Date();
        const updatedData = data.map(system => {
          if (system.startTime && new Date(system.startTime) <= today && (!system.endTime || new Date(system.endTime) >= today)) {
            system.isRunning = true;
          }
          return system;
        });

        setSystems(updatedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const savedModule = localStorage.getItem('selectedModule');
    if (savedModule) {
      setSelectedModule(savedModule);
      setActiveModule(savedModule);
    }
  }, [setSelectedModule]);

  const onStopClick = (systemID: number) => {
    setSelectedSystemID(systemID);
    setPopupVisible(true);
  };

  const handleDateChange = (index: number, field: SystemField, value: Date | null) => {
    const today = new Date();
    const newSystems = [...systems];
    const system = newSystems[index];

    if (field === 'startTime') {
      if (value && value < today) {
        notify('Start date cannot be in the past', 'warning', 2000);
        return;
      }
      system[field] = value ? value.toISOString() : null;
    } else if (field === 'endTime') {
      if (!system.startTime) {
        notify('Please select a start date first', 'warning', 2000);
        return;
      }
      if (value && new Date(value) <= new Date(system.startTime)) {
        notify('End date must be greater than start date', 'warning', 2000);
        return;
      }
      system[field] = value ? value.toISOString() : null;
    }
    newSystems[index] = system;
    setSystems(newSystems);
  };

  const dateCellRender = (cellData: any, dateField: SystemField) => {
    const today = new Date();
    return (
      <DateBox
        readOnly
        type="datetime"
        value={cellData.data[dateField] ? new Date(cellData.data[dateField]) : undefined}
        min={today}
        onValueChanged={(e) => {
          const value = e.value;
          console.log(value);
          if (dateField === 'startTime' && value && value < today) {
            notify('Start date cannot be in the past', 'warning', 2000);
            return;
          }
          if (dateField === 'endTime' && (!cellData.data.startTime || value && new Date(value) <= new Date(cellData.data.startTime))) {
            notify('End date must be greater than start date', 'warning', 2000);
            return;
          }
          handleDateChange(cellData.rowIndex, dateField, value);
        }}
        displayFormat="dd-MM-yyyy HH:mm"
      />
    );
  };

  const actionCellRender = (cellData: any) => {
    if (cellData.data.isRunning) {
      return (
        <div>
          <Button icon="clear" onClick={() => onStopClick(cellData.data.systemID)} />
          <Button icon="download" />
          <Button width={100} text="details" type="normal" stylingMode="outlined" />
        </div>
      );
    } else {
      return <Button icon="edit" onClick={() => cellData.component.editRow(cellData.rowIndex)} />;
    }
  };

  const countryCellRender = (cellData: any) => (
    <TagBox readOnly value={cellData.data.country.split(",")} dataSource={[]} showClearButton={false} className='countryTB' />
  );

  const systemNameCellRender = (cellData: any) => {
    return (
      <div>
        {cellData.data.systemName}
        {cellData.data.isRunning && <FontAwesomeIcon icon={faSpinner} spin className='spinner' />}
      </div>
    );
  };


  return (
    <>
      <DataGrid
        dataSource={systems}
        showBorders={true}
        columnAutoWidth={true}
        rowAlternationEnabled={true}
      >
        <Editing
          mode="row"
          allowUpdating={true}
          useIcons={true}
        />
        <Column dataField="systemName" caption="System" cellRender={systemNameCellRender} width={"10%"} allowEditing={false} />
        <Column dataField="country" caption="Country" allowEditing={false} width={"20%"} cellRender={countryCellRender} />
        <Column width={"25%"} dataField="startTime" dataType='datetime' caption="Start Date" cellRender={(cellData) => dateCellRender(cellData, 'startTime')} />
        <Column width={"25%"} dataField="endTime" dataType='datetime' caption="End Date" cellRender={(cellData) => dateCellRender(cellData, 'endTime')} />
        <Column caption="Action" cellRender={actionCellRender} />
      </DataGrid>

    </>
  );
};

export default GridTable;





-----------------------------------------


   new AdminstartionDTO {
                    //NO Active PIR Currently
                    //Edit buttn is showing by checking  if(not isrunning) then show Edit
                    //creat PIR // FE ==> CreatePIR(SytemId, Start, End)

                    SystemID = 1,
                    PIRID = null,
                    SystemName = "Arabia",
                    Country = "Jordan, Palastine",
                    StartTime = null,
                    EndTime = null,
                    IsRunning = false
                },
                new AdminstartionDTO { 
                    //Scheduled future PIR
                   //Edit buttn is showing by checking  if(not isrunning) then show Edit to reschedule
                   //Update PIR // FE ==> UpdatePIR(systemID,PIRId, Start, End)

                    SystemID = 2,
                    PIRID = 2,
                    SystemName = "FundBot",
                    Country = "Jordan",
                    StartTime = new DateTime(2024,07,23),
                    EndTime = new DateTime(2024,07,24,5,15,0),
                    IsRunning = false
                },
                new AdminstartionDTO {
                    //a running PIR then show the action (if isrunning --> show, spinner, PIR ID, Stop, download, details)
                    SystemID = 3,
                    PIRID = 3,
                    SystemName = "COB",
                    Country = "Jordan, Morocco",
                    StartTime =  new DateTime(2024,07,20),
                    EndTime =  new DateTime(2024,07,22),
                    IsRunning = true
                },
                new AdminstartionDTO {
                    //creat PIR // FE ==> ADDPIR
                    SystemID = 4,
                    PIRID = null,
                    SystemName = "Helios",
                    Country = "Jordan",
                    StartTime = null,
                    EndTime = null,
                    IsRunning = false
                },
                new AdminstartionDTO { 
                    SystemID = 5,
                    PIRID = 5,
                    SystemName = "Reflect",
                    Country = "Jordan",
                    StartTime = new DateTime(2024,07,23),
                    EndTime = new DateTime(2024,07,24),
                    IsRunning = false
                }
            };

==================================================


  
import React, { useContext, useEffect, useState } from 'react';
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
import DateBox from 'devextreme-react/date-box';
import { Button } from 'devextreme-react/button';
import 'devextreme/dist/css/dx.light.css';
import { CheckContext } from '../../CustomHook'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import notify from 'devextreme/ui/notify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Adminstration.css';

interface System {
  systemID: number;
  pirid: number | null;
  systemName: string;
  country: string;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
}

type SystemField = keyof System;

const GridTable: React.FC = () => {
  const { setDateTime, setSelectedModule } = useContext(CheckContext);
  const navigate = useNavigate();
  const [systems, setSystems] = useState<System[]>([]);
  const [activeModule, setActiveModule] = useState('selectedModule');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7249/api/Adminstration');
        const data: System[] = await response.json();
        setSystems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const savedModule = localStorage.getItem('selectedModule');
    if (savedModule) {
      setSelectedModule(savedModule);
      setActiveModule(savedModule);
    }
  }, [setSelectedModule]);

  const onPlayClick = (cellData: any) => {
    const { data } = cellData;
    if (!data.startDate || !data.endDate) {
      notify('Please enter start and end date', 'warning', 2000);
    } else {
      const updatedSystems = systems.map(system => {
        if (system.systemID === data.systemID) {
          return { ...system, isActive: true };
        }
        return system;
      });

      setSystems(updatedSystems);
      localStorage.setItem('selectedModule', data.systemName);
      setActiveModule(data.systemName);
      setDateTime(data.startDate);
    }
  };

  const onStopClick = (systemID: number) => {
    const updatedSystems = systems.map(system => {
      if (system.systemID === systemID) {
        return { ...system, isActive: false };
      }
      return system;
    });

    setSystems(updatedSystems);
  };

  const handleDateChange = (index: number, field: SystemField, value: Date | null) => {
    const today = new Date();
    const newSystems = [...systems];
    const system = newSystems[index];

    if (field === 'startDate') {
      if (value && value < today) {
        notify('Start date cannot be in the past', 'warning', 2000);
        return;
      }
      system[field] = value ? value.toISOString() : '';
    } else if (field === 'endDate') {
      if (!system.startDate) {
        notify('Please select a start date first', 'warning', 2000);
        return;
      }
      if (value && new Date(value) <= new Date(system.startDate)) {
        notify('End date must be greater than start date', 'warning', 2000);
        return;
      }
      system[field] = value ? value.toISOString() : '';
    }

    newSystems[index] = system;
    setSystems(newSystems);
  };

  const dateCellRender = (cellData: any, dateField: SystemField) => {
    const index = systems.findIndex(system => system.systemID === cellData.data.systemID);
    const today = new Date();

    return (
      <DateBox
        placeholder='Please Enter Date'
        type='datetime'
        value={cellData.data[dateField] ? new Date(cellData.data[dateField]) : undefined}
        min={dateField === 'startDate' ? today : cellData.data.startDate ? new Date(cellData.data.startDate) : today}
        onValueChanged={(e) => handleDateChange(index, dateField, e.value)}
        disabled={cellData.data.isActive || (dateField === 'endDate' && !cellData.data.startDate)}
        displayFormat="yyyy-MM-dd - HH:mm"

      />
    );
  };

  const actionCellRender = (cellData: any) => {
    return cellData.data.isActive ? (
      <div>
        <Button
          icon="clear"
          onClick={() => onStopClick(cellData.data.systemID)}
        />
        <Button icon='download' />
        <Button text="Details" />
      </div>
    ) : (
      <Button
        icon="video"
        onClick={() => onPlayClick(cellData)}
      />
    );
  };


  const systemNameCellRender = (cellData: any) => {
    return (
      <div>
        {cellData.data.systemName}
        {cellData.data.isActive && <FontAwesomeIcon icon={faSpinner} spin className='spinner' />}
      </div>
    );
  };

  return (
    <DataGrid
      dataSource={systems}
      showBorders={true}
      columnAutoWidth={true}
      rowAlternationEnabled={true}
    >




      <Column
        dataField="systemID"
        caption="System ID"
        width={"7%"}
        allowEditing={false}
      />


      <Column
        dataField="systemName"
        caption="System"
        cellRender={systemNameCellRender}
        width={"9%"}
        allowEditing={false}
      />
      <Column dataField="country" caption="Country" allowEditing={false} width={"9%"} />


      <Column
        width={"28%"}
        dataField="startDate"
        caption="Start Date"
        dataType='datetime'
        cellRender={(cellData) => dateCellRender(cellData, 'startDate')}
      />
      <Column
        width={"28%"}
        dataField="enDate"
        caption="End Date"
        dataType='datetime'
        cellRender={(cellData) => dateCellRender(cellData, 'endDate')}
      />

      {/* <Column
        caption="Action"
        cellRender={actionCellRender}
      /> */}

      <Editing
        mode="row"
        allowUpdating={true}
      />

    </DataGrid>
  );
};

export default GridTable;


-------------------------------------


----------Home Code----------

import React, { useContext, useEffect, useState } from 'react';
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
import DateBox from 'devextreme-react/date-box';
import { Button } from 'devextreme-react/button';
import 'devextreme/dist/css/dx.light.css';
import { CheckContext } from '../../CustomHook'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import notify from 'devextreme/ui/notify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEdit } from '@fortawesome/free-solid-svg-icons';
import './Design.css';

import data from './Data.json';

interface System {
  SystemID: number;
  PIRID: number | null;
  SystemName: string;
  Country: string;
  StartTime: string | null;
  EndTime: string | null;
  IsRunning: boolean;
}

type SystemField = keyof System;

const GridTable: React.FC = () => {
  const { setDateTime, setSelectedModule } = useContext(CheckContext);
  const navigate = useNavigate();
  const [systems, setSystems] = useState<System[]>(data);
  const [activeModule, setActiveModule] = useState('selectedModule');
  const [editingRowKey, setEditingRowKey] = useState<number | null>(null);

  useEffect(() => {
    const savedModule = localStorage.getItem('selectedModule');
    if (savedModule) {
      setSelectedModule(savedModule);
      setActiveModule(savedModule);
    }
  }, [setSelectedModule]);

  const handleDateChange = (index: number, field: SystemField, value: Date | null) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const newSystems = [...systems];
    const system = newSystems[index];

    if (field === 'StartTime') {
      if (value && value.getTime() < today) {
        notify('Start date cannot be in the past', 'warning', 2000);
        return;
      }
      system[field] = value ? value.toISOString() : null;
    } else if (field === 'EndTime') {
      if (!system.StartTime) {
        notify('Please select a start date first', 'warning', 2000);
        return;
      }
      if (value && value.getTime() < new Date(system.StartTime).getTime()) {
        notify('End date must be greater than or equal to the start date', 'warning', 2000);
        return;
      }
      system[field] = value ? value.toISOString() : null;
    }

    newSystems[index] = system;
    setSystems(newSystems);
  };

  const dateCellRender = (cellData: any, dateField: SystemField) => {
    const index = systems.findIndex(system => system.SystemID === cellData.data.SystemID);
    const today = new Date();
    const isEditing = cellData.data.SystemID === editingRowKey;

    return (
      <DateBox
        placeholder='Please Enter Date'
        type='datetime'
        value={cellData.data[dateField] ? new Date(cellData.data[dateField]) : undefined}
        min={dateField === 'StartTime' ? today : cellData.data.StartTime ? new Date(cellData.data.StartTime) : today}
        onValueChanged={(e) => handleDateChange(index, dateField, e.value)}
        displayFormat="yyyy-MM-dd - HH:mm"
        disabled={!isEditing}
      />
    );
  };

  const systemNameCellRender = (cellData: any) => {
    return (
      <div>
        {cellData.data.SystemName}
        {cellData.data.IsRunning && <FontAwesomeIcon icon={faSpinner} spin className='spinner' />}
        {cellData.data.StartTime === null && !cellData.data.IsRunning && <FontAwesomeIcon icon={faEdit} />}
      </div>
    );
  };

  const actionCellRender = (cellData: any) => {
    if (cellData.data.IsRunning) {
      return (
        <div>
          <Button icon="clear" onClick={() => onStopClick(cellData.data.SystemID)} />
          <Button icon='download' />
          <Button text="Details" />
        </div>
      );
    }
    return null; // Or any other action for non-running systems
  };

  const onStopClick = (systemID: number) => {
    const updatedSystems = systems.map(system => {
      if (system.SystemID === systemID) {
        return { ...system, IsRunning: false };
      }
      return system;
    });

    setSystems(updatedSystems);
  };

  const onRowUpdating = (e: any) => {
    const { newData, oldData } = e;
    const today = new Date().setHours(0, 0, 0, 0);
    if (newData.StartTime && new Date(newData.StartTime).getTime() < today) {
      e.cancel = true;
      notify('Start date cannot be in the past', 'warning', 2000);
    } else if (newData.EndTime && new Date(newData.EndTime).getTime() < new Date(newData.StartTime || oldData.StartTime).getTime()) {
      e.cancel = true;
      notify('End date must be greater than or equal to the start date', 'warning', 2000);
    }
  };

  const onEditingStart = (e: any) => {
    setEditingRowKey(e.key);
  };

  const onSaved = (e: any) => {
    setEditingRowKey(null);
  };

  const onEditCanceling = (e: any) => {
    setEditingRowKey(null);
  };

  return (
    <DataGrid
      dataSource={systems}
      showBorders={true}
      columnAutoWidth={true}
      rowAlternationEnabled={true}
      onRowUpdating={onRowUpdating}
      onEditingStart={onEditingStart}
      onSaved={onSaved}
      onEditCanceling={onEditCanceling}
    >
      <Column
        dataField="SystemID"
        caption="System ID"
        width={"7%"}
        allowEditing={false}
      />
      <Column
        dataField="SystemName"
        caption="System"
        cellRender={systemNameCellRender}
        width={"9%"}
        allowEditing={false}
      />
      <Column dataField="Country" caption="Country" allowEditing={false} width={"9%"} />
      <Column
        width={"28%"}
        dataField="StartTime"
        caption="Start Date"
        dataType='datetime'
        cellRender={(cellData) => dateCellRender(cellData, 'StartTime')}
      />
      <Column
        width={"28%"}
        dataField="EndTime"
        caption="End Date"
        dataType='datetime'
        cellRender={(cellData) => dateCellRender(cellData, 'EndTime')}
      />
      <Column
        caption="Action"
        cellRender={actionCellRender}
        allowEditing={false}
      />
      <Editing
        mode="row"
        allowUpdating={true}
        useIcons={true}
        startEditAction="click"
      />
    </DataGrid>
  );
};

export default GridTable;



  
  
