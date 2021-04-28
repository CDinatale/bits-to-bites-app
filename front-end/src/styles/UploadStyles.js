import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  searchContainer: {
    width: '100%',
    flex: 1,
    position: 'relative',
    minHeight: 60,
  },

  loginBtn:{
    width:"75%",
    backgroundColor:"#7C9262",
    height:45,
    alignItems:"center",
    justifyContent:"center",
    marginTop: 20,
    marginBottom:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  loginText:{
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
  },

  searchHeader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  searchText: {
    fontFamily: 'PatrickHand-Regular',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 27,
    color: 'white',
  },
      scrollContainer: {
        flex: 10,
      },
      scroll: {
        width: "100%",
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      },
      inputView: {
        width: "80%",
        backgroundColor: "white",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
      },
      inputText: {
        height: 50,
        color: "black"
      },
      headerText: {
        height: 20,
        fontWeight: 'bold',
      },
      item: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginVertical: 8,
      },
      recipeImage: {
        height: 175,
        width: 175,
        padding: 5
      },
      inputDirections: {
        width: "80%",
        height: 400,
        backgroundColor: "white",
        marginBottom: 20,
       justifyContent:"flex-start",
       paddingLeft: 20 
      },

      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width: 340,
        height: 250,
        padding: 35,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        marginTop:30,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#7C9262",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
       
        fontSize: 15
      },

      input:{
        height: 31,
        width: 100,
        color: "black",
        paddingTop: 1,
        paddingBottom: 10,
        textAlign: 'center',
        top: 0
      }
});
