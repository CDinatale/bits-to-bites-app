import React, { useState, useEffect } from 'react';
import styles from "../styles/FavoritesStyles.js";
import favoriteService from '../services/FavoriteService.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  ImageBackground,
  FlatList,
  Alert,
} from 'react-native';

const FavoritesScreen = ({ route, navigation }) => {

  let [recipeData, setRecipeData] = useState([]);
  const [user, setUser] = useState({});
  let [appertizersSides, setAppetizersSides] = useState({});
  let [mains, setMains] = useState({});
  let [snacksDesserts, setSnacksDesserts] = useState({});

  const Item = ({ item, onPress }) => (
      <TouchableOpacity onPress={ onPress } style={styles.item}>
        <Image source={{ uri: item.imageUrl }} style={styles.recipeImage} />
        <Text style={styles.recipeName}>{item.name}</Text>
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
      return (
        <Item
          item={item}
          onPress={() => { navigation.navigate('StartRecipe', { item, user }); }}
        />
      );
    };

    const getUser = async () => {
      try {
        const obj = await AsyncStorage.getItem('@user');
        return JSON.parse(obj);
      } catch (e) {}
    };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUser().then((data) => {
        setUser(data);

      favoriteService.getFavorites(data.email).then((res) => {
        let allRecipes = res.data;
        setRecipeData(allRecipes);
        sortSearchResults(allRecipes);
      })
      .catch(err => Alert.alert(
        'Error',
        'No recipes found!' + err,
        [
          {
            text: 'Ok',
          },
        ],
        { cancelable: false }
      ))
    });
    })
    return unsubscribe;

  }, [navigation]);

  const sortSearchResults = (arr) => {
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
    console.log(appertizersSides)
    console.log(mains)
    console.log(snacksDesserts)
  };


  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground source={require("../assets/images/background/light-wood.jpg")} style={styles.image}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
          <ImageBackground source={require("../assets/images/background/dark-wood.jpg")} style={styles.image}>
              <View style={styles.searchHeader}>
                  <Text style={styles.searchText}>Favorites</Text>
                  <View style={styles.inputView} >
                      <TextInput
                        style={styles.inputText}
                        placeholder="Search"
                        placeholderTextColor="lightgrey"
                      />
                  </View>
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

export default FavoritesScreen;
