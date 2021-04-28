import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    backgroundContainer: {
        flex: 1,
    },

    container: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: 400,
        height:200,
    },

    headerText: {
        height: 20,
        fontWeight: 'bold',
    },
    RectangleShapeView: {
        position: 'absolute',
        top: 168,
        width: 210,
        height: 75,
        paddingHorizontal:5,
        backgroundColor: "#7C9262",
        justifyContent: "center",
    },
    
    recipeTitleText: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    infoText: {
       fontSize: 15,
       fontWeight: 'normal'
    },
    infoText2:{
        fontSize: 16
    },
    h2Text:{
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom:5
    },
    favBtn:{
      position: 'absolute',
      top: 20,
      right: 20,
    },

    infoContainer:{
      marginLeft: 30,
      marginRight: 30,
      flex: 0.5,
      marginTop: 40
    },

    lvlServings: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 7
    },
    inputText: {
        height: 31,
        width: 30,
        color: "black",
        borderWidth: 1,
        paddingTop: 1,
        paddingBottom: 1,
        textAlign: 'center',
        marginTop: 17,
        marginLeft: 5
      },

    servings: {
        flexDirection: 'row',
    },
    
    lockBtn:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 7
    },

    lock:{
        marginLeft: 25
    },

    clock:{
        marginRight: 25
    },

    directionsStyle:{
      paddingBottom: 20
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        padding: 5,
        backgroundColor: "black",
        borderRadius: 20,
        height: 210,
        width: 300,
        alignItems: "center",
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
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        marginTop: 15,
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
    closeBtn:{
        alignSelf:"flex-end",
        paddingBottom: 10,
    },

    playStop:{
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    playBtn:{
        marginRight: 50
    },

    unitStyle :{
      flexDirection: 'row',
      marginTop: 10
    },

    customaryBtn: {
      marginRight: 10,
    },

    units: {
      textDecorationLine: "underline",
      fontSize: 16,
      color: "blue"
    },

    approveButton: {
      margin: 25,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
    
});
