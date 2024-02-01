import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const SnapCarousel = () => {
  const data = [
    { id: 1, title: 'Card 1', description: 'Description for Card 1' },
    { id: 2, title: 'Card 2', description: 'Description for Card 2' },
    { id: 3, title: 'Card 3', description: 'Description for Card 3' },
    { id: 4, title: 'Card 4', description: 'Description for Card 4' },
    { id: 5, title: 'Card 5', description: 'Description for Card 5' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      sliderWidth={400}
      itemWidth={200}
      loop
      autoplay
      layout="default"
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
  },
});

export default SnapCarousel;
