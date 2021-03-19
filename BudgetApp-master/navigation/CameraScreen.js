
import React, { useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { IconButton, Colors } from "react-native-paper";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const cameraAddScreen = ({ navigation }) => {

    const cameraRef = useRef(null)
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isPreview, setIsPreview] = useState(false);

    const takePicture = async () => {
        if (cameraRef && isCameraReady) {
            let { uri }= await cameraRef.current.takePictureAsync();
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if(status === 'granted') {
                const asset = await MediaLibrary.createAssetAsync(uri);
                
                if (uri) {
                    await cameraRef.current.pausePreview();
                    setIsPreview(true);
                    console.log("picture source", uri);
                }
            }
        } else {
            alert('Error!!!')
        }
    }

    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    const cancelPreview = async () => {
        await cameraRef.current.resumePreview();
        setIsPreview(false);
    };

    const saveAndPreviewBtns = () => (
     <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.buttonSave, styles.roundButton]}
            onPress={save}>
            <Text style={styles.text}> Save </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.buttonPreviewPicture, styles.roundButton]}
            onPress={cancelPreview}>
            <Text style={styles.text}> Cancel Preview </Text>
        </TouchableOpacity>
    </View>
    );
    

    const save = () => {
        console.log('saved!');
        return <view />
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera}
                onCameraReady={onCameraReady}
                ref={cameraRef} />
               
               {!isPreview &&  
                 <View style={styles.buttonContainer}>
                    <IconButton style={styles.buttonTakePicture}
                        icon="camera"
                        color={Colors.pink500}
                        size={45}
                        onPress={takePicture} />

                 </View>}
                {isPreview  && saveAndPreviewBtns()}
        </View>
        );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 0,
      borderColor: Colors.pink500,
      borderTopWidth: 2,
      flexDirection: 'row',
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      paddingRight: 10,
      justifyContent: 'space-between'
    },
    buttonTakePicture: {
      flex: 1,
      alignSelf: 'center',
      borderRadius: 100,
      padding: 10,
      elevation: 2,
    },
    buttonPreviewPicture: {
      backgroundColor: "#e91e63",
    },
    buttonSave: {
        backgroundColor: "#1ee9a4"
      },
    text: {
      fontSize: 18,
      color: 'white',
    },
    roundButton: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
});

export default cameraAddScreen;