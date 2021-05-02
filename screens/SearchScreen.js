import React from 'react';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text, View, FlatList,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import db from '../config';
export default class Searchscreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allTransactions: [],
      lastVisibleTransaction:null,
      search:'',
    }
  }
  fetchMoreTransactions=async () =>{
    var text=this.state.search.toUpperCase();
    var enteredText=text.split("");
    
    if(enteredText[0].toUpperCase()==='B'){
      const query = await db.collection("transactions").where("bookId","==",text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction:doc,
        })
      })
    }
    else if(enteredText[0].toUpperCase()==='S'){
      const query = await db.collection("transactions").where("studentId","==",text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction:doc,
        })
      })
    }
  }
  searchTransactions=async (text) =>{
    
    var enteredText=text.split("");
    
    if(enteredText[0].toUpperCase()==='B'){
      const transaction = await db.collection("transactions").where("bookId","==",text).get()
      transaction.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction:doc,
        })
      })
    }
    else if(enteredText[0].toUpperCase()==='S'){
      const transaction = await db.collection("transactions").where("studentId","==",text).get()
      transaction.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction:doc,
        })
      })
    }
  }
  componentDidMount = async () => {
    const query = await db.collection("transactions").get()
    query.docs.map((doc) => {
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()],
      })
    })
  }

  // render() {
  //   return (
  //     <ScrollView >
  //       {this.state.allTransactions.map((transaction) => {
  //         return (
  //           <View key={index} style={{ borderBottomWidth: 2 }}>
  //             <Text>{"Book ID: " + transaction.bookId}</Text>
  //             <Text>{"Student ID: " + transaction.studentId}</Text>
  //             <Text>{"Transaction Type: " + transaction.transactionType}</Text>
  //             <Text>{"Date: " + transaction.date.toDate()}</Text>
  //           </View>
  //         )
  //       })}
  //     </ScrollView>
  //   );
  // }
  render() {
    return (
      <View>
        <View style={styles.searchBar}>
          <TextInput
          style={styles.bar}
          placeholder=" Enter BookId or Student Id"
          onChangeText={(text)=>{
            this.setState({serach:text})
          }}
          />
          <TouchableOpacity style={styles.searchButton}
          onPress={()=>{this.searchTransactions(this.state.search)}}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      <FlatList
        data={this.state.allTransactions}
        renderItem={({ item }) => (
          <View style={{ borderBottomWidth: 2 }}>
            <Text>{"Book ID: " + item.bookId}</Text>
            <Text>{"Student ID: " + item.studentId}</Text>
            <Text>{"Transaction Type: " + item.transactionType}</Text>
            <Text>{"Date: " + item.date.toDate()}</Text> 
          </View>
        )}
        keyExtractor={(item,index)=>index.toString()}
        onEndReached={this.fetchMoreTransactions}
        onEndReachedThreshold={0.75}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  searchBar:{
    flexDirection:'row',
    height:40,
    width:'auto',
    borderWidth:0.5,
    alignItems:'center',
    backgroundColor:'grey',

  },
  bar:{
    borderWidth:2,
    height:30,
    width:300,
    paddingLeft:10,
  },
  searchButton:{
    borderWidth:1,
    height:30,
    width:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'green'
  }
})