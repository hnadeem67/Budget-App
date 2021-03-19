import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton, Colors } from "react-native-paper";
import { Camera } from 'expo-camera';
import { createStackNavigator } from '@react-navigation/stack';
import cameraAddScreen from './CameraScreen';
import scannerAddScreen from './CameraScreen';

const addReceiptMainScreen = ({ navigation }) => {
  
    const [hasPermission, setHasPermission] = useState(null);
    
    const openCamera = async() => {
     const { status } = await Camera.requestPermissionsAsync();
                        await Camera.requestP
        setHasPermission(status === 'granted');
        
        if(status === 'granted') {
          navigation.navigate('cameraAddScreen')
        }
    }
  
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    
    const styles = StyleSheet.create({
      screenButtonContainer: {
        justifyContent: "center", 
        alignItems: "center",
      }
    })
  
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={styles.screenButtonContainer}>
            <IconButton
              icon="scanner"
              color={Colors.pink500}
              size={75}
            /><Text>Scan Receipt</Text>
          </View>
          <View style = {styles.screenButtonContainer}>      
            <IconButton
              icon="camera"
              color={Colors.pink500}
              size={75}
              onPress={openCamera} />
            <Text>Take Picture</Text>
          </View>
        </View>
      );
}

const AddReceiptsStack = createStackNavigator();

function ReceiptsStackScreen() {
  return (
    <AddReceiptsStack.Navigator>
      <AddReceiptsStack.Screen 
        name="addReceiptMainScreen" 
        component={addReceiptMainScreen}
        options={{ title: 'Add Receipts' }} />
      <AddReceiptsStack.Screen 
        name="cameraAddScreen" 
        component={cameraAddScreen} 
        options={{ title: 'Camera Add Receipt' }} />
      <AddReceiptsStack.Screen 
        name="scannerAddScreen" 
        component={scannerAddScreen} 
        options={{ title: 'Scanner Add Receipt' }} />
    </AddReceiptsStack.Navigator>
  );
}

export default ReceiptsStackScreen;