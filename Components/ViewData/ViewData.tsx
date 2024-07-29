import React from 'react';
import DataGrid, { Column, FilterRow, Pager, Paging, Button as GridButton, SearchPanel, Grouping, GroupPanel } from 'devextreme-react/data-grid';
import { useNavigate } from 'react-router-dom';
import './PIRSchedule.css'

const App = () => {
    const navigate = useNavigate();
    const showData = (pirId, systemname, status) => {
        navigate(`/dataview/${pirId}/${systemname}/${status}`);
    };

    const schedulesGrid = (data) => {
        return (
            <DataGrid
                dataSource={data.data.tasks}
                hoverStateEnabled
                height={"70vh"}
                onRowPrepared={(e) => {
                    if (e.rowType === 'data' && e.data.SystemName !== data.data.tasks[0].SystemName) {
                        e.rowElement.style.display = 'none';
                    }
                }}
            >
                <FilterRow visible={true} applyFilter='auto' />
                <Paging defaultPageSize={50} />
                <Pager
                    visible={true}
                    allowedPageSizes={[10, 20, 50]}
                    showPageSizeSelector={true}
                    showInfo={true}
                    showNavigationButtons={true}
                />
                <SearchPanel visible={true} placeholder='Search System' width={300} />
                <Column dataField="PIRID" caption="PIR ID" width={"7%"} alignment='left' />
                <Column dataField="SystemName" caption="SYSTEM" width={"20%"} groupIndex={0} allowSearch={true} />
                <Column dataField="Country" caption="COUNTRY" width={"20%"} allowSearch={true} />
                <Column dataField="StartDate" caption="START DATE" width={"25%"} dataType="datetime" format={"dd/MM/yyyy, HH:mm"} />
                <Column dataField="EndDate" caption="END DATE" width={"25%"} dataType="datetime" format={"dd/MM/yyyy, HH:mm"} />
                <Column type='buttons' width={"15%"} caption="ACTIONS">
                    <GridButton icon="chart" onClick={(e) => showData(e.row.data.PIRID, e.row.data.SystemName, "Technical")} text='Technical' />
                    <GridButton icon="toolbox" onClick={(e) => showData(e.row.data.PIRID, e.row.data.SystemName, "Business")} text='Business' />
                </Column>
                <Grouping contextMenuEnabled={false} expandMode='buttonClick' />
                <GroupPanel visible={true} emptyPanelText='' />
            </DataGrid>
        );
    };

    return (
        <div className="tabpanel-demo">
            <div className="widget-container">
                <TabPanel
                    width="100%"
                    height="100%"
                    animationEnabled={true}
                    swipeEnabled={true}
                    dataSource={dataSource}
                    iconPosition="top"
                    stylingMode="primary"
                    tabsPosition='top'
                    itemComponent={schedulesGrid}
                />
            </div>
        </div>
    );
};

export default App;
