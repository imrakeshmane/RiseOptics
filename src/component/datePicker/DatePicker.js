// import * as React from 'react';
// import { Button } from 'react-native-paper';
// import moment from 'moment';
// import DateTimePicker from '@react-native-community/datetimepicker';

// import { DatePickerModal } from 'react-native-paper-dates';

// const DateTimePicker = (props) => {
//     const { setDaterange, dateRange } = props;
//     const [range, setRange] = React.useState({
//         startDate: undefined,
//         endDate: Date | undefined,
//     });
//     const [open, setOpen] = React.useState(false);

//     const onDismiss = React.useCallback(() => {
//         setOpen(false);
//     }, [setOpen]);

//     const onConfirm = React.useCallback(
//         ({ startDate, endDate }) => {
//             setOpen(false);
//             setRange({ startDate, endDate });
//             setDaterange({ ...dateRange, firstDate: moment(startDate).format("YYYY-M-D"), secondDate: moment(endDate).format("YYYY-M-D") })

//         },
//         [setOpen, setRange]
//     );

//     return (
//         <>
//             <Button onPress={() => setOpen(true)} color={'#2196F3'} uppercase={false} mode="outlined" style={{ marginVertical: 10, }}>
//                 Select Date
//             </Button>
//             <DatePickerModal
//                 locale="en"
//                 mode="range"
//                 visible={open}
//                 onDismiss={onDismiss}
//                 startDate={range?.startDate}
//                 endDate={range?.endDate}
//                 onConfirm={onConfirm}
//             // validRange={{
//             //   startDate: new Date(2021, 1, 2),  // optional
//             //   endDate: new Date(), // optional
//             //   disabledDates: [new Date()] // optional
//             // }}
//             // onChange={} // same props as onConfirm but triggered without confirmed by user
//             // saveLabel="Save" // optional
//             // uppercase={false} // optional, default is true
//             // label="Select period" // optional
//             // startLabel="From" // optional
//             // endLabel="To" // optional
//             // animationType="slide" // optional, default is slide on ios/android and none on web
//             />
//         </>
//     );
// }
// export default DateTimePicker;
import React, { useState } from 'react';
import { View, Platform, SafeAreaView, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';
import moment from 'moment';

const DateTimePickerModel = (props) => {
    const { setDaterange, dateRange, setRefresh, refresh } = props;
    const [mydate, setDate] = useState(new Date());
    const [displaymode, setMode] = useState('date');
    const [isDisplayDate, setShow] = useState(false);
    const changeSelectedDate = (event, selectedDate) => {
        const currentDate = selectedDate || mydate;
        setDate(currentDate);
        setDaterange({ ...dateRange, firstDate: moment(selectedDate).format("YYYY-M-D") })
        console.log(moment(selectedDate).format("YYYY-M-D"), 'selectedDate')
        setRefresh(refresh + 1);
    };

    const displayDatepicker = (props) => {
        setShow(true);

    };
    return (
        <View>

            <Button onPress={displayDatepicker} color={'#2196F3'} uppercase={false} mode="outlined" style={{ marginVertical: 10, }}>
                Select Date
            </Button>

            {isDisplayDate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={mydate}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={changeSelectedDate}

                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
});

export default DateTimePickerModel;
