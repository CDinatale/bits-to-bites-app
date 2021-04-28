import React, {useState, useEffect} from 'react';
import styles from '../styles/MyPantryStyles.js';
import SearchableDropdown from 'react-native-searchable-dropdown';
import ingredientService from '../services/IngredientService';
import pantryService from '../services/PantryService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {LogBox} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
LogBox.ignoreAllLogs();

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
  Alert,
  FlatList,
  TouchableHighlight,
} from 'react-native';

const MyPantryScreen = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedItem, setSelectedItem] = useState({})
  const [user, setUser] = useState({});
  const [showDairy, setShowDairy] = useState(false);
  const [showVegetables, setShowVegetables] = useState(false);
  const [showFruits, setShowFruits] = useState(false);
  const [showGrains, setShowGrains] = useState(false);
  const [showMeat, setShowMeat] = useState(false);
  const [showSeafood, setShowSeafood] = useState(false);
  const [showSpices, setShowSpices] = useState(false);
  const [showSweeteners, setShowSweeteners] = useState(false);
  const [showNuts, setShowNuts] = useState(false);
  const [showBeverages, setShowBeverages] = useState(false);
  const [showOils, setShowOils] = useState(false);
  const [showSauces, setShowSauces] = useState(false);
  const [showOther, setShowOther] = useState(false);
  let [ingredientData, setIngredientData] = useState({});
  let [dairy, setDairy] = useState([]);
  let [vegetables, setVegetables] = useState([]);
  let [fruits, setFruits] = useState([]);
  let [grains, setGrains] = useState([]);
  let [meat, setMeat] = useState([]);
  let [seafood, setSeafood] = useState([]);
  let [spices, setSpices] = useState([]);
  let [sweeteners, setSweeteners] = useState([]);
  let [nuts, setNuts] = useState([]);
  let [oils, setOils] = useState([]);
  let [beverages, setBeverages] = useState([]);
  let [sauces, setSauces] = useState([]);
  let [other, setOther] = useState([]);

  //retrieve user data from local storage
  const getUser = async () => {
    try {
      const obj = await AsyncStorage.getItem('@user');
      return JSON.parse(obj);
    } catch (e) {}
  };

  //get pantry items from database based on category
  const getPantry = (category) => {
    pantryService.getPantry(user.email)
      .then((response) => {
        let temp = [];
        response.data.forEach((item) => {
          if(item.ingredient.category == category){
            temp.push(item);
          }
        })
        //sort items so they appear in alphabetical order 
        temp.sort((a, b) => (a.ingredient.name > b.ingredient.name) ? 1 : -1);
        if (category == "dairy") {
          setDairy(temp);
          if(showDairy == false){
          setShowDairy(true)
          }
          else{
            setShowDairy(false);
          }
        }
        if (category == "vegetables") {
          setVegetables(temp);
          if(showVegetables == false){
            setShowVegetables(true)
            }
            else{
              setShowVegetables(false);
            }
        }
        if (category == "fruits") {
          setFruits(temp);
          if(showFruits == false){
            setShowFruits(true)
            }
            else{
              setShowFruits(false);
            }
        }
        if (category == "grains") {
          setGrains(temp);
          if(showGrains == false){
            setShowGrains(true)
            }
            else{
              setShowGrains(false);
            }
        }
        if (category == "meat") {
          setMeat(temp);
          if(showMeat == false){
            setShowMeat(true)
            }
            else{
              setShowMeat(false);
            }
        }
        if (category == "seafood") {
          setSeafood(temp);
          if(showSeafood == false){
            setShowSeafood(true)
            }
            else{
              setShowSeafood(false);
            }
        }
        if (category == "spices") {
          setSpices(temp);
          if(showSpices == false){
            setShowSpices(true)
            }
            else{
              setShowSpices(false);
            }
        }
        if (category == "sweeteners") {
          setSweeteners(temp);
          if(showSweeteners == false){
            setShowSweeteners(true)
            }
            else{
              setShowSweeteners(false);
            }
        }
        if (category == "nuts") {
          setNuts(temp);
          if(showNuts == false){
            setShowNuts(true)
            }
            else{
              setShowNuts(false);
            }
        }
        if (category == "oils") {
          setOils(temp);
          if(showOils == false){
            setShowOils(true)
            }
            else{
              setShowOils(false);
            }
        }
        if (category == "sauces") {
          setSauces(temp);
          if(showSauces == false){
            setShowSauces(true)
            }
            else{
              setShowSauces(false);
            }
        }
        if (category == "beverages") {
          setBeverages(temp);
          if(showBeverages == false){
            setShowBeverages(true)
            }
            else{
              setShowBeverages(false);
            }
        }
        if (category == "other") {
          setOther(temp);
          if(showOther == false){
            setShowOther(true)
            }
            else{
              setShowOther(false);
            }
        }
      })
  }

  //retrieve ingredient data 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    ingredientService
      .getIngredients()
      .then((response) => setIngredientData(response.data))
      .catch(err => console.log(err.response.data));
    });
    return unsubscribe;

  }, [navigation]);

  //retrieve user
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    getUser().then((data) => setUser(data));
    });
    return unsubscribe;
  }, [navigation]);

  //add item to user pantry
  const update_ingredients = (item) => {
    //check to see if it's already in user's pantry before adding
    pantryService.getPantry(user.email)
      .then((response) => {
        let exists = false;
        response.data.forEach((pantryIngredient) => {
          if(pantryIngredient.ingredient.name == item.name){
            exists = true;
          }
        })
        if(exists){
          Alert.alert("", "You already added this ingredient to your pantry!",
          [
            {
              text: 'Ok',
            },
          ],
          { cancelable: false })
        }
        else{
          pantryService
          .updateUser(user.email, item.id)
          .then(response => Alert.alert(
            '',
            'This ingredient has been successfully added to your pantry.',
            [
              {
                text: 'Ok',
              },
            ],
            { cancelable: false },
          ))
          .catch(err => console.log(err.response.data));
        }
      })
  };

  //delete item from user pantry
  const deleteItem = (item) =>{
    if (item.ingredient.category == "dairy") {
      let filteredDairy = dairy.filter(ingredient => ingredient !== item);
      setDairy(filteredDairy);
    }
    if (item.ingredient.category == "vegetables") {
      let filteredVegetables = vegetables.filter(ingredient => ingredient !== item);
      setVegetables(filteredVegetables);
    }
    if (item.ingredient.category == "fruits") {
      let filteredFruits = fruits.filter(ingredient => ingredient !== item);
      setFruits(filteredFruits);
    }
    if (item.ingredient.category == "grains") {
      let filteredGrains = grains.filter(ingredient => ingredient !== item);
      setGrains(filteredGrains);
    }
    if (item.ingredient.category == "meat") {
      let filteredMeat = meat.filter(ingredient => ingredient !== item);
      setMeat(filteredMeat);
    }
    if (item.ingredient.category == "seafood") {
      let filteredSeafood = seafood.filter(ingredient => ingredient !== item);
      setSeafood(filteredSeafood);
    }
    if (item.ingredient.category == "spices") {
      let filteredSpices = spices.filter(ingredient => ingredient !== item);
      setSpices(filteredSpices);
    }
    if (item.ingredient.category == "sweeteners") {
      let filteredSweeteners = sweeteners.filter(ingredient => ingredient !== item);
      setSweeteners(filteredSweeteners);
    }
    if (item.ingredient.category == "nuts") {
      let filteredNuts = nuts.filter(ingredient => ingredient !== item);
      setNuts(filteredNuts);
    }
    if (item.ingredient.category == "oils") {
      let filteredOils = oils.filter(ingredient => ingredient !== item);
      setOils(filteredOils);
    }
    if (item.ingredient.category == "sauces") {
      let filteredSauces = sauces.filter(ingredient => ingredient !== item);
      setSauces(filteredSauces);
    }
    if (item.ingredient.category == "beverages") {
      let filteredBeverages = beverages.filter(ingredient => ingredient !== item);
      setBeverages(filteredBeverages);
    }
    if (item.ingredient.category == "other") {
      let filteredOther = other.filter(ingredient => ingredient !== item);
      setOther(filteredOther);
    }
    pantryService
    .deletePantryItem(item.id, user.email)
    .then(response => console.log(response.data))
    .catch(err => Alert.alert(
      'Error',
      'Pantry item could not be deleted!',
      [
        {
          text: 'Ok',
        },
      ],
      { cancelable: false },
      console.log(err.response.data)
    ))
  
  }

  //pantry item view 
  const Item = ({item}) => (
    <View style={styles.myButton} backgroundColor="white">
      <Text style={{fontWeight: 'bold', fontSize: 15}}>{item.ingredient.name}</Text>
      <View style={{flexDirection: 'row'}}>
      <Text style={{fontSize: 15, color: "green", paddingRight:7}}>{item.expiryDate}</Text>
        <TouchableOpacity onPress={() => {showDatePicker(); setSelectedItem(item) }}>
          <Icon name="calendar-outline" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {deleteItem(item) }}>
          <Icon name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({item}) => {
    return <Item item={item} />;
  };

  //show calendar on button click
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  //hide calendar on button click
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //set pantry item expiry date
  const handleConfirm = (date) => {
    let d = date.toISOString().split('T')[0];
    pantryService.updatePantryItem(user.email,selectedItem.id, d)
    .then((response) => console.log(response))
    .catch(err => console.log(err.response.data));
    hideDatePicker();
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
                <Text style={styles.searchText}>My Pantry</Text>
                <SearchableDropdown
                  onItemSelect={(item) => {
                    update_ingredients(item);
                  }}
                  containerStyle={{padding: 5, width: 300}}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: 'white',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                  itemTextStyle={{color: '#222'}}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={ingredientData}
                  defaultIndex={2}
                  resetValue={false}
                  textInputProps={{
                    placeholder: 'search ingredient',
                    underlineColorAndroid: 'transparent',
                    backgroundColor: 'white',
                    style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                    //onTextChange: text => alert(text)
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
          <ScrollView style={styles.scroll} keyboardShouldPersistTaps="always">
            <View style={styles.categoryContainer}>
              <ImageBackground
                source={require('../assets/images/background/dark-wood.jpg')}
                style={styles.backgroundImage}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/icons/dairy-icon.jpg')}
                />
                <Text style={styles.categoryText}>Dairy</Text>
                <TouchableOpacity style={styles.arrow}
                  onPress={() => {
                   getPantry("dairy");
                  }}>
                  <Icon name="caret-down-outline" size={25} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View>
              {showDairy ? ( <FlatList
                data={dairy}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />): null}
            </View>
            <View style={styles.categoryContainer}>
              <ImageBackground
                source={require('../assets/images/background/dark-wood.jpg')}
                style={styles.backgroundImage}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/icons/broccoli-icon.jpg')}
                />
                <Text style={styles.vegetable}>Vegetables</Text>
                <TouchableOpacity style={styles.arrow}
                  onPress={() => {
                    getPantry("vegetables");
                  }}>
                  <Icon name="caret-down-outline" size={25} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View>
              {showVegetables ? (<FlatList
                data={vegetables}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />) : null}
            </View>
            <View style={styles.categoryContainer}>
              <ImageBackground
                source={require('../assets/images/background/dark-wood.jpg')}
                style={styles.backgroundImage}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/icons/fruit-icon.jpg')}
                />
                <Text style={styles.categoryText}>Fruits</Text>
                <TouchableOpacity style={styles.arrow}
                  onPress={() => {
                    getPantry("fruits");
                  }}>
                  <Icon name="caret-down-outline" size={25} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View>
              {showFruits? (<FlatList
                data={fruits}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />) : null}
            </View>
            <View style={styles.categoryContainer}>
              <ImageBackground
                source={require('../assets/images/background/dark-wood.jpg')}
                style={styles.backgroundImage}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/icons/grains-icon.jpg')}
                />
                <Text style={styles.categoryText}>Grains</Text>
                <TouchableOpacity style={styles.arrow}
                  onPress={() => {
                    getPantry("grains");
                  }}>
                  <Icon name="caret-down-outline" size={25} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View>
              {showGrains? ( <FlatList
                data={grains}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />) : null}
            </View>
            <View style={styles.categoryContainer}>
              <ImageBackground
                source={require('../assets/images/background/dark-wood.jpg')}
                style={styles.backgroundImage}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/icons/meat-icon.jpg')}
                />
                <Text style={styles.categoryText}>Meat</Text>
                <TouchableOpacity style={styles.arrow}
                  onPress={() => {
                    getPantry("meat");
                  }}>
                  <Icon name="caret-down-outline" size={25} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View>
              {showMeat? (<FlatList
                data={meat}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />) : null}
            </View>
            <View style={styles.categoryContainer}>
              <ImageBackground
                source={require('../assets/images/background/dark-wood.jpg')}
                style={styles.backgroundImage}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/icons/seafood-icon.jpg')}
                />
                <Text style={styles.sea}>Seafood</Text>
                <TouchableOpacity style={styles.arrow}
                  onPress={() => {
                    getPantry("seafood");
                  }}>
                  <Icon name="caret-down-outline" size={25} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View>
              {showSeafood? (<FlatList
                data={seafood}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />) : null}
            </View>
            <View style={styles.categoryContainer}>
              <ImageBackground
                source={require('../assets/images/background/dark-wood.jpg')}
                style={styles.backgroundImage}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/icons/spices-icon.jpg')}
                />
                <Text style={styles.categoryText}>Spices</Text>
                <TouchableOpacity style={styles.arrow}
                  onPress={() => {
                    getPantry("spices");
                  }}>
                  <Icon name="caret-down-outline" size={25} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View>
              {showSpices? (<FlatList
                data={spices}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />) : null}
            </View>
            <View style={styles.categoryContainer}>
              <ImageBackground
                source={require('../assets/images/background/dark-wood.jpg')}
                style={styles.backgroundImage}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/icons/sweetners-icon.jpg')}
                />
                <Text style={styles.sweetner}>Sweeteners</Text>
                <TouchableOpacity style={styles.arrow}
                  onPress={() => {
                    getPantry("sweeteners");
                  }}>
                  <Icon name="caret-down-outline" size={25} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View>
              {showSweeteners? (<FlatList
                data={sweeteners}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />) : null}
            </View>
            <View style={styles.categoryContainer}>
              <ImageBackground
                source={require('../assets/images/background/dark-wood.jpg')}
                style={styles.backgroundImage}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/icons/nuts-icon.jpg')}
                />
                <Text style={styles.nuts}>Nuts & Seeds</Text>
                <TouchableOpacity style={styles.arrow}
                  onPress={() => {
                    getPantry("nuts");
                  }}>
                  <Icon name="caret-down-outline" size={25} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View>
              {showNuts ? (<FlatList
                data={nuts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />) : null}
            </View>
            <View style={styles.categoryContainer}>
              <ImageBackground
                source={require('../assets/images/background/dark-wood.jpg')}
                style={styles.backgroundImage}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/icons/oil-icon.jpg')}
                />
                <Text style={styles.oils}>Oils & Vinegars</Text>
                <TouchableOpacity style={styles.arrow}
                  onPress={() => {
                    getPantry("oils");
                  }}>
                  <Icon name="caret-down-outline" size={25} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View>
              {showOils ? (<FlatList
                data={oils}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />) : null}
            </View>
            <View style={styles.categoryContainer}>
              <ImageBackground
                source={require('../assets/images/background/dark-wood.jpg')}
                style={styles.backgroundImage}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/icons/sauces-icon.jpg')}
                />
                <Text style={styles.sauce}>Sauces</Text>
                <TouchableOpacity style={styles.arrow}
                  onPress={() => {
                    getPantry("sauces");
                  }}>
                  <Icon name="caret-down-outline" size={25} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View>
              {showSauces ? (<FlatList
                data={sauces}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />) : null}
            </View>
            <View style={styles.categoryContainer}>
              <ImageBackground
                source={require('../assets/images/background/dark-wood.jpg')}
                style={styles.backgroundImage}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/icons/beverages-icon.jpg')}
                />
                <Text style={styles.beverage}>Beverages</Text>
                <TouchableOpacity style={styles.arrow}
                  onPress={() => {
                    getPantry("beverages");
                  }}>
                  <Icon name="caret-down-outline" size={25} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View>
              {showBeverages ? (<FlatList
                data={beverages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />) : null}
            </View>
            <View style={styles.categoryContainer}>
              <ImageBackground
                source={require('../assets/images/background/dark-wood.jpg')}
                style={styles.backgroundImage}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/icons/other-icon.jpg')}
                />
                <Text style={styles.other}>Other</Text>
                <TouchableOpacity style={styles.arrow}
                  onPress={() => {
                    getPantry("other");
                  }}>
                  <Icon name="caret-down-outline" size={25} color="white" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View>
              {showOther ? (<FlatList
                data={other}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />) : null}
            </View>
          </ScrollView>
        </View>
        <View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
      </ImageBackground>
    </View>
  );
};

export default MyPantryScreen;
