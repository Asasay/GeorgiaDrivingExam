import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  useWindowDimensions,
  View,
} from 'react-native';

export default function DynamicImage(props) {
  const [imageSize, setImageSize] = React.useState({width: 0, height: 0});
  const [isLoading, setIsLoading] = React.useState(false);
  const wwidth = useWindowDimensions().width;

  const setImageRealSize = ({width, height}) => {
    const scaleFactor = width / (wwidth - props.padding * 2);
    setImageSize({width: width / scaleFactor, height: height / scaleFactor});
  };

  return (
    <View>
      {isLoading ? (
        <View style={{position: 'absolute', left: 0, right: 0, top: 100}}>
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color="hsba(203, 6%, 91%, 1)"
          />
        </View>
      ) : null}
      <Image
        source={props.source}
        style={[props.style, imageSize]}
        onLoad={({
          nativeEvent: {
            source: {width, height},
          },
        }) => {
          setImageRealSize({width, height});
        }}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
      />
    </View>
  );
}
