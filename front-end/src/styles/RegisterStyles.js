import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    backgroundContainer: {
        flex: 1,
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80
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
        marginBottom: 70
      },
      registerText:{
        color:"white",
        fontWeight: "bold",
        fontSize: 17
      },
      headerView:{
        width:"100%",
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
      header1Text:{
        textAlign: 'center',
        marginBottom:20,
        fontSize: 22,
        fontWeight: 'bold',
      },
      header2Text:{
        textAlign: 'center',
        marginBottom:20,
        fontSize: 17,
      },
      signupText:{
        color:"red"
      },
      signinText:{
        color:"#cc0856"
      },
      signinText1:{
        marginTop: 15,
        color: "black",
        fontWeight:"bold",
        fontSize:17
      },
});