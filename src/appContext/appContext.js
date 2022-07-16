import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [session, setSession] = useState({
        firstnName: '',
        lastName: '',
        userInfo: {
            "userID": "1",
            "userFirstName": "Rakesh M",
            "userLastName": "Mane",
            "userAddress": "Test",
            "userPincode": "12345",
            "userPhone": "9970224843",
            "userEmail": "rakesh@myopmail.com",
            "userPassword": "12345678",
            "userIsSubcription": "1",
            "userSubDate": "0000-00-00",
            "userIsLogin": "1",
            "userCreatedDate": "2022-07-13",
            "userUpdatedDate": "2022-07-13",
            "userIsDeleted": "1",
            "userIsActivated": "1"
        },
        employeeInfo: {
            "employeeId": "1",
            "userId": "1",
            "employeeFirstName": "test",
            "employeeLastName": "test",
            "employeeType": "2",
            "employeePhone": "999999999",
            "employeeIsActivated": "1",
            "employeeIsDeleted": "1",
            "employeeAppAccess": "2",
            "employeeCreatedDate": "0000-00-00",
            "employeeUpdatedDate": "1-2-2022"
        },
        token: 'Optics Solution',
        companyName: '',
        isforceToUpdate: false,
        monthsList: [
            {
                label: "January",
                "short": "Jan",
                value: 1,
                "days": 31
            },
            {
                label: "February",
                "short": "Feb",
                value: 2,
                "days": 28
            },
            {
                label: "March",
                "short": "Mar",
                value: 3,
                "days": 31
            },
            {
                label: "April",
                "short": "Apr",
                value: 4,
                "days": 30
            },
            {
                label: "May",
                "short": "May",
                value: 5,
                "days": 31
            },
            {
                label: "June",
                "short": "Jun",
                value: 6,
                "days": 30
            },
            {
                label: "July",
                "short": "Jul",
                value: 7,
                "days": 31
            },
            {
                label: "August",
                "short": "Aug",
                value: 8,
                "days": 31
            },
            {
                label: "September",
                "short": "Sep",
                value: 9,
                "days": 30
            },
            {
                label: "October",
                "short": "Oct",
                value: 10,
                "days": 31
            },
            {
                label: "November",
                "short": "Nov",
                value: 11,
                "days": 30
            },
            {
                label: "December",
                "short": "Dec",
                value: 12,
                "days": 31
            }
        ],

    });
    const getUserDetails = async () => {
        let user = await AsyncStorage.getItem('UserInfo');
        let userInfo = JSON.parse(user);
        if (userInfo) {
            console.log(userInfo, 'context')
            setSession(userInfo);
        }
    }
    useEffect(() => {
        getUserDetails();
    }, []);
    return (
        <AppContext.Provider value={{ session, setSession }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
