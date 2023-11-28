import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../redux/actions/dashAction';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



const T1Screen1= ({ navigation }) => {
  const dispatch = useDispatch();

  // Access data and error from Redux store
  const data = useSelector((state: any) => state.dashboard.data);
  const error = useSelector((state: any) => state.dashboard.error);

  useEffect(() => {
    // Dispatch action to fetch data when the component mounts
    dispatch(fetchData());
  }, [dispatch]);


  


 // ... (other imports and code)

return (
  <View>
    <Text>T1Screen1</Text>
    <Button title='Go to second screen' onPress={() => navigation.navigate('T1Screen2')} />
    {/* <Text>{JSON.stringify(data)}</Text> */}
    {data ? (
        data.length > 0 ? (
          
          <View >
            <ScrollView>
            {data.map((item: any) => (<TouchableOpacity key={item.p_id} onPress={()=>navigation.navigate("T1Screen1modal1")}>
                <View style={styles.card}>
                  <Text>{item.p_id}</Text>
                  <Text>{item.p_name}</Text>
                </View>
              </TouchableOpacity>
              
              // Replace 'item.id' with the property you want to display

            ))}
            </ScrollView>
          </View>
        ) : (
          <Text>Loading...</Text>
        )
      ) : (
        <Text>Loading...</Text>
      )}
    

  </View>
  
)

}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  // Add other styles as needed
});
export default T1Screen1


