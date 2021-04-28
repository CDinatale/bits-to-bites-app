import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    backgroundContainer: {
        flex: 1,
      },
      container: {
        flex: 1,
        justifyContent: 'center',
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
        fontSize: 35,
        color: 'white',
      },
      scrollContainer: {
        flex: 3,
      },
      scroll: {
        width: "100%",
        height: "100%",
        marginBottom: 20,
        marginTop:10,
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
      
      item: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 15,
        marginTop: 12,
      },

      recipeImage: {
        height: 155,
        width: 165,
        padding: 5
      },
      recipeName:{
        textAlign: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.7)',
        width: 165,
        justifyContent: "center",
        color: "white",
        fontSize: 14,
        position: "absolute",
        bottom: 0,
        paddingBottom: 2,
        paddingTop: 2
      },

      headerText:{
        //fontFamily: 'PatrickHand-Regular',
        fontSize: 23,
        fontWeight: "bold"
      },

      categoryContainer:{
        marginBottom: 45
      }
});