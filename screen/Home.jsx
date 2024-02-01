import { View, Text, Image, Pressable, ScrollView } from "react-native";
import PagerView from 'react-native-pager-view';
import Carousal from "./components/Carousal";

const Home = () => {
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCjngSn4Ia9FAMnx2BE1lrqlWGhaVapMs26xeeusfwwtmbkoFpq-kMG1KPqrffE76AMg8&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNieBEycNwQ-AKVikiHl6HS3TagE2gaX7jVb1hTMLeVvMFNo3GFRV0D-284ylupFTxeGM&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJm_9eNGhaoHxb3NljwX0D03pltzGSDBfU80xOh1TcTA_VNBDmLa8gklAwi7GV5WKdVb0&usqp=CAU',
  ];

  const Categories = [
    'Laptop',
    'Tablet',
    'Smartphone',
    'Television',
    'Smartwatches',
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="h-[30vh] w-[90vw] bg-blue-400 rounded-xl">
        <PagerView className="flex-1" initialPage={0}>
          {images.map((image, index) => (
            <View className="justify-center items-center w-full" key={index.toString()}>
              <Image source={{ uri: image }} className="h-[70%] w-[80%]" />
              <Text>{index + 1}</Text>
            </View>
          ))}
        </PagerView>
      </View>

      <Text className="font-bold self-start m-5">Categories</Text>
      <View className="self-start mx-5 flex-row justify-between">
        {Categories.map((category, index) => (
          <Pressable key={index.toString()}>
            <View className="h-[65px] w-[60px] bg-slate-300 mx-1 rounded justify-end py-1">
              <Text className="text-center text-[8px]">{category}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <Text className="font-bold self-start m-5">Recently Viewed</Text>
      <View className="h-32">
        <Carousal />
      </View>
      <Text className="font-bold self-start m-5">Recently Viewed</Text>
      <View className="h-32">
        <Carousal />
      </View>
    </ScrollView>
  );
}

export default Home;
