import { View, Text, Modal, TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons';


const Menu = ({closeModal, menuModalVisible} ) => {
  const categories = ['Category 1', 'Category 2', 'Category 3'];
  return (
    <>
    <Modal
        animationType="slide"
        transparent={true}
        visible={menuModalVisible}
        onRequestClose={closeModal}
      >
      <View className='flex-1 bg-[#343434] p-4'>
        <View className='flex-row w-full justify-between items-center mb-4'>
          <Text className='text-2xl font-bold text-[#00B2FF]'>Menu</Text>
          <TouchableOpacity onPress={closeModal}>
            <AntDesign name="close" size={28} color="#00B2FF" />
          </TouchableOpacity>
        </View>

        <View className='mb-4'>
          <Text className='text-xl font-bold mb-4 text-white mt-3'>Categories</Text>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} className='p-2 bg-[#00B2FF] mb-3 rounded'>
              <Text className='text-base'>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        
      </View>
    </Modal>
    </>
  );
}
 
export default Menu;