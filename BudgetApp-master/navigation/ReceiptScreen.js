import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton, Colors } from "react-native-paper";
import { Camera } from 'expo-camera';

const ReceiptScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const openCamera = async() => {
   const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
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

export default ReceiptScreen;