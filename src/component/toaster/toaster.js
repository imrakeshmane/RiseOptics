import {
    ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native';

const Toaster = (msg) => {

    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT, ToastAndroid.TOP)
    } else {
        AlertIOS.alert(msg);
    }
}

export default Toaster;