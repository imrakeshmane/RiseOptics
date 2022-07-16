import { Card, Button } from 'react-native-paper';
import * as React from 'react';
import APIURL from '../../utils/urlConfig';
import { Image } from 'react-native'

const BannerAdds = ({ url, height }) => (

    <Image source={{ uri: APIURL + url }} style={{ height: height, width: '100%' }} />


);

export default BannerAdds;