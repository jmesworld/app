import { Text, TextProps } from '../Themed/Themed';

export default function StyledText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
