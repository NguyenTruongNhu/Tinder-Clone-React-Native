import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { db, timestamp } from "../firebase";

const ModalScreen = () => {
  const { user } = useAuth();

  const navigation = useNavigation();

  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");

  const incompleteForm = !image || !age || !job;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job,
      age,
      timestamp,
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
      });
  };

  return (
    <View style={tw.style("flex-1 items-center pt-1")}>
      <Image
        style={tw.style("h-20 w-full")}
        resizeMode="contain"
        source={require("../assets/text-logo.png")}
      />

      <Text style={tw.style("text-xl text-gray-500 p-2 font-bold")}>
        Xin chào {user.displayName}
      </Text>

      <Text style={tw.style("text-center p-4 font-bold text-red-400")}>
        Bước 1: Ảnh hồ sơ
      </Text>
      <TextInput
        placeholder="Nhập url ảnh hồ sơ"
        style={tw.style("text-center text-xl pb-2")}
        keyboardType="url"
        value={image}
        onChangeText={setImage}
      />
      <Text style={tw.style("text-center p-4 font-bold text-red-400")}>
        Bước 2: Công việc
      </Text>
      <TextInput
        placeholder="Nhập nghề nghiệp của bạn"
        style={tw.style("text-center text-xl pb-2")}
        onChangeText={setJob}
        value={job}
      />
      <Text style={tw.style("text-center p-4 font-bold text-red-400")}>
        Bước 3: Tuổi tác
      </Text>

      <TextInput
        placeholder="Nhập tuổi của bạn"
        style={tw.style("text-center text-xl pb-2")}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        maxLength={2}
      />

      <TouchableOpacity
        disabled={incompleteForm}
        style={tw.style(
          "w-64 p-3 rounded-xl absolute bottom-10 bg-red-400",
          incompleteForm && "bg-gray-400"
        )}
        onPress={updateUserProfile}
      >
        <Text style={tw.style("text-center text-white text-xl")}>
          Cập nhật hồ sơ
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
