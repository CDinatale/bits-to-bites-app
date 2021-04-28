import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    backgroundContainer: {
        flex: 1,
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      inputView:{
        width:"75%",
        backgroundColor:"white",
        height:45,
        marginBottom: 3,
        justifyContent:"center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
      },
    
      inputText:{
        height:45,
        //fontWeight:"bold",
        color:"black",
        textAlign: 'center',
        fontSize:17
      },
      registerBtn:{
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
      registerText:{
        fontWeight: "bold",
        fontSize: 17,
        color: "white",
      },

      mainText:{
        fontSize: 27,
        marginBottom: 40,
        fontWeight: "bold",
        textAlign: "center"
      },

      subText:{
        fontSize: 17,
        textAlign: "center",
      },

      headerText:{
        width:"85%",
      }
});