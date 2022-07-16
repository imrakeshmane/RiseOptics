import moment from 'moment';
import React from 'react';
import { Share, View, StyleSheet } from 'react-native';
import { Button, } from 'react-native-paper';
import IonicIcons from 'react-native-vector-icons/Ionicons';

const ShareInfo = ({ price }) => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Total:' + price + ' Date:' + moment().format("DD-MM-YYYY h:mm"),

            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <View style={{ margin: 20 }}>
            <Button color={'#2196F3'} style={styles.btnSerach} mode="contained" onPress={onShare}>
                <IonicIcons name="share" style={styles.icon} size={20} color={'white'} />  Share
            </Button>

        </View>
    );
};

const styles = StyleSheet.create({

    btnSerach: {
        width: '50%',
        marginBottom: 10
    },
})
export default ShareInfo;