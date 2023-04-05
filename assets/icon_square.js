import React from 'react';
import Svg, {Path} from 'react-native-svg';

const IconSquare = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" height={10} width={10} {...props}>
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path fill="green" d="M3 3h18v18H3z" />
  </Svg>
);

export default IconSquare;
