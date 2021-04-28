import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    backgroundContainer: {
        flex: 1,
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
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
      forgot:{
        color:"#484848",
        fontSize:15,
        fontWeight:"bold",
        marginBottom:50
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
      signupText:{
        color:"#cc0856"
      },
      signupText1:{
        color: "black",
        fontWeight:"bold",
        fontSize:17
      },
      errorText:{
        alignItems:"center",
        fontSize: 17
      }
});