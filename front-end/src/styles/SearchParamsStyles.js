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
        resizeMode: "cover",
        justifyContent: "center"
      },
      searchContainer: {
        width: "100%",
        flex: 1,
      },
      searchHeader: {
        width: "100%",
        justifyContent: "center",
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
        flex: 3,
        marginHorizontal: 25,
      },
    
      scroll: {
        width: "100%",
        height: 200,
        marginBottom: 20,
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
      category: {
        fontWeight: "700",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 5
      },
      categories: {
        flexDirection: 'row',
      },
      myButton: {
        paddingLeft:9,
        paddingRight:9,
        padding: 6,
        borderRadius: 17,
        backgroundColor: "#7C9262",
        marginRight:11,
        marginTop: 5
      },

      categoryContainer: {
        marginBottom: 10
      },

      itemText: {
        fontSize: 15,
        color: "white",
      }
      

});