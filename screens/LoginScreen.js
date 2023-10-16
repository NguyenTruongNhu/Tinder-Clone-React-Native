import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [type, setType] = useState(1);

  const { loading, setLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, [type]);

  const signIn = () => {
    if (email.trim() === "" || password.trim === "") {
      return Alert.alert("Ohhh!!", "You have not entered all details");
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const signUp = () => {
    if (name.trim() === "" || email.trim() === "" || password.trim === "") {
      return Alert.alert("Ohhh!!", "Bạn chưa nhập đầy đủ thông tin");
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: name });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={tw.style("flex-1 justify-center items-center")}>
        <Text style={tw.style("font-semibold text-red-400 text-2xl")}>
          Loading....
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      style={tw.style("flex-1")}
      resizeMode="cover"
      source={require("../assets/bg.png")}
    >
      {type === 1 ? (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Text style={tw.style("font-bold text-2xl")}>Sign In</Text>
          <Text style={tw.style("text-white font-semibold")}>
            Access to your account
          </Text>
          <View style={tw.style("w-full p-5")}>
            <Text style={tw.style("font-semibold pb-2 text-white")}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 mb-4"
              )}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={tw.style("font-semibold pb-2 text-white")}>
              Password
            </Text>
            <TextInput
              keyboardType="default"
              secureTextEntry={true}
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              )}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}
              onPress={signIn}
            >
              <Text style={tw.style("text-center text-white font-bold")}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType(2)}>
              <Text style={tw.style("text-center text-gray-100 pt-3")}>
                Doesn't have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={tw.style("flex-1 justify-center items-center")}>
          <Text style={tw.style("font-bold text-2xl")}>Sign Up</Text>
          <Text style={tw.style("text-white")}>Create a new account</Text>
          <View style={tw.style("w-full p-5")}>
            <Text style={tw.style("font-semibold pb-2 text-white")}>Name</Text>
            <TextInput
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 mb-4"
              )}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text style={tw.style("font-semibold pb-2 text-white")}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 mb-4"
              )}
              value={email}
              onChangeText={(text) => setEmail(text)}
              secureTextEntry={false}
            />
            <Text style={tw.style("font-semibold pb-2 text-white")}>
              Password
            </Text>
            <TextInput
              secureTextEntry={true}
              style={tw.style(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              )}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={tw.style("w-full rounded-lg mt-8 bg-black py-3")}
              onPress={signUp}
            >
              <Text style={tw.style("text-center text-white font-bold")}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType(1)}>
              <Text style={tw.style("text-center text-gray-100 pt-3")}>
                Already have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

export default LoginScreen;
