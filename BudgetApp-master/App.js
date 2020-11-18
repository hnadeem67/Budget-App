import * as React from "react";
import { Image, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import "./profileScreen.css";
import logo from "./app/assets/man.png";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{ padding: 20, alignItems: "center", justifyContent: "center" }}
      >
        <Image source={logo} style={{ height: 100, width: 100 }}></Image>
      </View>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ paddingBottom: "5%", fontSize: 25 }}>Profile Name</Text>
      </View>

      <View style={{ paddingLeft: "5%" }}>
        <Text style={{ color: "#e91e63" }}>Account Settings</Text>
      </View>

      <div className="btn-group">
        <ul style={{ listStyle: "none" }}>
          <li>
            <button>Change Name</button>
          </li>
          <li>
            <button>Change Address</button>
          </li>
          <li>
            <button>Change Phone Number</button>
          </li>
          <li>
            <button>Change Email</button>
          </li>
        </ul>
      </div>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <div className="deleteButton">
          <button>Delete Account</button>
        </div>
      </View>
    </View>
  );
}

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

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
