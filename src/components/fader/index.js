import _pt from "prop-types";
import _ from 'lodash';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import View from '../view';
import Image from '../image';
export let FaderPosition;

(function (FaderPosition) {
  FaderPosition["LEFT"] = "LEFT";
  FaderPosition["RIGHT"] = "RIGHT";
  FaderPosition["TOP"] = "TOP";
  FaderPosition["BOTTOM"] = "BOTTOM";
})(FaderPosition || (FaderPosition = {}));

const DEFAULT_FADE_SIZE = 50;

function Fader(props) {
  const getFadeSize = useCallback(() => {
    return props.size || DEFAULT_FADE_SIZE;
  }, [props.size]);
  const fadeSize = getFadeSize();
  const getStyles = useCallback(() => {
    const position = props.position || FaderPosition.RIGHT;
    let containerStyle, imageStyle, imageSource;

    switch (position) {
      case FaderPosition.LEFT:
        containerStyle = { ...staticStyles.containerLeft,
          width: fadeSize
        };
        imageStyle = {
          height: '100%',
          width: fadeSize
        };
        imageSource = require('./gradientLeft.png');
        break;

      case FaderPosition.RIGHT:
        containerStyle = { ...staticStyles.containerRight,
          width: fadeSize
        };
        imageStyle = {
          height: '100%',
          width: fadeSize
        };
        imageSource = require('./gradientRight.png');
        break;

      case FaderPosition.TOP:
        containerStyle = { ...staticStyles.containerTop,
          height: fadeSize
        };
        imageStyle = {
          height: fadeSize,
          width: '100%'
        };
        imageSource = require('./gradientTop.png');
        break;

      case FaderPosition.BOTTOM:
        containerStyle = { ...staticStyles.containerBottom,
          height: fadeSize
        };
        imageStyle = {
          height: fadeSize,
          width: '100%'
        };
        imageSource = require('./gradientBottom.png');
        break;
    }

    return {
      containerStyle,
      imageStyle,
      imageSource
    };
  }, [fadeSize, props.position]);
  const styles = getStyles();
  return <View pointerEvents={'none'} style={styles.containerStyle}>
      {(props.visible || _.isUndefined(props.visible)) && <Image source={styles.imageSource} tintColor={props.tintColor} style={styles.imageStyle} resizeMode={'stretch'} />}
    </View>;
}

Fader.propTypes = {
  /**
     * Whether the fader is visible (default is true)
     */
  visible: _pt.bool,

  /**
     * The position of the fader (the image is different), defaults to Fader.position.RIGHT
     */
  position: _pt.oneOf(["LEFT", "RIGHT", "TOP", "BOTTOM"]),

  /**
     * Set to change from the default size (50) of the fade view.
     */
  size: _pt.number,

  /**
     * Change the default (white) tint color of the fade view.
     */
  tintColor: _pt.string
};
Fader.displayName = 'Fader';
Fader.position = FaderPosition;
export default Fader;
const staticStyles = StyleSheet.create({
  containerTop: {
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  containerBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  containerLeft: {
    position: 'absolute',
    left: 0,
    height: '100%'
  },
  containerRight: {
    position: 'absolute',
    right: 0,
    height: '100%'
  }
});