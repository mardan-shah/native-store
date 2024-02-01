import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Modal, Alert, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, database, storage } from '../firebaseConfig';
import { ref, remove, onValue, update } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ImageUploadMenu from './modal/ImageUploadMenu';


const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(''); 
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [downloadURL, setDownloadURL] = useState(null);



  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);

      // Fetch username from database if user is signed in
      if (authUser) {
        const userRef = ref(database, `users/${authUser.uid}`);
        onValue(userRef, (snapshot) => {
          const username = snapshot.val().username;
          const imageURI = snapshot.val().imageURI; // Retrieve the image URI

          setUsername(username);
          setDownloadURL(imageURI); // Set the downloadURL state directly
        });
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const openSignInScreen = () => {
    navigation.navigate('SignIn');
  };

  const handleImagePick = async () => {
    try {
      if (status !== 'granted') {
        // If permission is not granted, request it
        const { status: newStatus } = await requestPermission();
        if (newStatus !== 'granted') {
          console.warn('Camera roll permission denied');
          return;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      console.log('ImagePicker result:', result);
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      } else {
        console.warn('No image selected');
        console.warn(result);
        console.warn(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };


  const handleImageUpload = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image to upload');
      return;
    }
  
    setUploadInProgress(true); // Indicate upload started
  
    try {
      const fileName = `${username.trim()}`+ Date.now();
      const imageRef = storageRef(storage, `user_image/${fileName}.jpg` );
      const metadata = {
        contentType: 'image/jpeg',
      };
  
      const uploadTask = uploadBytesResumable(imageRef, selectedImage, metadata);
  
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
  
        },
        (error) => {
          console.error('Error during upload:', error);
          Alert.alert('Error', 'Failed to upload image. Please try again.');
          setUploadInProgress(false); // Indicate upload finished
        },
        () => {
          // Upload completed successfully
          const downloadURL = getDownloadURL(uploadTask.snapshot.ref);
          const userRef = ref(database, `users/${user.uid}`);
          update(userRef, { imageURI: downloadURL });
  
          Alert.alert('Success', 'Image uploaded successfully!');
          setModalVisible(false);
          setUploadInProgress(false); // Indicate upload finished
        }
      );
    } catch (error) {
      console.error('Error preparing image upload:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
      setUploadInProgress(false); // Indicate upload finished
    }
  };
  


  return (
    <>
      {user ? (
        <>
          <View className="flex-1 justify-start items-start bg-white p-6">
          {selectedImage && <Image source={{ uri: selectedImage }} className="w-[200px] h-[200px] rounded-full self-center"/>}
            <Text className="text-xl font-bold mt-4">{username}</Text>
            {user.email && <Text className="text-md my-4 ">{user.email}</Text>}
            <Pressable
              onPress={() => setModalVisible(true)}
              className="px-4 py-2 bg-gray-200 rounded-md my-20"
            >
              <Text className="text-black font-medium">Settings</Text>
            </Pressable>
            <Pressable onPress={handleSignOut} className="self-center my-10">
              <Text className="text-xl font-bold bg-[#343434] text-white p-4 rounded-full w-32 text-center">Logout</Text>
            </Pressable>
          </View>

          <ImageUploadMenu
            isVisible={isModalVisible}
            selectedImage={selectedImage}
            handleImagePick={handleImagePick}
            handleImageUpload={handleImageUpload}
            setModalVisible={setModalVisible}
            uploadInProgress={uploadInProgress}
          />
        </>
      ) : (
        <>
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl mb-3">Please sign in to view your profile</Text>
            <TouchableOpacity onPress={openSignInScreen}>
              <Text className="text-xl font-bold bg-[#343434] text-white p-4 rounded-full w-32 text-center">Sign In</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default Profile;
