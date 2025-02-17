# react-native-dynamic-height-input
react-native的动态高度输入框

## 安装

### npm
```
npm install react-native-dynamic-height-input --save
```

### yarn
```
yarn add react-native-dynamic-height-input
```


## 使用
```
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {DynamicHeightInput} from "react-native-dynamic-height-input";

type DemoType = {};

const Demo: FC<DemoType> = () => {


  return (
    <View style={styles.container}>
      <DynamicHeightInput
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
});

export default Demo;

```



## 属性
| 属性名        | 类型                   | 说明    |
|------------|----------------------|-------|
| inputStyle | StyleProp<TextStyle> | 输入框样式 |
| minHeight  | number               | 最小高度  |
| maxHeight  | number               | 最大高度  |
| Before     | ReactNode            | 前置内容  |
| After      | ReactNode            | 后置内容  |
| style      | StyleProp<ViewStyle> | 容器样式  |


