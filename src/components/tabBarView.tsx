import React from 'react';
import {Animated, View, TouchableOpacity, StyleSheet, Text, ScrollView} from 'react-native';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {useTheme} from './themeContext';
import { Divider } from 'react-native-paper';

const TabBarView: React.FC<MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
  position,
}) => {
  const {theme} = useTheme();
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator = {false} >
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        let label: string;
        if (typeof options.tabBarLabel === 'string') {
          label = options.tabBarLabel;
        } else if (typeof options.title === 'string') {
          label = options.title;
        } else {
          label = route.name;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        // const opacity = position.interpolate({
        //   inputRange,
        //   outputRange: inputRange.map(i => (i === index ? 1 : 0.3)),
        // });

        const opacity = isFocused ? 1 : 0.3;
        const weigth = isFocused ? '700' : '500';
        const color = isFocused ? theme.colors.topTab.activeColor : theme.colors.topTab.inactiveColor;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            
            <View>
            <Text
              style={{
                opacity: opacity,
                fontWeight: weigth,
                textAlign : "center",
                paddingHorizontal :  16,
                fontSize : 16,
                fontFamily : 'OpenSans-Regular',
                color : color,
              }}>
              {label ? label : ''}
            </Text>
            <Divider
              style = {{
                height : isFocused ? 5 : 0,
                margin : 8,
                borderRadius : 3,
                backgroundColor :color
              }}/>
            </View>
          </TouchableOpacity>
        );
      })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    
  },
});

export default TabBarView;
