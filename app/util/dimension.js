import React from 'react';
import { Platform, } from 'react-native';
import debounce from 'debounce';

function getTimestamp() {
  return new Date();
}

export function onLayoutUpdate(options) {
  this.props.setAppDimensions(options.nativeEvent.layout);
  this.setState({
    forceRerender: getTimestamp(),
    layout: options.nativeEvent.layout,
  });
  // console.log('onLayoutUpdate', { options, },'options.nativeEvent',options.nativeEvent,);
}

export function setLayoutHandler() {
  // console.log('called setLayoutHandler');
  function resize(e) {
    // console.log({ e });
    onLayoutUpdate.call(this,{
      nativeEvent: {
        layout: {
          height: window.innerHeight,
          width: window.innerWidth,
          x: 0,
          y: 0,
        },
      },
    });
  }

  if (Platform.OS === 'web') {
    window.onresize = debounce(resize.bind(this), 200);
  } 
}
