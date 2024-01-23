import { StyleSheet, Text, View, Image , TouchableOpacity} from 'react-native'
import React from 'react'


const ChatBlank = () => {
  return (
    <View style={{ alignItems: 'center', marginTop: 20}}>
      <View>
      <Image
                         style={styles.image1}
                         source={require('../../assets/chat.jpg')}
                    />
      </View>

      <View style={{alignItems: 'center'}}>
        <Text
         style=
         {{fontWeight: '500',
           color: 'black',
           fontSize: 20,
          }}
          >No Conversation</Text>
        <Text style={{color: 'gray'}} >You did not made any conversatiion yet,</Text>
        <Text  style={{color: 'gray'}}>Please select Username.</Text>
      </View>


      <View>
          <TouchableOpacity>
             <Text style={{fontSize: 19, color: 'blue', marginTop: 12}}> Chat People</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChatBlank

const styles = StyleSheet.create({
     image1:{
         width: 350, 
         height: 350,
     }
})