import * as React from "react";
import { Camera, Image, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import logo from "./app/assets/man.png";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function ReceiptScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Receipt!</Text>
    </View>
  );
}

function ProfileScreen() {
  const [name, setName] = React.useState("Profile Name");
  const [address, setAddress] = React.useState("Address");
  const [phone, setPhone] = React.useState("Phone Number");
  const [email, setEmail] = React.useState("Email");
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          paddingTop: "10%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={logo} style={{ height: 100, width: 100 }}></Image>
      </View>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ paddingBottom: "5%", fontSize: 35 }}>{name}</Text>
      </View>

      <View style={{ paddingLeft: "5%", paddingBottom: "5%" }}>
        <Text style={{ color: "#e91e63", fontSize: 20 }}>Account Settings</Text>
      </View>

      <View style={{ paddingLeft: "5%", paddingTop: "2.5%" }}>
        <Text>Name</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TextInput style={styles.name} onChangeText={(val) => setName(val)} />
        </View>

        <Text>Address</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TextInput
            style={styles.address}
            onChangeText={(val) => setAddress(val)}
          />
        </View>

        <Text>Phone Number</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TextInput
            style={styles.phone}
            onChangeText={(val) => setPhone(val)}
          />
        </View>

        <Text>Email</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TextInput
            style={styles.email}
            onChangeText={(val) => setEmail(val)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 350,
  },
  address: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 350,
  },
  phone: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 350,
  },
  email: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 350,
  },
});

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Receipt"
        component={ReceiptScreen}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
