import * as React from "react";
import { useState } from "react";
import {
  SectionList,
  ScrollView,
  Image,
  Text,
  View,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import logo from "./app/assets/nerd-male-profile-avatar.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton, Colors } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { Container, Header, Content, Accordion } from "native-base";
import { getReceipt, storeData, removeEverything } from "./app/Storage.js";
import { LineChart, PieChart } from "react-native-chart-kit";
import Svg from "react-native-svg";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(233,30,99, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const dataPie = [
  {
    name: "| Bills",
    population: 16.87,
    color: "blue",
    legendFontColor: "black",
    legendFontSize: 15,
  },
  {
    name: "| Food",
    population: 13.27,
    color: "#F00",
    legendFontColor: "black",
    legendFontSize: 15,
  },
  {
    name: "| Shopping",
    population: 17.46,
    color: "orange",
    legendFontColor: "black",
    legendFontSize: 15,
  },
];

const dataLine = {
  labels: ["Oct 2020", "Nov 2020", "Dec 2020"],
  datasets: [
    {
      data: [679.13, 213.57, 47.6],
      color: (opacity = 1) => `rgba(233, 30, 99, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
};

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: "#e91e63",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Transactions" component={StorageScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const [budget, setBudget] = React.useState("0.00");
  const [modalVisible, setModalVisible] = useState(false);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="receipt"
          color={"#e91e63"}
          size={25}
          onPress={() => navigation.navigate("Transactions")}
          style={{ alignSelf: "flex-end" }}
        />
      ),
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginLeft: "5%", paddingTop: "5%" }}>
        <Text style={{ color: "#e91e63", fontSize: 20 }}>
          Spending Overview
        </Text>
        <Text style={{ paddingTop: "2.5%", paddingBottom: "2.5%" }}>
          Monthly
        </Text>
      </View>
      <View>
        <LineChart
          data={dataLine}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
      </View>

      <View style={{ marginLeft: "5%", paddingTop: "5%" }}>
        <Text style={{ color: "#e91e63", fontSize: 20 }}>Spending Summary</Text>
        <Text style={{ paddingTop: "2.5%" }}>December 2020</Text>
        <Text style={{ paddingBottom: "2.5%", color: "#e91e63" }}>
          $47.60/$
          {budget}
        </Text>
      </View>
      <View>
        <PieChart
          data={dataPie}
          width={screenWidth}
          height={250}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter budget</Text>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <TextInput
                  style={styles.name}
                  onChangeText={(val) => setBudget(val)}
                />
              </View>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#e91e63" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Done</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Edit Budget</Text>
        </TouchableHighlight>
      </View>
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
          paddingTop: "15%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={logo} style={{ height: 90, width: 90 }}></Image>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "2.5%",
          paddingBottom: "2.5%",
        }}
      >
        <Text style={{ fontSize: 35 }}>{name}</Text>
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

async function StorageExample() {
  //removeEverything()
  await storeData([
    {
      keyid: "1",
      name: "Walmart",
      price: "$1",
    },
    {
      keyid: "2",
      name: "Amazon",
      price: "$5",
    },
    {
      keyid: "3",
      name: "McDonalds",
      price: "$15",
    },
  ]);
}

async function StorageLoad() {
  try {
    StorageExample();
    var data = await getReceipt();
    console.log(data[1]);
    return data;
  } catch (e) {
    //caught
  }
}

const StorageScreen = () => {
  try {
    let data = StorageLoad();
    console.log(data);

    const dataArrayAttempt = [];
    for (var i = 0; i < data.length; i++) {
      dataArrayAttempt.push({
        title: JSON.stringify(data[i]["name"]),
        content: JSON.stringify(data[i]["price"]),
      });
    }

    const dataArray = [
      {
        title: "December 2020",
        content: [
          "APPLE.COM/BILL 12/07                                          $5.99 \n\n",
          "PlaystationNetwork 12/07                                    $10.88 \n\n",
          "Subway 12/06                                                        $13.27\n\n",
          "Target 12/03                                                           $17.46\n\n",
          "                                                                       Total: $47.6",
        ],
      },
      {
        title: "November 2020",
        content: [
          "Subway 11/25                                                         $12.19 \n\n",
          "VERIZON WRLS 11/23                                         $115.00\n\n",
          "BR FACTORY.COM 11/20                                       $19.72 \n\n",
          "NYTimes 11/17                                                         $4.00 \n\n",
          "Subway 11/14                                                         $13.27\n\n",
          "Safeway 11/13                                                        $18.39\n\n",
          "APPLE.COM/BILL 11/07                                          $5.99\n\n",
          "PlaystationNetwork 11/07                                     $10.88\n\n",
          "CHIK-FIL-A 11/04                                                   $14.13\n\n",
          "                                                                   Total: $213.57",
        ],
      },
      {
        title: "October 2020",
        content: [
          "VERIZON WRLS 10/23                                        $115.00 \n\n",
          "Khols 10/23                                                            $21.99\n\n",
          "CHIK-FIL-A 10/20                                                  $30.22\n\n",
          "NYTimes 10/17                                                        $4.00\n\n",
          "FINISH LINE 10/16                                              $478.00\n\n",
          "Subway 10/16                                                         $13.05\n\n",
          "APPLE.COM/BILL 10/07                                          $5.99\n\n",
          "PlaystationNetwork 10/07                                    $10.88\n\n",
          "                                                                   Total: $679.13",
        ],
      },
      {
        title: "September 2020",
      },
      {
        title: "August 2020",
      },
      {
        title: "July 2020",
      },
      {
        title: "June 2020",
      },
      {
        title: "April 2020",
      },
      {
        title: "March 2020",
      },
      {
        title: "February 2020",
      },
      {
        title: "January 2020",
      },
    ];

    return (
      <Container>
        <Content padder>
          <Accordion dataArray={dataArray} icon="add" expandedIcon="remove" />
        </Content>
      </Container>
    );
  } catch (e) {}
};

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
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  container2: {
    alignItems: "center",
    justifyContent: "center",
    height: 1050,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#e91e63",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
        component={RootNavigation}
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
