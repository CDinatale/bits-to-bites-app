import React, {useState, useEffect} from 'react';
import styles from '../styles/SearchParamsStyles.js';
import recipeService from '../services/RecipeService';
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
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

const SearchParametersScreen = ({route, navigation}) => {
  let [recipeParam, setRecipeParam] = useState(route.params.obj);
  const [user, setUser] = useState(route.params.user);
  const [selectedId, setSelectedId] = useState(null);
  let [searchParam, setSearchParam] = useState('');
  let [recipeData, setRecipeData] = useState({});

  //get a set of recipes the user can make with their pantry items
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      recipeService
        .getRecipesByPantry(user.email)
        .then((res) => {
          setRecipeData(res.data);
        })
        .catch((err) => console.log(err.response.data));
    });
    return unsubscribe;
  }, [navigation]);

  const diet = [
    {id: '1', title: 'vegan'},
    {id: '2', title: 'vegetarian'},
    {id: '3', title: 'pescatarian'},
    {id: '4', title: 'paleo'},
    {id: '5', title: 'low-carb'},
    {id: '6', title: 'healthy'},
    {id: '7', title: 'gluten-free'},
    {id: '8', title: 'dairy-free'},
  ];
  const cuisine = [
    {id: '9', title: 'french'},
    {id: '10', title: 'italian'},
    {id: '11', title: 'mexican'},
    {id: '12', title: 'thai'},
    {id: '13', title: 'indian'},
    {id: '14', title: 'chinese'},
    {id: '15', title: 'caribbean'},
    {id: '16', title: 'greek'},
    {id: '17', title: 'japanese'},
  ];
  const difficulty = [
    {id: '18', title: 'expert'},
    {id: '19', title: 'novice'},
    {id: '20', title: 'intermediate'},
  ];
  const cost = [
    {id: '21', title: 'under $30'},
    {id: '22', title: 'under $15'},
  ];
  const time = [
    {id: '23', title: 'under 1 hour'},
    {id: '24', title: 'under half hour'},
    {id: '25', title: 'under 15 min'},
  ];

  //category button view
  const Item = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.myButton, style]}>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  //change button colour on click
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#FF007F' : '#7C9262';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setSearchParam(item.title);
        }}
        style={{backgroundColor}}
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
                <Text style={styles.searchText}>Search Recipes</Text>
                <View style={styles.inputView}>
                  <TextInput
                    defaultValue={recipeParam}
                    style={styles.inputText}
                    onChangeText={(text) => {
                      setRecipeParam(text);
                    }}
                    onSubmitEditing={() => {
                      navigation.navigate('SearchRecipes', {
                        user,
                        recipeData,
                        recipeParam,
                        searchParam,
                      });
                    }}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.scrollContainer}>
            <ScrollView>
              <View>
                <View style={styles.categoryContainer}>
                  <Text style={styles.category}>DIET</Text>
                  <FlatList
                    contentContainerStyle={{alignSelf: 'flex-start'}}
                    numColumns={4}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={diet}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    extraData={selectedId}
                  />
                </View>
                <View style={styles.categoryContainer}>
                  <Text style={styles.category}>CUISINE</Text>
                  <FlatList
                    contentContainerStyle={{alignSelf: 'flex-start'}}
                    numColumns={5}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={cuisine}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    extraData={selectedId}
                  />
                </View>
                <View style={styles.categoryContainer}>
                  <Text style={styles.category}>DIFFICULTY</Text>
                  <FlatList
                    horizontal
                    data={difficulty}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    extraData={selectedId}
                  />
                </View>
                <View style={styles.categoryContainer}>
                  <Text style={styles.category}>COST</Text>
                  <FlatList
                    horizontal
                    data={cost}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    extraData={selectedId}
                  />
                </View>
                <View style={styles.categoryContainer}>
                  <Text style={styles.category}>TIME</Text>
                  <FlatList
                    horizontal
                    data={time}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    extraData={selectedId}
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

export default SearchParametersScreen;
