List<AdminstartionDTO> systemInfoList = new List<AdminstartionDTO>
            {
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





-------------------------------------
.data-grid-container {
    margin: 30px 10px;
}


.data-grid-container .dx-datagrid-headers {
    background-color: #393e46 !important;
    color: aliceblue !important;
}


.dx-datagrid-headers .dx-datagrid-table .dx-row>td:hover:not(.dx-command-select):not(.dx-command-expand):not(.dx-editor-cell):not(.dx-command-edit):not(.dx-datagrid-group-space) {
    background-color: transparent;
    cursor: auto;
}

.dx-datagrid-headers .dx-datagrid-table .dx-row>td:hover .dx-datagrid-text-content {
    color: #363640;
}

/* .data-grid-container .dx-header-row .dx-datagrid-text-content {
     text-align: center;
     padding: 15px;
     font-weight: 500;
     letter-spacing: 2px;
     color: #363640;
 } */



td {
    text-align: center;
    position: relative;
    font-size: 15px !important;
    padding: 10px 5px !important;
}

.data-grid-container {
    height: 100vh !important;
}


.data-grid-container .icon-cell {
    display: flex;
    justify-content: center;
    align-items: center;
}

.data-grid-container .icon-cell .dx-icon-video {
    font-size: 30px;
    color: #4CAF50;
    cursor: pointer;
}


.data-grid-container .icon-cell .dx-icon-pulldown {
    font-size: 20px;
    position: absolute;
    left: 50%;
    color: #363640;
}

----------------------

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



  
  
