import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

// Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 640;

function horizontalscale(size: number) {
  return (shortDimension / guidelineBaseWidth) * size;
}
function verticalScale(size: number) {
  return (longDimension / guidelineBaseHeight) * size;
}
function moderateScale(size: number, factor = 0.5) {
  return size + (horizontalscale(size) - size) * factor;
}
function moderateVerticalScale(size: number, factor = 0.5) {
  return size + (verticalScale(size) - size) * factor;
}

export default {
  hs: horizontalscale,
  vs: verticalScale,
  ms: moderateScale,
  mvs: moderateVerticalScale,
};
