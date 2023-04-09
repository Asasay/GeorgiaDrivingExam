import * as React from 'react';
import {Image, useWindowDimensions} from 'react-native';
import ImageZoom from '@synconset/react-native-image-zoom';

export default function DynamicImage(props) {
  const [imageSize, setImageSize] = React.useState({width: 0, height: 0});
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  React.useEffect(() => {
    const imageOrig = Image.resolveAssetSource(props.source);
    const scaleFactor = imageOrig.width / (windowWidth - props.padding * 2);
    setImageSize({
      width: imageOrig.width / scaleFactor,
      height: imageOrig.height / scaleFactor,
    });
  }, [props.source]);

  return (
    <ImageZoom
      cropWidth={windowWidth}
      cropHeight={imageSize.height}
      imageWidth={imageSize.width}
      imageHeight={imageSize.height}
      minScale={1}>
      <Image source={props.source} style={[props.style, imageSize]} />
    </ImageZoom>
  );
}
