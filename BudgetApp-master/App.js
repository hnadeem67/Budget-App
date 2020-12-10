import * as React from "react";
import {
  SectionList,
  ScrollView,
  Image,
  Text,
  View,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import logo from "./app/assets/man.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton, Colors } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { Container, Header, Content, Accordion } from "native-base";
import { getReceipt, storeData, removeEverything } from "./app/Storage.js";

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
      <Stack.Screen name="Storage" component={StorageScreen} />
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
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="receipt"
          color={"#e91e63"}
          size={25}
          onPress={() => navigation.navigate("Storage")}
          style={{ alignSelf: "flex-end" }}
        />
      ),
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ paddingLeft: "5%", paddingTop: "20%" }}>
        <Text style={{ color: "#e91e63", fontSize: 20, paddingTop: "75%" }}>
          Recent Transactions
        </Text>
      </View>
      <View style={styles.container}>
        <SectionList
          sections={[
            {
              title: "December 2020",
              data: [
                "APPLE.COM/BILL 12/07                          -$5.99",
                "PlaystationNetwork 12/07                     -$10.88",
                "Subway 12/06                                         -$13.27",
                "TARGET 12/03                                        -$17.46",
              ],
            },
            {
              title: "November 2020",
              data: [
                "Subway 11/25                                         -$12.19",
                "BR FACTORY.COM 11/20                      -$19.72",
                "NYTimes 11/17                                         -$4.00",
                "Subway 11/14                                           -$13.27",
                "SAFEWAY 11/13                                      -$18.39",
                "PlaystationNetwork 11/07                     -$10.88",
                "CHIK-FIL-A 11/04                                    -$14.13",
              ],
            },
            {
              title: "October 2020",
              data: [
                "VERIZON WRLS 10/23                          -$43.32",
                "CHIK-FIL-A 10/20                                   -$30.22",
                "NYTimes 10/17                                         -$4.00",
                "Subway 10/15                                       -$13.05",
              ],
            },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
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
          "Target 12/03                                                           $17.46",
        ],
      },
      {
        title: "November 2020",
        content: [
          "Subway 11/25                                                         $12.19 \n\n",
          "BR FACTORY.COM 11/20                                       $19.72 \n\n",
          "NYTimes 11/17                                                         $4.00 \n\n",
          "PlaystationNetwork 11/07                                     $10.88",
        ],
      },
      {
        title: "October 2020",
        content: [
          "SAFEWAY 10/27                                                    $18.39 \n\n",
          "Khols 10/23                                                            $21.99",
        ],
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
