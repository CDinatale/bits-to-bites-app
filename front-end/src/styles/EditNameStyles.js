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
      searchContainer: {
        width:"100%",
        flex: 1,
      },
      searchHeader: {
        width:"100%",
        justifyContent:"center",
        alignItems: 'center',
        flex: 1,
      },
      searchText: {
        fontFamily: 'PatrickHand-Regular',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        fontSize: 40,
        color: 'white',
      },
      profileContainer: {
        flex: 6,
        width:"100%",
        justifyContent:"center",
        alignItems: 'center',
      },
      scroll: {
        width:"100%",
        height:200,
        marginBottom:20,
        justifyContent:"center",
        alignItems: 'center',
        padding:20
      },
      inputContainer: {
        width:"100%",
        height:200,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
      inputView: {
        width: '80%',
        backgroundColor: 'white',
        height: 50,
        marginBottom: 10,
        justifyContent: 'center',
        padding: 20,
        borderBottomWidth: 2,
        borderTopWidth: 2,
      },
      inputText: {
        height: 50,
        color: 'black',
      },
      logoutBtn: {
        width: '80%',
        backgroundColor: '#7C9262',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20,
      },
      editBtn: {
        width: '30%',
        backgroundColor: '#7C9262',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      },
      logoutText: {
        color: 'white',
      },
});