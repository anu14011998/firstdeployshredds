// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import React, { useCallback, useEffect, useState } from "react";
// // // import { View, Text, StyleSheet, Dimensions, FlatList ,ScrollView, TouchableOpacity, Modal, Linking} from "react-native";
// // // import { getFirestore, collection, query, where, getDocs, Firestore, addDoc, QuerySnapshot, onSnapshot, orderBy } from 'firebase/firestore';
// // // import { GiftedChat, IMessage } from 'react-native-gifted-chat';
// // // import { Ionicons } from '@expo/vector-icons';
// // // import { Directions } from 'react-native-gesture-handler';

// // // const AllChats = ({navigation}) => {
// // //   const [users, setUsers] = useState([]);
// // //   const [fromChatUserIdFbse,setFromChatUserIdFbse]=useState('')
// // //   const [toChatUserIdFbse,setToChatUserIdFbse]=useState('')
// // //   const [toChatUserMobileFbse,setToChatUserMobileFbse]=useState('')
// // //   const [toChatUserEmailFbse,setToChatUserEmailFbse]=useState('')
// // //   const [toChatUserNameFbse,setToChatUserNameFbse]=useState('')




// // //   useEffect(() => {
// // //     getUsers();
// // //   }, [fromChatUserIdFbse]);
  

// // //   const getUsers = async () => {
// // //     try {
// // //       const email = await AsyncStorage.getItem("femail");
// // //       const fuserid = await AsyncStorage.getItem("fid");

// // //       console.log("Current user's email:", email);
// // //       // console.log("firebase form chat user Id:fuser-",fuserid);


// // //       if (email) {
// // //         const firebaseDB = getFirestore();
// // //         const userCollection = collection(firebaseDB, 'users');
// // //         const usersQuery = query(userCollection, where('email', '!=', email));

// // //         // console.log("Users query:", usersQuery); // Check the users query

// // //         const querySnapshot = await getDocs(usersQuery);
// // //         const userData = querySnapshot.docs.map(documentSnapshot => ({
// // //           id: documentSnapshot.id,
// // //           fullName: documentSnapshot.get("name"),
// // //           mobile: documentSnapshot.get("mobile"),
// // //           email: documentSnapshot.get("email"),
// // //           ...documentSnapshot.data()
// // //         }));

// // //         console.log("Fetched users data:", userData); // Check the fetched users data
// // //         setFromChatUserIdFbse(fuserid)
// // //         // console.log("firebase form chat user Id:fromchatuseridfbse-",fromChatUserIdFbse);
        

// // //         setUsers(userData);
// // //       }
// // //     } catch (error) {
// // //       console.log("Error fetching users: ", error);
// // //     }
// // //   };
// // //   // const handleOnPress=()=>{
// // //   //   navigation.navigate('AllMainChats')
// // //   // }

// // //   const [isModalVisible, setModalVisible] = useState(false);


// // //   const toggleModal = () => {
// // //     setModalVisible(!isModalVisible);
// // //     // setToChatUserIdFbse(id)
// // //   };

// // //   const setsSelectedUserId=(id:any,name:any,mobile:any,email:any,)=>{
// // //         setToChatUserIdFbse(id)
// // //         setToChatUserNameFbse(name)
// // //         setToChatUserEmailFbse(email)
// // //         setToChatUserMobileFbse(mobile)
// // //         toggleModal();

// // //   }
 
// // //   return (
// // //     <View>
// // //       {/* <Text>{JSON.stringify(users)}</Text> */}
// // //       {users.length > 0 ? (
// // //         <FlatList
// // //           data={users}
// // //           renderItem={({ item }) => (
// // //             <TouchableOpacity
// // //               style={styles.userItem}
// // //               onPress={() => setsSelectedUserId(item.id,item.name,item.mobile,item.email)}
// // //             >
// // //               <Text>ID: {item.id}</Text>
// // //               <Text>Full Name: {item.name}</Text>
// // //               <Text>Mobile: {item.mobile}</Text>
// // //               <Text>Email: {item.email}</Text>
// // //             </TouchableOpacity>
// // //           )}
// // //           keyExtractor={(item) => item.id}
// // //         />
// // //       ) : (
// // //         <Text>Loading...</Text>
// // //       )}
  
// // //       <MainChats
// // //         isModalVisible={isModalVisible}
// // //         toggleModal={toggleModal}
// // //         formchatUserIdFbse={fromChatUserIdFbse}
// // //         tochatUserIdFbse={toChatUserIdFbse}
// // //         tochatUserNameFbse={toChatUserNameFbse}
// // //         toChatUserMobileFbse={toChatUserMobileFbse}
        
// // //       />
// // //     </View>
// // //   );
  
// // // };




// // // const MainChats: React.FC<{
// // //   isModalVisible: boolean;
// // //   toggleModal: () => void;
// // //   formchatUserIdFbse: string;
// // //   tochatUserIdFbse: string;
// // //   tochatUserNameFbse: string;
// // //   toChatUserMobileFbse:string;
  
  
// // // }> = ({ isModalVisible, toggleModal, formchatUserIdFbse, tochatUserIdFbse,tochatUserNameFbse ,toChatUserMobileFbse}) => {
// // //   const [messages, setMessages] = useState<IMessage[]>([]);
// // //   const firebaseDB = getFirestore(); // Get the Firestore instance

// // //   useEffect(() => {
// // //     const subscriber = onSnapshot(
// // //       query(
// // //         collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'),
// // //         orderBy('createdAt', 'desc')
// // //       ),
// // //       (querySnapshot) => {
// // //         const allmessages: IMessage[] = [];
// // //         querySnapshot.forEach((doc) => {
// // //           const messageData = doc.data();
// // //           allmessages.push({
// // //             _id: doc.id,
// // //             text: messageData.text,
// // //             createdAt: new Date(messageData.createdAt),
// // //             user: {
// // //               _id: messageData.sendBy,
// // //             },
// // //           });
// // //         });
// // //         setMessages(allmessages);
// // //       }
// // //     );
// // //     return () => subscriber();
// // //   }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

// // //   const onSend = useCallback(async (messages = []) => {
// // //     const newMessage = messages[0];
// // //     const messageToSend: IMessage = {
// // //       ...newMessage,
// // //       sendBy: formchatUserIdFbse,
// // //       sendTo: tochatUserIdFbse,
// // //       createdAt: Date.now(),
// // //     };

// // //     // Update the state by merging the new message with the existing messages array
// // //     setMessages((previousMessages) => [...previousMessages, messageToSend]);

// // //     // Add message to the sender's chat collection
// // //     try {
// // //       await addDoc(collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'), messageToSend);
// // //     } catch (error) {
// // //       console.error('Error sending message:', error);
// // //     }

// // //     // Add message to the receiver's chat collection
// // //     try {
// // //       await addDoc(collection(firebaseDB, 'chats', `${tochatUserIdFbse}_${formchatUserIdFbse}`, 'messages'), messageToSend);
// // //     } catch (error) {
// // //       console.error('Error sending message to the receiver:', error);
// // //     }
// // //   }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

// // //   const closeModal = () => {
// // //     toggleModal();
// // //   };
// // //   const openDialer = () => {
// // //     Linking.openURL(`tel:${toChatUserMobileFbse}`);
// // //   };

// // //   return (
// // //     <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
// // //       <View style={styles.modalContainer}>
// // //         <View style={styles.header}>

// // //           <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
// // //           <TouchableOpacity onPress={closeModal}>
// // //             <Ionicons name="arrow-back" style={{ fontSize: 30 }} />
           
// // //           </TouchableOpacity>  
// // //           <Text style={{fontSize: 22,marginLeft: 10}}>{tochatUserNameFbse}</Text>        
// // //           </View>


        

// // //           <View style={{}}>
// // //           <TouchableOpacity style={{}} onPress={openDialer}>
// // //             <Ionicons name="call" style={{ fontSize: 25 ,marginRight: 10}} />
// // //           </TouchableOpacity>
// // //           </View>
       
          
// // //         </View>
// // //         <GiftedChat
// // //           messages={messages}
// // //           onSend={(messages) => onSend(messages)}
// // //           user={{
// // //             _id: formchatUserIdFbse,
// // //           }}
// // //         />
// // //       </View>
// // //     </Modal>
// // //   );
// // // };


// // // const styles = StyleSheet.create({
// // //   userItem: {
// // //     width: Dimensions.get('window').width - 50,
// // //     alignSelf: 'center',
// // //     marginTop: 20,
// // //     flexDirection: 'column',
// // //     borderWidth: 0.5,
// // //     borderRadius: 10,
// // //     padding: 10,
// // //     marginBottom: 10,
// // //   },
// // //   closeButton: {
// // //     padding: 10,
// // //     backgroundColor: 'lightcoral',
// // //     borderRadius: 5,
// // //   },
// // //   modalContainer: {
// // //  flex: 1,
   
// // //     // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
// // //     backgroundColor:'white',
// // //   },

// // //   header: {
// // //     flexDirection: "row",
// // //     // justifyContent: "flex-start",
// // //     alignItems: "center",
// // //     padding: 10,
// // //     backgroundColor: "lightgray",
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: "gray",
// // //   },
// // //   headerText: {
// // //     fontSize: 16,
// // //     fontWeight: "bold",
// // //   },
// // // });

// // // export default AllChats;



// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import React, { useEffect, useState } from "react";
// // import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Modal, Linking } from "react-native";
// // import { getFirestore, collection, query, where, getDocs, onSnapshot, orderBy, addDoc } from 'firebase/firestore';
// // import { GiftedChat, IMessage } from 'react-native-gifted-chat';
// // import { Ionicons } from '@expo/vector-icons';
// // import ChatBlank from './ChatBlank';

// // const AllChats = () => {
// //   const [users, setUsers] = useState([]);
// //   const [fromChatUserIdFbse, setFromChatUserIdFbse] = useState('');
// //   const [toChatUserIdFbse, setToChatUserIdFbse] = useState('');
// //   const [toChatUserMobileFbse, setToChatUserMobileFbse] = useState('');
// //   const [toChatUserEmailFbse, setToChatUserEmailFbse] = useState('');
// //   const [toChatUserNameFbse, setToChatUserNameFbse] = useState('');
// //   const [isModalVisible, setModalVisible] = useState(false);


// //   useEffect(() => {
// //     getUsers();
// //   }, [fromChatUserIdFbse]);

// //   const getUsers = async () => {
// //     try {
// //       const email = await AsyncStorage.getItem("femail");
// //       const fuserid = await AsyncStorage.getItem("fid");

// //       if (email) {
// //         const firebaseDB = getFirestore();
// //         const userCollection = collection(firebaseDB, 'users');
// //         const usersQuery = query(userCollection, where('email', '!=', email));

// //         const querySnapshot = await getDocs(usersQuery);
// //         const userData = await Promise.all(querySnapshot.docs.map(async documentSnapshot => {
// //           const user = documentSnapshot.data();
// //           const chatId = `${fuserid}_${user.id}`;
// //           const chatQuery = query(collection(firebaseDB, 'chats', chatId, 'messages'));
// //           const chatSnapshot = await getDocs(chatQuery);
// //           const hasMessages = !chatSnapshot.empty;

// //           return {
// //             id: documentSnapshot.id,
// //             fullName: user.name,
// //             mobile: user.mobile,
// //             email: user.email,
// //             hasMessages: hasMessages,
// //           };
// //         }));

// //         setFromChatUserIdFbse(fuserid);
// //         setUsers(userData.filter(user => user.hasMessages));
// //       }
// //     } catch (error) {
// //       console.log("Error fetching users: ", error);
// //     }
// //   };

// //   const toggleModal = () => {
// //     setModalVisible(!isModalVisible);
// //   };

// //   const setsSelectedUserId = (id, name, mobile, email) => {
// //     setToChatUserIdFbse(id);
// //     setToChatUserNameFbse(name);
// //     setToChatUserEmailFbse(email);
// //     setToChatUserMobileFbse(mobile);
// //     toggleModal();
// //   };

// //   return (
// //     <View>
// //       {users.length > 0 ? (
// //         <FlatList
// //           data={users}
// //           renderItem={({ item }) => (
// //             <TouchableOpacity
// //               style={styles.userItem}
// //               onPress={() => setsSelectedUserId(item.id, item.fullName, item.mobile, item.email)}
// //             >
// //               <Text>ID: {item.id}</Text>
// //               <Text>Full Name: {item.fullName}</Text>
// //               <Text>Mobile: {item.mobile}</Text>
// //               <Text>Email: {item.email}</Text>
// //             </TouchableOpacity>
// //           )}
// //           keyExtractor={(item) => item.id}
// //         />
// //       ) : (
// //        <>
// //        <ChatBlank/>
// //        </>
// //       )}

// //       <MainChats
// //         isModalVisible={isModalVisible}
// //         toggleModal={toggleModal}
// //         formchatUserIdFbse={fromChatUserIdFbse}
// //         tochatUserIdFbse={toChatUserIdFbse}
// //         tochatUserNameFbse={toChatUserNameFbse}
// //         toChatUserMobileFbse={toChatUserMobileFbse}
// //       />
// //     </View>
// //   );
// // };

// // const MainChats = ({ isModalVisible, toggleModal, formchatUserIdFbse, tochatUserIdFbse, tochatUserNameFbse, toChatUserMobileFbse }) => {
// //   const [messages, setMessages] = useState<IMessage[]>([]);
// //   const firebaseDB = getFirestore();

// //   useEffect(() => {
// //     const subscriber = onSnapshot(
// //       query(
// //         collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'),
// //         orderBy('createdAt', 'desc')
// //       ),
// //       (querySnapshot) => {
// //         const allmessages: IMessage[] = [];
// //         querySnapshot.forEach((doc) => {
// //           const messageData = doc.data();
// //           allmessages.push({
// //             _id: doc.id,
// //             text: messageData.text,
// //             createdAt: new Date(messageData.createdAt),
// //             user: {
// //               _id: messageData.sendBy,
// //             },
// //           });
// //         });
// //         setMessages(allmessages);
// //       }
// //     );
// //     return () => subscriber();
// //   }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

// //   const onSend = async (messages = []) => {
// //     const newMessage = messages[0];
// //     const messageToSend: IMessage = {
// //       ...newMessage,
// //       sendBy: formchatUserIdFbse,
// //       sendTo: tochatUserIdFbse,
// //       createdAt: Date.now(),
// //     };

// //     setMessages((previousMessages) => [...previousMessages, messageToSend]);

// //     try {
// //       await addDoc(collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'), messageToSend);
// //     } catch (error) {
// //       console.error('Error sending message:', error);
// //     }

// //     try {
// //       await addDoc(collection(firebaseDB, 'chats', `${tochatUserIdFbse}_${formchatUserIdFbse}`, 'messages'), messageToSend);
// //     } catch (error) {
// //       console.error('Error sending message to the receiver:', error);
// //     }
// //   };

// //   const closeModal = () => {
// //     toggleModal();
// //   };

// //   const openDialer = () => {
// //     Linking.openURL(`tel:${toChatUserMobileFbse}`);
// //   };

// //   return (
// //     <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
// //       <View style={styles.modalContainer}>
// //         <View style={styles.header}>
// //           <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
// //             <TouchableOpacity onPress={closeModal}>
// //               <Ionicons name="arrow-back" style={{ fontSize: 30 }} />
// //             </TouchableOpacity>
// //             <Text style={{ fontSize: 22, marginLeft: 10 }}>{tochatUserNameFbse}</Text>
// //           </View>
// //           <View style={{}}>
// //             <TouchableOpacity style={{}} onPress={openDialer}>
// //               <Ionicons name="call" style={{ fontSize: 25, marginRight: 10 }} />
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //         <GiftedChat
// //           messages={messages}
// //           onSend={(messages) => onSend(messages)}
// //           user={{
// //             _id: formchatUserIdFbse,
// //           }}
// //         />
// //       </View>

    
// //     </Modal>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   userItem: {
// //     width: Dimensions.get('window').width - 50,
// //     alignSelf: 'center',
// //     marginTop: 20,
// //     flexDirection: 'column',
// //     borderWidth: 0.5,
// //     borderRadius: 10,
// //     padding: 10,
// //     marginBottom: 10,
// //   },
// //   modalContainer: {
// //     flex: 1,
// //     backgroundColor: 'white',
// //   },
// //   header: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     padding: 10,
// //     backgroundColor: "lightgray",
// //     borderBottomWidth: 1,
// //     borderBottomColor: "gray",
// //   },
// // });

// // export default AllChats;




// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useCallback, useEffect, useState } from "react";
// import { View, Text, StyleSheet, Dimensions, FlatList ,ScrollView, TouchableOpacity, Modal, Linking} from "react-native";
// import { getFirestore, collection, query, where, getDocs, Firestore, addDoc, QuerySnapshot, onSnapshot, orderBy } from 'firebase/firestore';
// import { GiftedChat, IMessage } from 'react-native-gifted-chat';
// import { Ionicons } from '@expo/vector-icons';
// import { Directions } from 'react-native-gesture-handler';
// import ChatBlank from './ChatBlank';

// const AllChats = ({navigation}) => {
//   const [users, setUsers] = useState([]);
//   const [fromChatUserIdFbse,setFromChatUserIdFbse]=useState('')
//   const [toChatUserIdFbse,setToChatUserIdFbse]=useState('')
//   const [toChatUserMobileFbse,setToChatUserMobileFbse]=useState('')
//   const [toChatUserEmailFbse,setToChatUserEmailFbse]=useState('')
//   const [toChatUserNameFbse,setToChatUserNameFbse]=useState('')




//   useEffect(() => {
//     getUsers();
//   }, [fromChatUserIdFbse]);
  

//   const getUsers = async () => {
//     try {
//       const email = await AsyncStorage.getItem("femail");
//       const fuserid = await AsyncStorage.getItem("fid");

//       console.log("Current user's email:", email);
//       // console.log("firebase form chat user Id:fuser-",fuserid);


//       if (email) {
//         const firebaseDB = getFirestore();
//         const userCollection = collection(firebaseDB, 'users');
//         const usersQuery = query(userCollection, where('email', '!=', email));

//         // console.log("Users query:", usersQuery); // Check the users query

//         const querySnapshot = await getDocs(usersQuery);
//         const userData = querySnapshot.docs.map(documentSnapshot => ({
//           id: documentSnapshot.id,
//           fullName: documentSnapshot.get("name"),
//           mobile: documentSnapshot.get("mobile"),
//           email: documentSnapshot.get("email"),
//           ...documentSnapshot.data()
//         }));

//         console.log("Fetched users data:", userData); // Check the fetched users data
//         setFromChatUserIdFbse(fuserid)
//         // console.log("firebase form chat user Id:fromchatuseridfbse-",fromChatUserIdFbse);
        

//         setUsers(userData);
//       }
//     } catch (error) {
//       console.log("Error fetching users: ", error);
//     }
//   };
//   // const handleOnPress=()=>{
//   //   navigation.navigate('AllMainChats')
//   // }

//   const [isModalVisible, setModalVisible] = useState(false);


//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//     // setToChatUserIdFbse(id)
//   };

//   const setsSelectedUserId=(id:any,name:any,mobile:any,email:any,)=>{
//         setToChatUserIdFbse(id)
//         setToChatUserNameFbse(name)
//         setToChatUserEmailFbse(email)
//         setToChatUserMobileFbse(mobile)
//         toggleModal();

//   }
 
//   return (
//     <View>
//       {/* <Text>{JSON.stringify(users)}</Text> */}
//       {users.length > 0 ? (
//         <FlatList
//           data={users}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.userItem}
//               onPress={() => setsSelectedUserId(item.id,item.name,item.mobile,item.email)}
//             >
//               <Text>ID: {item.id}</Text>
//               <Text>Full Name: {item.name}</Text>
//               <Text>Mobile: {item.mobile}</Text>
//               <Text>Email: {item.email}</Text>
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item) => item.id}
//         />
//       ) : (
//         <>
//           <ChatBlank/>
//         </>
//       )}
  
//       <MainChats
//         isModalVisible={isModalVisible}
//         toggleModal={toggleModal}
//         formchatUserIdFbse={fromChatUserIdFbse}
//         tochatUserIdFbse={toChatUserIdFbse}
//         tochatUserNameFbse={toChatUserNameFbse}
//         toChatUserMobileFbse={toChatUserMobileFbse}
        
//       />
//     </View>
//   );
  
// };




// const MainChats: React.FC<{
//   isModalVisible: boolean;
//   toggleModal: () => void;
//   formchatUserIdFbse: string;
//   tochatUserIdFbse: string;
//   tochatUserNameFbse: string;
//   toChatUserMobileFbse:string;
  
  
// }> = ({ isModalVisible, toggleModal, formchatUserIdFbse, tochatUserIdFbse,tochatUserNameFbse ,toChatUserMobileFbse}) => {
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const firebaseDB = getFirestore(); // Get the Firestore instance

//   useEffect(() => {
//     const subscriber = onSnapshot(
//       query(
//         collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'),
//         orderBy('createdAt', 'desc')
//       ),
//       (querySnapshot) => {
//         const allmessages: IMessage[] = [];
//         querySnapshot.forEach((doc) => {
//           const messageData = doc.data();
//           allmessages.push({
//             _id: doc.id,
//             text: messageData.text,
//             createdAt: new Date(messageData.createdAt),
//             user: {
//               _id: messageData.sendBy,
//             },
//           });
//         });
//         setMessages(allmessages);
//       }
//     );
//     return () => subscriber();
//   }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

//   const onSend = useCallback(async (messages = []) => {
//     const newMessage = messages[0];
//     const messageToSend: IMessage = {
//       ...newMessage,
//       sendBy: formchatUserIdFbse,
//       sendTo: tochatUserIdFbse,
//       createdAt: Date.now(),
//     };

//     // Update the state by merging the new message with the existing messages array
//     setMessages((previousMessages) => [...previousMessages, messageToSend]);

//     // Add message to the sender's chat collection
//     try {
//       await addDoc(collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'), messageToSend);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }

//     // Add message to the receiver's chat collection
//     try {
//       await addDoc(collection(firebaseDB, 'chats', `${tochatUserIdFbse}_${formchatUserIdFbse}`, 'messages'), messageToSend);
//     } catch (error) {
//       console.error('Error sending message to the receiver:', error);
//     }
//   }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

//   const closeModal = () => {
//     toggleModal();
//   };
//   const openDialer = () => {
//     Linking.openURL(`tel:${toChatUserMobileFbse}`);
//   };

//   return (
//     <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
//       <View style={styles.modalContainer}>
//         <View style={styles.header}>

//           <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
//           <TouchableOpacity onPress={closeModal}>
//             <Ionicons name="arrow-back" style={{ fontSize: 30 }} />
           
//           </TouchableOpacity>  
//           <Text style={{fontSize: 22,marginLeft: 10}}>{tochatUserNameFbse}</Text>        
//           </View>


        

//           <View style={{}}>
//           <TouchableOpacity style={{}} onPress={openDialer}>
//             <Ionicons name="call" style={{ fontSize: 25 ,marginRight: 10}} />
//           </TouchableOpacity>
//           </View>
       
          
//         </View>
//         <GiftedChat
//           messages={messages}
//           onSend={(messages) => onSend(messages)}
//           user={{
//             _id: formchatUserIdFbse,
//           }}
//         />
//       </View>
//     </Modal>
//   );
// };


// const styles = StyleSheet.create({
//   userItem: {
//     width: Dimensions.get('window').width - 50,
//     alignSelf: 'center',
//     marginTop: 20,
//     flexDirection: 'column',
//     borderWidth: 0.5,
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 10,
//   },
//   closeButton: {
//     padding: 10,
//     backgroundColor: 'lightcoral',
//     borderRadius: 5,
//   },
//   modalContainer: {
//  flex: 1,
   
//     // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
//     backgroundColor:'white',
//   },

//   header: {
//     flexDirection: "row",
//     // justifyContent: "flex-start",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "lightgray",
//     borderBottomWidth: 1,
//     borderBottomColor: "gray",
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default AllChats;






// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import React, { useCallback, useEffect, useState } from "react";
// // import { View, Text, StyleSheet, Dimensions, FlatList ,ScrollView, TouchableOpacity, Modal, Linking} from "react-native";
// // import { getFirestore, collection, query, where, getDocs, Firestore, addDoc, QuerySnapshot, onSnapshot, orderBy } from 'firebase/firestore';
// // import { GiftedChat, IMessage } from 'react-native-gifted-chat';
// // import { Ionicons } from '@expo/vector-icons';
// // import { Directions } from 'react-native-gesture-handler';

// // const AllChats = ({navigation}) => {
// //   const [users, setUsers] = useState([]);
// //   const [fromChatUserIdFbse,setFromChatUserIdFbse]=useState('')
// //   const [toChatUserIdFbse,setToChatUserIdFbse]=useState('')
// //   const [toChatUserMobileFbse,setToChatUserMobileFbse]=useState('')
// //   const [toChatUserEmailFbse,setToChatUserEmailFbse]=useState('')
// //   const [toChatUserNameFbse,setToChatUserNameFbse]=useState('')




// //   useEffect(() => {
// //     getUsers();
// //   }, [fromChatUserIdFbse]);
  

// //   const getUsers = async () => {
// //     try {
// //       const email = await AsyncStorage.getItem("femail");
// //       const fuserid = await AsyncStorage.getItem("fid");

// //       console.log("Current user's email:", email);
// //       // console.log("firebase form chat user Id:fuser-",fuserid);


// //       if (email) {
// //         const firebaseDB = getFirestore();
// //         const userCollection = collection(firebaseDB, 'users');
// //         const usersQuery = query(userCollection, where('email', '!=', email));

// //         // console.log("Users query:", usersQuery); // Check the users query

// //         const querySnapshot = await getDocs(usersQuery);
// //         const userData = querySnapshot.docs.map(documentSnapshot => ({
// //           id: documentSnapshot.id,
// //           fullName: documentSnapshot.get("name"),
// //           mobile: documentSnapshot.get("mobile"),
// //           email: documentSnapshot.get("email"),
// //           ...documentSnapshot.data()
// //         }));

// //         console.log("Fetched users data:", userData); // Check the fetched users data
// //         setFromChatUserIdFbse(fuserid)
// //         // console.log("firebase form chat user Id:fromchatuseridfbse-",fromChatUserIdFbse);
        

// //         setUsers(userData);
// //       }
// //     } catch (error) {
// //       console.log("Error fetching users: ", error);
// //     }
// //   };
// //   // const handleOnPress=()=>{
// //   //   navigation.navigate('AllMainChats')
// //   // }

// //   const [isModalVisible, setModalVisible] = useState(false);


// //   const toggleModal = () => {
// //     setModalVisible(!isModalVisible);
// //     // setToChatUserIdFbse(id)
// //   };

// //   const setsSelectedUserId=(id:any,name:any,mobile:any,email:any,)=>{
// //         setToChatUserIdFbse(id)
// //         setToChatUserNameFbse(name)
// //         setToChatUserEmailFbse(email)
// //         setToChatUserMobileFbse(mobile)
// //         toggleModal();

// //   }
 
// //   return (
// //     <View>
// //       {/* <Text>{JSON.stringify(users)}</Text> */}
// //       {users.length > 0 ? (
// //         <FlatList
// //           data={users}
// //           renderItem={({ item }) => (
// //             <TouchableOpacity
// //               style={styles.userItem}
// //               onPress={() => setsSelectedUserId(item.id,item.name,item.mobile,item.email)}
// //             >
// //               <Text>ID: {item.id}</Text>
// //               <Text>Full Name: {item.name}</Text>
// //               <Text>Mobile: {item.mobile}</Text>
// //               <Text>Email: {item.email}</Text>
// //             </TouchableOpacity>
// //           )}
// //           keyExtractor={(item) => item.id}
// //         />
// //       ) : (
// //         <Text>Loading...</Text>
// //       )}
  
// //       <MainChats
// //         isModalVisible={isModalVisible}
// //         toggleModal={toggleModal}
// //         formchatUserIdFbse={fromChatUserIdFbse}
// //         tochatUserIdFbse={toChatUserIdFbse}
// //         tochatUserNameFbse={toChatUserNameFbse}
// //         toChatUserMobileFbse={toChatUserMobileFbse}
        
// //       />
// //     </View>
// //   );
  
// // };




// // const MainChats: React.FC<{
// //   isModalVisible: boolean;
// //   toggleModal: () => void;
// //   formchatUserIdFbse: string;
// //   tochatUserIdFbse: string;
// //   tochatUserNameFbse: string;
// //   toChatUserMobileFbse:string;
  
  
// // }> = ({ isModalVisible, toggleModal, formchatUserIdFbse, tochatUserIdFbse,tochatUserNameFbse ,toChatUserMobileFbse}) => {
// //   const [messages, setMessages] = useState<IMessage[]>([]);
// //   const firebaseDB = getFirestore(); // Get the Firestore instance

// //   useEffect(() => {
// //     const subscriber = onSnapshot(
// //       query(
// //         collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'),
// //         orderBy('createdAt', 'desc')
// //       ),
// //       (querySnapshot) => {
// //         const allmessages: IMessage[] = [];
// //         querySnapshot.forEach((doc) => {
// //           const messageData = doc.data();
// //           allmessages.push({
// //             _id: doc.id,
// //             text: messageData.text,
// //             createdAt: new Date(messageData.createdAt),
// //             user: {
// //               _id: messageData.sendBy,
// //             },
// //           });
// //         });
// //         setMessages(allmessages);
// //       }
// //     );
// //     return () => subscriber();
// //   }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

// //   const onSend = useCallback(async (messages = []) => {
// //     const newMessage = messages[0];
// //     const messageToSend: IMessage = {
// //       ...newMessage,
// //       sendBy: formchatUserIdFbse,
// //       sendTo: tochatUserIdFbse,
// //       createdAt: Date.now(),
// //     };

// //     // Update the state by merging the new message with the existing messages array
// //     setMessages((previousMessages) => [...previousMessages, messageToSend]);

// //     // Add message to the sender's chat collection
// //     try {
// //       await addDoc(collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'), messageToSend);
// //     } catch (error) {
// //       console.error('Error sending message:', error);
// //     }

// //     // Add message to the receiver's chat collection
// //     try {
// //       await addDoc(collection(firebaseDB, 'chats', `${tochatUserIdFbse}_${formchatUserIdFbse}`, 'messages'), messageToSend);
// //     } catch (error) {
// //       console.error('Error sending message to the receiver:', error);
// //     }
// //   }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

// //   const closeModal = () => {
// //     toggleModal();
// //   };
// //   const openDialer = () => {
// //     Linking.openURL(`tel:${toChatUserMobileFbse}`);
// //   };

// //   return (
// //     <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
// //       <View style={styles.modalContainer}>
// //         <View style={styles.header}>

// //           <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
// //           <TouchableOpacity onPress={closeModal}>
// //             <Ionicons name="arrow-back" style={{ fontSize: 30 }} />
           
// //           </TouchableOpacity>  
// //           <Text style={{fontSize: 22,marginLeft: 10}}>{tochatUserNameFbse}</Text>        
// //           </View>


        

// //           <View style={{}}>
// //           <TouchableOpacity style={{}} onPress={openDialer}>
// //             <Ionicons name="call" style={{ fontSize: 25 ,marginRight: 10}} />
// //           </TouchableOpacity>
// //           </View>
       
          
// //         </View>
// //         <GiftedChat
// //           messages={messages}
// //           onSend={(messages) => onSend(messages)}
// //           user={{
// //             _id: formchatUserIdFbse,
// //           }}
// //         />
// //       </View>
// //     </Modal>
// //   );
// // };


// // const styles = StyleSheet.create({
// //   userItem: {
// //     width: Dimensions.get('window').width - 50,
// //     alignSelf: 'center',
// //     marginTop: 20,
// //     flexDirection: 'column',
// //     borderWidth: 0.5,
// //     borderRadius: 10,
// //     padding: 10,
// //     marginBottom: 10,
// //   },
// //   closeButton: {
// //     padding: 10,
// //     backgroundColor: 'lightcoral',
// //     borderRadius: 5,
// //   },
// //   modalContainer: {
// //  flex: 1,
   
// //     // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
// //     backgroundColor:'white',
// //   },

// //   header: {
// //     flexDirection: "row",
// //     // justifyContent: "flex-start",
// //     alignItems: "center",
// //     padding: 10,
// //     backgroundColor: "lightgray",
// //     borderBottomWidth: 1,
// //     borderBottomColor: "gray",
// //   },
// //   headerText: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// // });

// // export default AllChats;



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Modal, Linking } from "react-native";
// import { getFirestore, collection, query, where, getDocs, onSnapshot, orderBy, addDoc } from 'firebase/firestore';
// import { GiftedChat, IMessage } from 'react-native-gifted-chat';
// import { Ionicons } from '@expo/vector-icons';
// import ChatBlank from './ChatBlank';

// const AllChats = () => {
//   const [users, setUsers] = useState([]);
//   const [fromChatUserIdFbse, setFromChatUserIdFbse] = useState('');
//   const [toChatUserIdFbse, setToChatUserIdFbse] = useState('');
//   const [toChatUserMobileFbse, setToChatUserMobileFbse] = useState('');
//   const [toChatUserEmailFbse, setToChatUserEmailFbse] = useState('');
//   const [toChatUserNameFbse, setToChatUserNameFbse] = useState('');
//   const [isModalVisible, setModalVisible] = useState(false);


//   useEffect(() => {
//     getUsers();
//   }, [fromChatUserIdFbse]);

//   const getUsers = async () => {
//     try {
//       const email = await AsyncStorage.getItem("femail");
//       const fuserid = await AsyncStorage.getItem("fid");

//       if (email) {
//         const firebaseDB = getFirestore();
//         const userCollection = collection(firebaseDB, 'users');
//         const usersQuery = query(userCollection, where('email', '!=', email));

//         const querySnapshot = await getDocs(usersQuery);
//         const userData = await Promise.all(querySnapshot.docs.map(async documentSnapshot => {
//           const user = documentSnapshot.data();
//           const chatId = `${fuserid}_${user.id}`;
//           const chatQuery = query(collection(firebaseDB, 'chats', chatId, 'messages'));
//           const chatSnapshot = await getDocs(chatQuery);
//           const hasMessages = !chatSnapshot.empty;

//           return {
//             id: documentSnapshot.id,
//             fullName: user.name,
//             mobile: user.mobile,
//             email: user.email,
//             hasMessages: hasMessages,
//           };
//         }));

//         setFromChatUserIdFbse(fuserid);
//         setUsers(userData.filter(user => user.hasMessages));
//       }
//     } catch (error) {
//       console.log("Error fetching users: ", error);
//     }
//   };

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   const setsSelectedUserId = (id, name, mobile, email) => {
//     setToChatUserIdFbse(id);
//     setToChatUserNameFbse(name);
//     setToChatUserEmailFbse(email);
//     setToChatUserMobileFbse(mobile);
//     toggleModal();
//   };

//   return (
//     <View>
//       {users.length > 0 ? (
//         <FlatList
//           data={users}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.userItem}
//               onPress={() => setsSelectedUserId(item.id, item.fullName, item.mobile, item.email)}
//             >
//               <Text>ID: {item.id}</Text>
//               <Text>Full Name: {item.fullName}</Text>
//               <Text>Mobile: {item.mobile}</Text>
//               <Text>Email: {item.email}</Text>
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item) => item.id}
//         />
//       ) : (
//        <>
//        <ChatBlank/>
//        </>
//       )}

//       <MainChats
//         isModalVisible={isModalVisible}
//         toggleModal={toggleModal}
//         formchatUserIdFbse={fromChatUserIdFbse}
//         tochatUserIdFbse={toChatUserIdFbse}
//         tochatUserNameFbse={toChatUserNameFbse}
//         toChatUserMobileFbse={toChatUserMobileFbse}
//       />
//     </View>
//   );
// };

// const MainChats = ({ isModalVisible, toggleModal, formchatUserIdFbse, tochatUserIdFbse, tochatUserNameFbse, toChatUserMobileFbse }) => {
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const firebaseDB = getFirestore();

//   useEffect(() => {
//     const subscriber = onSnapshot(
//       query(
//         collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'),
//         orderBy('createdAt', 'desc')
//       ),
//       (querySnapshot) => {
//         const allmessages: IMessage[] = [];
//         querySnapshot.forEach((doc) => {
//           const messageData = doc.data();
//           allmessages.push({
//             _id: doc.id,
//             text: messageData.text,
//             createdAt: new Date(messageData.createdAt),
//             user: {
//               _id: messageData.sendBy,
//             },
//           });
//         });
//         setMessages(allmessages);
//       }
//     );
//     return () => subscriber();
//   }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

//   const onSend = async (messages = []) => {
//     const newMessage = messages[0];
//     const messageToSend: IMessage = {
//       ...newMessage,
//       sendBy: formchatUserIdFbse,
//       sendTo: tochatUserIdFbse,
//       createdAt: Date.now(),
//     };

//     setMessages((previousMessages) => [...previousMessages, messageToSend]);

//     try {
//       await addDoc(collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'), messageToSend);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }

//     try {
//       await addDoc(collection(firebaseDB, 'chats', `${tochatUserIdFbse}_${formchatUserIdFbse}`, 'messages'), messageToSend);
//     } catch (error) {
//       console.error('Error sending message to the receiver:', error);
//     }
//   };

//   const closeModal = () => {
//     toggleModal();
//   };

//   const openDialer = () => {
//     Linking.openURL(`tel:${toChatUserMobileFbse}`);
//   };

//   return (
//     <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
//       <View style={styles.modalContainer}>
//         <View style={styles.header}>
//           <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
//             <TouchableOpacity onPress={closeModal}>
//               <Ionicons name="arrow-back" style={{ fontSize: 30 }} />
//             </TouchableOpacity>
//             <Text style={{ fontSize: 22, marginLeft: 10 }}>{tochatUserNameFbse}</Text>
//           </View>
//           <View style={{}}>
//             <TouchableOpacity style={{}} onPress={openDialer}>
//               <Ionicons name="call" style={{ fontSize: 25, marginRight: 10 }} />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <GiftedChat
//           messages={messages}
//           onSend={(messages) => onSend(messages)}
//           user={{
//             _id: formchatUserIdFbse,
//           }}
//         />
//       </View>

    
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   userItem: {
//     width: Dimensions.get('window').width - 50,
//     alignSelf: 'center',
//     marginTop: 20,
//     flexDirection: 'column',
//     borderWidth: 0.5,
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "lightgray",
//     borderBottomWidth: 1,
//     borderBottomColor: "gray",
//   },
// });

// export default AllChats;




import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList ,ScrollView, TouchableOpacity, Modal, Linking} from "react-native";
import { getFirestore, collection, query, where, getDocs, Firestore, addDoc, QuerySnapshot, onSnapshot, orderBy } from 'firebase/firestore';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import { Directions } from 'react-native-gesture-handler';
import ChatBlank from './ChatBlank';

const AllChats = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [fromChatUserIdFbse,setFromChatUserIdFbse]=useState('')
  const [toChatUserIdFbse,setToChatUserIdFbse]=useState('')
  const [toChatUserMobileFbse,setToChatUserMobileFbse]=useState('')
  const [toChatUserEmailFbse,setToChatUserEmailFbse]=useState('')
  const [toChatUserNameFbse,setToChatUserNameFbse]=useState('')
  const [uid,setUid] =useState(null)




  useEffect(() => {
    getUsers();
  }, [fromChatUserIdFbse]);
  

  const getUsers = async () => {
    try {
      const email = await AsyncStorage.getItem("femail");
      const fuserid = await AsyncStorage.getItem("fid");
      const userId = await AsyncStorage.getItem("UserIdapp")
      setUid(userId)

      console.log("Current user's email:", email);
      // console.log("firebase form chat user Id:fuser-",fuserid);


      if (email) {
        const firebaseDB = getFirestore();
        const userCollection = collection(firebaseDB, 'users');
        const usersQuery = query(userCollection, where('email', '!=', email));

        // console.log("Users query:", usersQuery); // Check the users query

        const querySnapshot = await getDocs(usersQuery);
        const userData = querySnapshot.docs.map(documentSnapshot => ({
          id: documentSnapshot.id,
          fullName: documentSnapshot.get("name"),
          mobile: documentSnapshot.get("mobile"),
          email: documentSnapshot.get("email"),
          ...documentSnapshot.data()
        }));

        console.log("Fetched users data:", userData); // Check the fetched users data
        setFromChatUserIdFbse(fuserid)
        // console.log("firebase form chat user Id:fromchatuseridfbse-",fromChatUserIdFbse);
        

        setUsers(userData);
      }
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };
  // const handleOnPress=()=>{
  //   navigation.navigate('AllMainChats')
  // }

  const [isModalVisible, setModalVisible] = useState(false);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    // setToChatUserIdFbse(id)
  };

  const setsSelectedUserId=(id:any,name:any,mobile:any,email:any,)=>{
        setToChatUserIdFbse(id)
        setToChatUserNameFbse(name)
        setToChatUserEmailFbse(email)
        setToChatUserMobileFbse(mobile)
        toggleModal();

  }
 
  return (
    <View style={{backgroundColor:'white'}}>
      {/* <Text>{JSON.stringify(users)}</Text> */}
      {uid && users.length > 0 ? (
        // <FlatList
        //   data={users}
        //   renderItem={({ item }) => (
        //     <TouchableOpacity
        //       style={styles.userItem}
        //       onPress={() => setsSelectedUserId(item.id,item.name,item.mobile,item.email)}
        //     >
        //       <Text>ID: {item.id}</Text>
        //       <Text>Full Name: {item.name}</Text>
        //       <Text>Mobile: {item.mobile}</Text>
        //       <Text>Email: {item.email}</Text>
        //     </TouchableOpacity>
        //   )}
        //   keyExtractor={(item) => item.id}
        // />
        <FlatList
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => setsSelectedUserId(item.id, item.name, item.mobile, item.email)}
          >
            <Text style={styles.userId}>ID: {item.id}</Text>
            <Text style={styles.fullName}>Full Name: {item.name}</Text>
            <Text style={styles.mobile}>Mobile: {item.mobile}</Text>
            <Text style={styles.email}>Email: {item.email}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      ) : (
        <>
          <ChatBlank/>
        </>
      )}
  
      <MainChats
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        formchatUserIdFbse={fromChatUserIdFbse}
        tochatUserIdFbse={toChatUserIdFbse}
        tochatUserNameFbse={toChatUserNameFbse}
        toChatUserMobileFbse={toChatUserMobileFbse}
        
      />
    </View>
  );
  
};




const MainChats: React.FC<{
  isModalVisible: boolean;
  toggleModal: () => void;
  formchatUserIdFbse: string;
  tochatUserIdFbse: string;
  tochatUserNameFbse: string;
  toChatUserMobileFbse:string;
  
  
}> = ({ isModalVisible, toggleModal, formchatUserIdFbse, tochatUserIdFbse,tochatUserNameFbse ,toChatUserMobileFbse}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const firebaseDB = getFirestore(); // Get the Firestore instance

  useEffect(() => {
    const subscriber = onSnapshot(
      query(
        collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'),
        orderBy('createdAt', 'desc')
      ),
      (querySnapshot) => {
        const allmessages: IMessage[] = [];
        querySnapshot.forEach((doc) => {
          const messageData = doc.data();
          allmessages.push({
            _id: doc.id,
            text: messageData.text,
            createdAt: new Date(messageData.createdAt),
            user: {
              _id: messageData.sendBy,
            },
          });
        });
        setMessages(allmessages);
      }
    );
    return () => subscriber();
  }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

  const onSend = useCallback(async (messages = []) => {
    const newMessage = messages[0];
    const messageToSend: IMessage = {
      ...newMessage,
      sendBy: formchatUserIdFbse,
      sendTo: tochatUserIdFbse,
      createdAt: Date.now(),
    };

    // Update the state by merging the new message with the existing messages array
    setMessages((previousMessages) => [...previousMessages, messageToSend]);

    // Add message to the sender's chat collection
    try {
      await addDoc(collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'), messageToSend);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    // Add message to the receiver's chat collection
    try {
      await addDoc(collection(firebaseDB, 'chats', `${tochatUserIdFbse}_${formchatUserIdFbse}`, 'messages'), messageToSend);
    } catch (error) {
      console.error('Error sending message to the receiver:', error);
    }
  }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

  const closeModal = () => {
    toggleModal();
  };
  const openDialer = () => {
    Linking.openURL(`tel:${toChatUserMobileFbse}`);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>

          <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={closeModal}>
            <Ionicons name="arrow-back" style={{ fontSize: 30 }} />
           
          </TouchableOpacity>  
          <Text style={{fontSize: 22,marginLeft: 10}}>{tochatUserNameFbse}</Text>        
          </View>


        

          <View style={{}}>
          <TouchableOpacity style={{}} onPress={openDialer}>
            <Ionicons name="call" style={{ fontSize: 25 ,marginRight: 10}} />
          </TouchableOpacity>
          </View>
       
          
        </View>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: formchatUserIdFbse,
          }}
        />
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  userItem: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor:'white',
    elevation:10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'lightcoral',
    borderRadius: 5,
  },
  modalContainer: {
 flex: 1,
   
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
    backgroundColor:'white',
  },

  header: {
    flexDirection: "row",
    // justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightgray",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userItem1: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
  },
  userId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fullName: {
    fontSize: 16,
    marginBottom: 4,
  },
  mobile: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
});

export default AllChats;
