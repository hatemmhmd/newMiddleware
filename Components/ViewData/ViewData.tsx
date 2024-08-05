------------------------

import CustomStore from 'devextreme/data/custom_store';
import axios, { AxiosError } from 'axios';
import notify from 'devextreme/ui/notify';
import _ from 'lodash';
import { useRef } from 'react';

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

            debugger;

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
