import { View, Text, Image, Modal, Pressable } from "react-native";


const ImageUploadMenu = ({
  isVisible,
  selectedImage,
  handleImagePick,
  handleImageUpload,
  setModalVisible,
  uploadInProgress,
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex flex-1 justify-center items-center bg-white p-5 rounded-xl shadow-md">
        {/* Image preview */}
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            className="w-40 h-40 mb-5"
          />
        )}

        <Pressable
          className="bg-blue-500 py-2 px-5 rounded-md mt-2"
          onPress={handleImagePick}
          disabled={uploadInProgress}
        >
          <Text className="text-white font-bold">Choose Image</Text>
        </Pressable>

        <Pressable
          className="bg-green-500 py-2 px-5 rounded-md mt-2"
          onPress={handleImageUpload}
        >
          <Text className="text-white font-bold">Upload Image</Text>
        </Pressable>

        <Pressable
          className="bg-gray-400 py-2 px-5 rounded-md mt-2"
          onPress={() => setModalVisible(false)}
        >
          <Text className="text-black font-bold">Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default ImageUploadMenu;
