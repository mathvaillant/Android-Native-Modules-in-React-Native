import React, {useEffect, useMemo, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyEventListener } from './NativeModules/KeyEvent/KeyEvent';
import { EventAction } from './NativeModules/KeyEvent/types';
import { VolumeKeys } from './NativeModules/KeyEvent/keyMapping';

function App(): React.JSX.Element {
  const [barHeight, setBarHeight] = useState(10);

  const memoStyles = useMemo(() => styles(barHeight), [barHeight]);

  useEffect(() => {
    KeyEventListener.addListener(EventAction.ACTION_DOWN, ({ keyName }) => {
      if (keyName === VolumeKeys.KEYCODE_VOLUME_UP) {
        return setBarHeight(prev => Math.min(prev+10, 100))
      }

      if (keyName === VolumeKeys.KEYCODE_VOLUME_DOWN) {
        return setBarHeight(prev => Math.max(prev-10, 0))
      }
    })

    return () => {
      KeyEventListener.removeListener(EventAction.ACTION_DOWN)
    }
  }, [])

  return (
    <SafeAreaView>
      <View style={memoStyles.container}>
        <View style={memoStyles.outer}>
          <View style={memoStyles.icons}>
            <Entypo name="light-up" size={50} color="black" />
            <Entypo name="light-down" size={50} color="black" />
          </View>
          <View style={memoStyles.inner} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const outerRoundedCorner = 60;
const innerRoundedCorner = outerRoundedCorner - 5;

const styles = (barHeight: number) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      height: '100%',
    },
    outer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: 'lightgray',
      width: Dimensions.get('window').width / 2,
      height: '80%',
      borderTopEndRadius: outerRoundedCorner - 5,
      borderTopStartRadius: outerRoundedCorner - 5,
      borderBottomRightRadius: outerRoundedCorner - 5,
      borderBottomLeftRadius: outerRoundedCorner - 5,
    },
    icons: {
      position: 'absolute',
      zIndex: 1,
      height: '100%',
      justifyContent: 'space-between',
      padding: 20,
    },
    inner: {
      backgroundColor: 'gray',
      width: Dimensions.get('window').width / 2,
      height: `${barHeight}%`,
      borderBottomRightRadius: innerRoundedCorner,
      borderBottomLeftRadius: innerRoundedCorner,
      borderTopEndRadius: barHeight > 90 ? innerRoundedCorner : 0,
      borderTopStartRadius: barHeight > 90 ? innerRoundedCorner : 0,
    },
  });

export default App;
