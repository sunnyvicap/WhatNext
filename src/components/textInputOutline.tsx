import React from 'react';
import { ColorValue, TextInputIOSProps, TextStyle } from 'react-native';
import { StyleProp, TextInputAndroidProps, ViewStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

interface TextInputOutline extends TextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  textContentType?: TextInputIOSProps["textContentType"];
  rightIcon?: string;
  underlineColor?: string;
  mode?: "outlined" | "flat";
  style?: StyleProp<ViewStyle>;
  inputColor?: ColorValue
  outlineStyle?: StyleProp<ViewStyle>;
}

const TextInputOutlineStyle: React.FC<TextInputOutline> = ({
  placeholder,
  value,
  onChangeText,
  textContentType,
  mode = "outlined",
  rightIcon = "map-marker-outline",
  underlineColor,
  style,
  outlineStyle,
  inputColor = "#212121",
  ...restProps
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      underlineColor={underlineColor}
      textContentType={textContentType}
      textAlign='left'
      mode={mode}
      value={value}
      style={[{
        backgroundColor: '#0000000',
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
        color: inputColor
      }, style]}
      right={<TextInput.Icon icon={rightIcon} />}
      onChangeText={onChangeText}

      outlineStyle={[{
        backgroundColor: "#E0F7FA",
        borderRadius: 22,
        paddingHorizontal: 8,
        borderColor: "#00897B",
        borderWidth: 0.5,
      }, outlineStyle]}
      {...restProps}
    />
  );
};

export default TextInputOutlineStyle;
