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

  const setImageRealSize = (width, height) => {
    const scaleFactor = width / (wwidth - props.padding * 2);
    setImageSize({width: width / scaleFactor, height: height / scaleFactor});
  };

  React.useEffect(() => {
    Image.getSize(props.source.uri, (w, h) => setImageRealSize(w, h));
  }, [props.source.uri]);

  return (
    <View>
      {isLoading && (
        <View style={{position: 'absolute', left: 0, right: 0, top: 100}}>
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color="hsba(203, 6%, 91%, 1)"
          />
        </View>
      )}
      <Image
        source={props.source}
        style={[props.style, imageSize]}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoad={e => {
          setIsLoading(false);
        }}
      />
    </View>
  );
}
