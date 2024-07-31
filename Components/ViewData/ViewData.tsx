const recentPIRs = [
    {
        "PIRID": 1,
        "SystemName": "Arabia",
        "Country": ["Jordan, Palastine"],
        "StartDate": '17/7/2024, 2:40 PM',
        "EndDate": '21/2/2024, 1:45 PM',
        "isRunning": true
    },
    {
        "PIRID": 2,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '20/7/2024, 11:40 PM',
        "EndDate": '22/7/2024, 3:45 PM',
        "isRunning": true
    },
    {
        "PIRID": 3,
        "SystemName": "COB",
        "Country": ["Jordan , Morocco"],
        "StartDate": '15/7/2024, 12:40 PM',
        "EndDate": '18/7/2024, 1:30 PM',
        "isRunning": true
    },
    {
        "PIRID": 4,
        "SystemName": "Helios",
        "Country": ["Jordan"],
        "StartDate": '21/7/2024, 1:10 PM',
        "EndDate": '22/7/2024, 6:30 PM',
        "isRunning": true
    },
    {
        "PIRID": 5,
        "SystemName": "Reflect",
        "Country": ["Jordan , Lebanon"],
        "StartDate": '16/7/2024, 1:40 PM',
        "EndDate": '18/7/2024, 3:30 PM',
        "isRunning": true
    },
    {
        "PIRID": 6,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '18/6/2024, 9:00 PM',
        "EndDate": '20/6/2024, 11:00 PM',
        "isRunning": true
    },
    {
        "PIRID": 7,
        "SystemName": "Reflect",
        "Country": ["Jordan"],
        "StartDate": '18/6/2024, 9:00 PM',
        "EndDate": '20/6/2024, 11:00 PM',
        "isRunning": true
    },
    {
        "PIRID": 8,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '18/6/2024, 9:00 PM',
        "EndDate": '20/6/2024, 11:00 PM',
        "isRunning": true
    },
    {
        "PIRID": 9,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '21/6/2024, 9:20 PM',
        "EndDate": '22/6/2024, 2:20 PM',
        "isRunning": true
    },
    {
        "PIRID": 10,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '23/6/2024, 3:20 PM',
        "EndDate": '26/6/2024, 6:20 PM',
        "isRunning": true
    },

    {
        "PIRID": 11,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '1/6/2024, 09:00 AM',
        "EndDate": '3/6/2024, 12:30 AM',
        "isRunning": true
    },
    {
        "PIRID": 12,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '4/6/2024, 10:00 AM',
        "EndDate": '4/6/2024, 1:30 AM',
        "isRunning": true
    },
    {
        "PIRID": 13,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '5/6/2024, 11:00 AM',
        "EndDate": '7/6/2024, 1:00 AM',
        "isRunning": true
    },
    {
        "PIRID": 14,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '8/6/2024, 12:00 AM',
        "EndDate": '10/6/2024, 1:00 AM',
        "isRunning": true
    },
    {
        "PIRID": 15,
        "SystemName": "Helios",
        "Country": ["Jordan"],
        "StartDate": '11/6/2024, 02:00 AM',
        "EndDate": '12/6/2024, 4:30 AM',
        "isRunning": true
    },
    {
        "PIRID": 16,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '13/6/2024, 10:00 PM',
        "EndDate": '15/6/2024, 1:30 PM',
        "isRunning": true
    },
    {
        "PIRID": 17,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '2/6/2024, 1:00 PM',
        "EndDate": '4/6/2024, 2:30 PM',
        "isRunning": true
    },
    {
        "PIRID": 18,
        "SystemName": "Helios",
        "Country": ["Jordan"],
        "StartDate": '2/6/2024, 12:00 AM',
        "EndDate": '4/6/2024, 2:30 AM',
        "isRunning": true
    },
    {
        "PIRID": 19,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '2/6/2024, 2:00 PM',
        "EndDate": '4/6/2024, 4:00 PM',
        "isRunning": true
    },
    {
        "PIRID": 20,
        "SystemName": "Reflect",
        "Country": ["Jordan"],
        "StartDate": '2/6/2024, 5:00 PM',
        "EndDate": '4/6/2024, 6:00 PM',
        "isRunning": true
    },

    {
        "PIRID": 21,
        "SystemName": "COB",
        "Country": ["Jordan"],
        "StartDate": '1/6/2024, 12:00 AM',
        "EndDate": '2/6/2024, 04:10 AM',
        "isRunning": true
    },
    {
        "PIRID": 22,
        "SystemName": "COB",
        "Country": ["Jordan"],
        "StartDate": '3 / 6 / 2024, 02:00 AM',
        "EndDate": '3/6/2024, 04:10 AM',
        "isRunning": true
    },
    {
        "PIRID": 23,
        "SystemName": "Helios",
        "Country": ["Jordan , Morocco"],
        "StartDate": '4/6/2024, 01:00 AM',
        "EndDate": '6/6/2024, 03:10 AM',
        "isRunning": true
    },
];


const PIRHistory = [
    {
        "PIRID": 1,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '1/6/2024, 9:20 AM',
        "EndDate": '2/6/2024, 2:30 AM',
        "isRunning": true
    },
    {
        "PIRID": 2,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '3/6/2024, 10:00 AM',
        "EndDate": '5/6/2024, 10:00 AM',
        "isRunning": true
    },
    {
        "PIRID": 3,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '6/6/2024, 9:20 AM',
        "EndDate": '8/6/2024, 9:20 AM',
        "isRunning": true
    },
    {
        "PIRID": 4,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '9/6/2024, 9:20 AM',
        "EndDate": '9/6/2024, 2:20 AM',
        "isRunning": true
    },
    {
        "PIRID": 5,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '10/6/2024, 9:20 AM',
        "EndDate": '12/6/2024, 12:20 AM',
        "isRunning": true
    },
    {
        "PIRID": 6,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '13/6/2024, 9:20 PM',
        "EndDate": '15/6/2024, 2:30 PM',
        "isRunning": true
    },
    {
        "PIRID": 7,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '16/6/2024, 10:00 PM',
        "EndDate": '17/6/2024, 12:00 PM',
        "isRunning": true
    },
    {
        "PIRID": 8,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '18/6/2024, 9:00 PM',
        "EndDate": '20/6/2024, 11:00 PM',
        "isRunning": true
    },
    {
        "PIRID": 9,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '21/6/2024, 9:20 PM',
        "EndDate": '22/6/2024, 2:20 PM',
        "isRunning": true
    },
    {
        "PIRID": 10,
        "SystemName": "Arabia",
        "Country": ["Jordan , Palastine"],
        "StartDate": '23/6/2024, 3:20 PM',
        "EndDate": '26/6/2024, 6:20 PM',
        "isRunning": true
    },

    {
        "PIRID": 11,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '1/6/2024, 09:00 AM',
        "EndDate": '3/6/2024, 12:30 AM',
        "isRunning": true
    },
    {
        "PIRID": 12,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '4/6/2024, 10:00 AM',
        "EndDate": '4/6/2024, 1:30 AM',
        "isRunning": true
    },
    {
        "PIRID": 13,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '5/6/2024, 11:00 AM',
        "EndDate": '7/6/2024, 1:00 AM',
        "isRunning": true
    },
    {
        "PIRID": 14,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '8/6/2024, 12:00 AM',
        "EndDate": '10/6/2024, 1:00 AM',
        "isRunning": true
    },
    {
        "PIRID": 15,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '11/6/2024, 02:00 AM',
        "EndDate": '12/6/2024, 4:30 AM',
        "isRunning": true
    },
    {
        "PIRID": 16,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '13/6/2024, 10:00 PM',
        "EndDate": '15/6/2024, 1:30 PM',
        "isRunning": true
    },
    {
        "PIRID": 17,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '2/6/2024, 1:00 PM',
        "EndDate": '4/6/2024, 2:30 PM',
        "isRunning": true
    },
    {
        "PIRID": 18,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '2/6/2024, 12:00 AM',
        "EndDate": '4/6/2024, 2:30 AM',
        "isRunning": true
    },
    {
        "PIRID": 19,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '2/6/2024, 2:00 PM',
        "EndDate": '4/6/2024, 4:00 PM',
        "isRunning": true
    },
    {
        "PIRID": 20,
        "SystemName": "FundBot",
        "Country": ["Jordan"],
        "StartDate": '2/6/2024, 5:00 PM',
        "EndDate": '4/6/2024, 6:00 PM',
        "isRunning": true
    },

    {
        "PIRID": 21,
        "SystemName": "COB",
        "Country": ["Jordan , Morocco"],
        "StartDate": '1/6/2024, 12:00 AM',
        "EndDate": '2/6/2024, 04:10 AM',
        "isRunning": true
    },
    {
        "PIRID": 22,
        "SystemName": "COB",
        "Country": ["Jordan , Morocco"],
        "StartDate": '3 / 6 / 2024, 02:00 AM',
        "EndDate": '3/6/2024, 04:10 AM',
        "isRunning": true
    },
    {
        "PIRID": 23,
        "SystemName": "COB",
        "Country": ["Jordan , Morocco"],
        "StartDate": '4/6/2024, 01:00 AM',
        "EndDate": '6/6/2024, 03:10 AM',
        "isRunning": true
    },
    {
        "PIRID": 24,
        "SystemName": "COB",
        "Country": ["Jordan , Morocco"],
        "StartDate": '7/6/2024, 12:00 AM',
        "EndDate": '9/6/2024, 02:00 AM',
        "isRunning": true
    },
    {
        "PIRID": 25,
        "SystemName": "COB",
        "Country": ["Jordan , Morocco"],
        "StartDate": '10/6/2024, 12:00 AM',
        "EndDate": '10/6/2024, 06:00 AM',
        "isRunning": true
    },
    {
        "PIRID": 26,
        "SystemName": "COB",
        "Country": ["Jordan , Morocco"],
        "StartDate": '11/6/2024, 12:10 PM',
        "EndDate": '13/6/2024, 3:10 PM',
        "isRunning": true
    },
    {
        "PIRID": 27,
        "SystemName": "COB",
        "Country": ["Jordan , Morocco"],
        "StartDate": '12/6/2024, 01:00 PM',
        "EndDate": '14/6/2024, 04:00 PM',
        "isRunning": true
    },
    {
        "PIRID": 28,
        "SystemName": "COB",
        "Country": ["Jordan , Morocco"],
        "StartDate": '12/6/2024, 02:10 PM',
        "EndDate": '14/6/2024, 04:10 PM',
        "isRunning": true
    },
    {
        "PIRID": 29,
        "SystemName": "COB",
        "Country": ["Jordan , Morocco"],
        "StartDate": '12/6/2024, 05:00 PM',
        "EndDate": '14/6/2024, 06:10 PM',
        "isRunning": true
    },
    {
        "PIRID": 30,
        "SystemName": "COB",
        "Country": ["Jordan , Morocco"],
        "StartDate": '15/6/2024, 12:00 PM',
        "EndDate": '15/6/2024, 4:10 PM',
        "isRunning": true
    },


    {
        "PIRID": 31,
        "SystemName": "Helios",
        "Country": ["Jordan"],
        "StartDate": '1/6/2024, 02:20 AM',
        "EndDate": '3/6/2024, 03:50 AM',
        "isRunning": true
    },
    {
        "PIRID": 32,
        "SystemName": "Helios",
        "Country": ["Jordan"],
        "StartDate": '4/6/2024, 12:20 AM',
        "EndDate": '4/6/2024, 03:50 AM',
        "isRunning": true
    },
    {
        "PIRID": 34,
        "SystemName": "Helios",
        "Country": ["Jordan"],
        "StartDate": '5/6/2024, 04:20 AM',
        "EndDate": '6/6/2024, 09:50 AM',
        "isRunning": true
    },
    {
        "PIRID": 35,
        "SystemName": "Helios",
        "Country": ["Jordan"],
        "StartDate": '7/6/2024, 6:20 AM',
        "EndDate": '9/6/2024, 8:50 AM',
        "isRunning": true
    },
    {
        "PIRID": 36,
        "SystemName": "Helios",
        "Country": ["Jordan"],
        "StartDate": '10/6/2024, 2:20 AM',
        "EndDate": '12/6/2024, 5:50 AM',
        "isRunning": true
    },
    {
        "PIRID": 37,
        "SystemName": "Helios",
        "Country": ["Jordan"],
        "StartDate": '13/6/2024, 3:50 PM',
        "EndDate": '15/6/2024, 6:50 PM',
        "isRunning": true
    },
    {
        "PIRID": 38,
        "SystemName": "Helios",
        "Country": ["Jordan"],
        "StartDate": '16/6/2024, 2:20 PM',
        "EndDate": '18/6/2024, 3:50 PM',
        "isRunning": true
    },
    {
        "PIRID": 39,
        "SystemName": "Helios",
        "Country": ["Jordan"],
        "StartDate": '19/6/2024, 6:20 PM',
        "EndDate": '23/6/2024, 9:50 PM',
        "isRunning": true
    },
    {
        "PIRID": 40,
        "SystemName": "Helios",
        "Country": ["Jordan"],
        "StartDate": '26/6/2024, 9:00 PM',
        "EndDate": '28/6/2024, 12:50 PM',
        "isRunning": true
    },
    {
        "PIRID": 41,
        "SystemName": "Helios",
        "Country": ["Jordan"],
        "StartDate": '29/6/2024, 7:20 PM',
        "EndDate": '30/6/2024, 12:50 PM',
        "isRunning": true
    },


    {
        "PIRID": 42,
        "SystemName": "Reflect",
        "Country": ["Jordan , Lebanon"],
        "StartDate": '1/6/2024, 8:00 AM',
        "EndDate": '3/6/2024, 12:10 AM',
        "isRunning": true
    }]


export const dataSource = [
    {
        icon: 'description',
        title: 'Recent PIR',
        tasks: recentPIRs,
    },
    {
        icon: 'taskhelpneeded',
        title: 'PIR history',
        tasks: PIRHistory
    },
];
