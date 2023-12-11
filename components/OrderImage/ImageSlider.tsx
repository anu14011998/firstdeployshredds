// import React, { useState, useEffect } from 'react';
// import { View, Image, FlatList, Dimensions, StyleSheet } from 'react-native';

// const ImageSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 3000); // Change the interval time in milliseconds (e.g., 3000 for 3 seconds)

//     return () => clearInterval(interval);
//   }, []);

//   const handlePageChange = (event) => {
//     const { contentOffset } = event.nativeEvent;
//     const index = Math.floor(contentOffset.x / Dimensions.get('window').width);
//     setCurrentIndex(index);
//   };

//   const images = [
//     require('../../assets/aluminum.jpeg'),
//     require('../../assets/brass.jpeg'),
//     require('../../assets/copper.jpeg'),
//     require('../../assets/iron.jpeg'),
//     require('../../assets/lead.jpeg'),
//     require('../../assets/plastic.jpeg'),
//     require('../../assets/cardboard.jpeg'),
//   ];

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={images}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(_, index) => index.toString()}
//         renderItem={({ item }) => <Image source={item} style={styles.image} />}
//         onMomentumScrollEnd={handlePageChange}
//         initialScrollIndex={0}

//         getItemLayout={(_, index) => ({
//           length: Dimensions.get('window').width,
//           offset: Dimensions.get('window').width * index,
//           index,
//         })}
        
//       />
//       <View style={styles.pagination}>
//         {images.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.paginationDot,
//               index === currentIndex && styles.paginationDotActive,
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: Dimensions.get('window').width,
//     height: 200, // Change the height as needed
//   },
//   pagination: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 16,
//   },
//   paginationDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#888',
//     marginHorizontal: 4,
//   },
//   paginationDotActive: {
//     backgroundColor: '#000',
//   },
// });

// export default ImageSlider;
import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const ImageSlider = () => {
  const images = [
    require('../../assets/screw.jpeg'),
    require('../../assets/auction.png'),
    require('../../assets/copper.jpeg'),
    require('../../assets/recycle.jpg'),
    require('../../assets/lead.jpeg'),
    require('../../assets/plastic.jpeg'),
    require('../../assets/cardboard.jpeg'),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Swiper
          style={styles.wrapper}
          autoplay={true}
          autoplayTimeout={4}
          showsPagination={false} // Hides the pagination dots
        >
          {images.map((image, index) => (
            <View style={styles.slide} key={index}>
              <Image style={styles.image} source={image} />
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
     width: width, // Set the width of the container view
    height: 250,
     // Set the height of the container view
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
     width: width, // Set the image width to fill the container
    height: '100%', // Set the image height to fill the container
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default ImageSlider;


