import React, { useState, useEffect } from 'react';
import styles from "../styles/DashboardStyles.js"
import recipeService from '../services/RecipeService.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

const DashboardScreen = ({ navigation }) => {

  let [obj, setObj] = useState('');
  let [recipeData1, setRecipeData1] = useState({});
  let [recipeData2, setRecipeData2] = useState({});
  let [recipeData3, setRecipeData3] = useState({});
  let [pantryData, setPantryData] = useState([]);
  const [user, setUser] = useState({});

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

    recipeService.searchThreeIngredients(data.email).then((res) => {
      let allPantry = res.data;

      pantryData[0] = allPantry[0]
      pantryData[1] = allPantry[1]
      pantryData[2] = allPantry[2]

      recipeService.searchRecipesBasedOnIngredient(data.email+"&"+pantryData[0]).then((res) => {
        let allRecipes = res.data;
        setRecipeData1(allRecipes);
      })
      .catch(err => Alert.alert(
        'Error',
        'No recipes found!',
        [
          {
            text: 'Ok',
          },
        ],
        { cancelable: false }
        
      ))

      recipeService.searchRecipesBasedOnIngredient(data.email+"&"+pantryData[1]).then((res) => {
        let allRecipes = res.data;
        setRecipeData2(allRecipes);
      })
      .catch(err => Alert.alert(
        'Error',
        'No recipes found!',
        [
          {
            text: 'Ok',
          },
        ],
        { cancelable: false }
      ))

      recipeService.searchRecipesBasedOnIngredient(data.email+"&"+pantryData[2]).then((res) => {
        let allRecipes = res.data;
        setRecipeData3(allRecipes);
      })
      .catch(err => Alert.alert(
        'Error',
        'No recipes found!',
        [
          {
            text: 'Ok',
          },
        ],
        { cancelable: false }
      ))
    })
    .catch(err => Alert.alert(
      'Error',
      'No recipes found!',
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

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground source={require("../assets/images/background/light-wood.jpg")} style={styles.image}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <ImageBackground source={require("../assets/images/background/dark-wood.jpg")} style={styles.image}>
              <View style={styles.searchHeader}>
                <Text style={styles.searchText}>Discover</Text>
                <TouchableOpacity style={styles.plusBtn} onPress={() => { navigation.navigate('UploadRecipe')}}>
          <Ionicon name="add" size={50} color="lightgreen" />
        </TouchableOpacity>
                <View style={styles.inputView} >
                  <TextInput
                    style={styles.inputText}
                    placeholder="Search"
                    placeholderTextColor="lightgrey"
                    returnKeyType="search"
                    onChangeText={(text) => { setObj(text) }}
                    onSubmitEditing={() => {
                      navigation.navigate('SearchParameters', { obj, user });
                    }}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.scrollContainer}>
            <ScrollView>
            <View style={styles.scroll}>
            <View style={styles.categoryContainer}>
                <Text style={styles.headerText}>{ pantryData[0] != null ? ("Use your " + pantryData[0]) : ""}</Text>
                { pantryData[0] != null ? ( <FlatList
                  horizontal
                  data={ recipeData1 }
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />): null}
              </View>
              <View style={styles.categoryContainer}>
                <Text style={styles.headerText}>{ pantryData[1] != null ? ("Use your " + pantryData[1]) : ""}</Text>
                { pantryData[1] != null ? ( <FlatList
                  horizontal
                  data={ recipeData2 }
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />): null}
              </View>
              <View style={styles.categoryContainer}>
                <Text style={styles.headerText}>{ pantryData[2] != null ? ("Use your " + pantryData[2]) : ""}</Text>
                { pantryData[2] != null ? ( <FlatList
                  horizontal
                  data={ recipeData3 }
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />): null}
              </View>
              </View>
            </ ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DashboardScreen;
