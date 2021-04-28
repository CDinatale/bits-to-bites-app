import React, {useState, useEffect} from 'react';
import styles from '../styles/SearchRecipesStyles.js';
import recipeService from '../services/RecipeService';
import pantryService from '../services/PantryService';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  Alert
} from 'react-native';
import {set} from 'react-native-reanimated';

const SearchRecipesScreen = ({route, navigation}) => {
  let [recipeParam, setRecipeParam] = useState(route.params.recipeParam);
  let [searchParam, setSearchParam] = useState(route.params.searchParam);
  const [user, setUser] = useState(route.params.user);
  let [recipeData, setRecipeData] = useState(route.params.recipeData);
  let [appertizersSides, setAppetizersSides] = useState({});
  let [mains, setMains] = useState({});
  let [snacksDesserts, setSnacksDesserts] = useState({});

  //filter recipe data
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    let temp = [];
    //find all recipes where the title contains the keyword entered by the user in search bar
    let recipesByTitle = recipeData.filter((recipe) =>
      recipe.name.toLowerCase().includes(recipeParam.toLowerCase()),
    );
    //if no parameters entered by user, return all recipes
    if (searchParam == '') {
      sortSearchResults(recipesByTitle);
    } else {
      //find all recipes that match the category selected by the user
      recipesByTitle.forEach((recipe) => {
        recipe.linkedCategories.forEach((category) => {
          if (category.name == searchParam) {
            temp.push(recipe);
          }
        });
      });
      sortSearchResults(temp);
    }
  });
  return unsubscribe;
  }, [navigation]);

  //sort search results into Appertizers&Sides, Mains or Snacks&Desserts
  const sortSearchResults = (arr) => {
    if(arr.length == 0){
      Alert.alert(
        'Error',
        'No recipes found!',
        [
          {
            text: 'Ok',
          },
        ],
        { cancelable: false }
        
      )
    }
    else{
    let AppSides = [];
    let main = [];
    let snacksDsrt = [];

    arr.forEach((recipe) => {
      recipe.linkedCategories.forEach((category) => {
        if (category.name == 'appetizer' || category.name == 'side') {
          AppSides.push(recipe);
        }
        if (category.name == 'main') {
          main.push(recipe);
        }
        if (category.name == 'snack' || category.name == 'dessert') {
          snacksDsrt.push(recipe);
        }
      });
    });
    setAppetizersSides(AppSides);
    setMains(main);
    setSnacksDesserts(snacksDsrt);
  }
  };

  //recipe item view
  const Item = ({item, onPress, style}) => (
    <View>
      <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <View>
          <Image source={{uri: item.imageUrl}} style={[styles.recipeImage]} />
          <Text style={[styles.recipeName]}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  //on click send recipe data to start recipe page
  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate('StartRecipe', {item, user});
        }}
      />
    );
  };

  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground
        source={require('../assets/images/background/light-wood.jpg')}
        style={styles.image}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <ImageBackground
              source={require('../assets/images/background/dark-wood.jpg')}
              style={styles.image}>
              <View style={styles.searchHeader}>
                <Text style={styles.searchText}>
                  Search Results for {recipeParam}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.scrollContainer}>
            <ScrollView>
              <View style={styles.scroll}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.headerText}>Appetizers & Sides</Text>
                  <FlatList
                    horizontal
                    data={appertizersSides}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
                <View style={styles.categoryContainer}>
                  <Text style={styles.headerText}>Main Dishes</Text>
                  <FlatList
                    horizontal
                    data={mains}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
                <View style={styles.categoryContainer}>
                  <Text style={styles.headerText}>Snacks & Desserts</Text>
                  <FlatList
                    horizontal
                    data={snacksDesserts}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SearchRecipesScreen;
