import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {CustomText} from '../../CommonComponent';
import CommonStyle from '../../../Theme/CommonStyle';
import {AppContext} from '../../../AppContext';
import Video from 'react-native-video';
import {height, width} from '../../../Utils/Constant';

const welcome = {
  video: require('../../../Theme/welcome.mp4'),
};

const Search = props => {
  const {appTheme} = useContext(AppContext);
  let player = React.useRef(null);

  return (
    <SafeAreaView
      style={[
        CommonStyle.flexContainer,
        CommonStyle.center,
        {backgroundColor: appTheme.background},
      ]}>
      <Video
        {...props}
        source={{
          uri: 'https://file-examples.com/storage/fe69f82402626533c98f608/2017/04/file_example_MP4_480_1_5MG.mp4',
        }}
        ref={ref => {
          player = ref;
        }}
        onError={error => console.log('error', error)}
        repeat={true}
        muted={true}
        pictureInPicture={true}
        disableFocus={true}
        resizeMode={'cover'}
        style={{height: height, width: width}}
      />
    </SafeAreaView>
  );
};

export default Search;
