import {FC, forwardRef, ForwardRefRenderFunction, ReactNode, useEffect} from 'react';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import {NativeSyntheticEvent} from "react-native/Libraries/Types/CoreEventTypes";
import {
    TextInputContentSizeChangeEventData,
    TextInputProps
} from "react-native/Libraries/Components/TextInput/TextInput";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {TextStyle, ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type DynamicHeightInputType = TextInputProps & {
    /**
     * 输入框样式
     */
    inputStyle?: StyleProp<TextStyle> | undefined;
    /**
     * 最小高度
     * @default 40
     */
    minHeight?: number;
    /**
     * 最大高度
     * @default 155
     * */
    maxHeight?: number;
    /**
     * 输入框前面内容
     */
    Before?: ReactNode;
    /**
     * 输入框后面内容
     */
    After?: ReactNode;
    /**
     * 容器样式
     */
    style?: StyleProp<ViewStyle> | undefined;
};

const minHeight = 40;
const maxHeight = 155;
const DynamicHeightInput:  ForwardRefRenderFunction<TextInput, DynamicHeightInputType> = ( props,
                                                                                           ref,
) => {
    let inputHeight = useSharedValue(props.minHeight || minHeight);

    const animatedInputStyle = useAnimatedStyle(() => ({
        height: inputHeight.value,
    }));

    useEffect(() => {
        if (!props.value){
            inputHeight.value = props.minHeight || minHeight;
        }
    }, [props.value]);

    const handleContentSizeChange = (
        event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
    ) => {
        const minHeightValue = props.minHeight || minHeight;
        const maxHeightValue = props.maxHeight || maxHeight;
        const newHeight =
            Platform.OS === 'android'
                ? event.nativeEvent.contentSize.height
                : event.nativeEvent.contentSize.height + 22;
        if (newHeight > maxHeightValue) {
            inputHeight.value = maxHeightValue;
            return;
        }
        if (newHeight > minHeightValue) {
            inputHeight.value = newHeight;
        } else {
            inputHeight.value = minHeightValue;
        }
        props.onContentSizeChange?.(event);
    };

    return (
        <View style={[styles.container, props.style]}>
            <View>{props.Before}</View>
            <Animated.View style={[styles.textInputContainer, animatedInputStyle]}>
                <TextInput
                    {...props}
                    ref={ref}
                    multiline={true}
                    style={[styles.textInput, props.inputStyle]}
                    textAlignVertical={props.textAlignVertical || 'center'}
                    onContentSizeChange={handleContentSizeChange}
                />
            </Animated.View>
            <View>{props.After}</View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        borderWidth: 1,
        borderColor:'rgba(0,0,0,0.07)',
        borderRadius: 5,
    },
    textInputContainer: {
        paddingTop: Platform.OS === 'ios' ? 7 : 0,
        flex: 1,
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        paddingLeft:10,
        paddingRight:5,
        textAlignVertical: 'center',
    },
});

export default forwardRef(DynamicHeightInput);
