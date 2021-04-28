import React, { useState, useEffect } from 'react';
import styles from "../styles/UploadStyles.js"
import uploadService from '../services/UploadService.js';
import ingredientService from '../services/IngredientService.js';
import categoryService from '../services/CategoryService.js';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Modal, Pressable} from 'react-native';
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
  Button,
} from 'react-native';

const UploadRecipeScreen = ({ navigation }) => {

  let [name, setName] = useState('');
  let [nameError, setNameError] = useState('');
  let [prep, setPrep] = useState('');
  let [prepError, setPrepError] = useState('');
  let [cook, setCook] = useState('');
  let [cookError, setCookError] = useState('');
  let [time, setTime] = useState('');
  let [timeError, setTimeError] = useState('');
  let [direction, setDirection] = useState('');
  let [directionError, setDirectionError] = useState('');
  let [servingError, setServingError] = useState('');
  let [serving, setServing] = useState('');
  let [levelError, setLevelError] = useState('');
  let [level, setLevel] = useState('');
  let [imageError, setImageError] = useState('');
  let [image, setImage] = useState('');

  let [ingredientData, setIngredientData] = useState({});
  let [recipeIngredients,setRecipeIngredients] = useState([]);
  let [categoriesData, setCategoriesData] = useState({});
  let [recipeCategories,setRecipeCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [usCustomaryWeight, setUsCustomaryWeight] = useState(0);
  const [metricWeight, setMetricWeight] = useState(0);
  const [usCustomaryUnit, setUsCustomaryUnit] = useState("");
  const [metricUnit, setMetricUnit] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState({});


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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    categoryService
      .getCategories()
      .then((response) => setCategoriesData(response.data))
      .catch(err => console.log(err.response.data));
    });
    return unsubscribe;

  }, [navigation]);


  let nameValidator = () => {
    if (name == "") {
      setNameError("Enter a Valid Name");
    } else {
      setNameError("");
      return true;
    }
    return false;
  };

  let prepValidator = () => {
    if (prep == "") {
      setPrepError("Enter a Valid Prep Time");
    } else {
      setPrepError("");
      return true;
    }
    return false;
  };

  let cookValidator = () => {
    if (cook == "") {
      setCookError("Enter a Valid Cook Time");
    } else {
      setCookError("");
      return true;
    }
    return false;
  };

  let timeValidator = () => {
    if (time == "") {
      setTimeError("Enter a Valid Total Time");
    } else {
      setTimeError("");
      return true;
    }
    return false;
  };

  let directionValidator = () => {
    if (direction == "") {
      setDirectionError("Enter Valid Directions");
    } else {
      setDirectionError("");
      return true;
    }
    return false;
  };

  let servingValidator = () => {
    if (serving == "") {
      setServingError("Enter a Valid Serving");
    } else {
      setServingError("");
      return true;
    }
    return false;
  };

  let levelValidator = () => {
    if (level == "") {
      setLevelError("Enter a Valid Level");
    } else {
      setLevelError("");
      return true;
    }
    return false;
  };

  let imageValidator = () => {
    if (image == "") {
      setImageError("Enter a Valid Image");
    } else {
      setImageError("");
      return true;
    }
    return false;
  };

  let onSubmit = () => {
    nameValidator();
    prepValidator();
    cookValidator();
    timeValidator();
    directionValidator();
    servingValidator();
    levelValidator();
    imageValidator();
    if (nameValidator() && prepValidator() && cookValidator() && timeValidator() && directionValidator() && servingValidator() && levelValidator() && imageValidator()) {
      uploadRecipe()
      Alert.alert(
        '',
        'Your recipe has been submitted for approval! ',
        [
          {
            text: 'Ok',
          },
        ],
        { cancelable: false },
      )
    }
  }

  let uploadRecipe = () => {
    const params = JSON.stringify({
      "name": name,
      "prepTime": prep,
      "cookTime": cook,
      "directions": direction,
      "totalTime": time,
      "servings": serving,
      "level": level,
      "imageUrl": image,
      "recipeToIngredients": recipeIngredients,
      "linkedCategories": recipeCategories
    });

    console.log("PARAMS                    ", params);

    uploadService.createRecipes(params).then((res) => {
      console.log(res);
    })
    .catch(err => Alert.alert(
      'Error',
      'Cant Upload Recipe! '+err,
      [
        {
          text: 'Ok',
        },
      ],
      { cancelable: false },
      console.log(err)
    ))
  }

  const addCategories = (item) => {
    setRecipeCategories(recipeCategories => [...recipeCategories, item]);
    console.log(recipeCategories);
  }


  const addIngredient = () => {
    let recipeIngredient = {
      "ingredient": selectedIngredient,
      "usCustomaryWeight": parseFloat(usCustomaryWeight),
      "metricWeight": parseFloat(metricWeight),
      "usCustomaryUnitType": usCustomaryUnit,
      "metricUnitType": metricUnit
    }

   
    setModalVisible(false);
    setRecipeIngredients(recipeIngredients => [...recipeIngredients, recipeIngredient]);
    console.log(recipeIngredients);
  }

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
                <Text style={styles.searchText}>Upload Recipe</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.scrollContainer}>
            <ScrollView keyboardShouldPersistTaps="always">
              <View style={styles.scroll}>

                <View style={styles.errorText}>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>{nameError}</Text>
                </View>
                <View style={styles.inputView} >
                  <TextInput
                    style={styles.inputText}
                    placeholder="Name"
                    onBlur={() => nameValidator()}
                    placeholderTextColor="lightgrey"
                    onChangeText={(text) => { setName(text) }}
                  />
                </View>

                <View style={styles.errorText}>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>{prepError}</Text>
                </View>
                <View style={styles.inputView} >
                  <TextInput
                    style={styles.inputText}
                    placeholder="Prep Time"
                    onBlur={() => prepValidator()}
                    placeholderTextColor="lightgrey"
                    onChangeText={(text) => { setPrep(text) }}
                  />
                </View>

                <View style={styles.errorText}>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>{cookError}</Text>
                </View>
                <View style={styles.inputView} >
                  <TextInput
                    style={styles.inputText}
                    placeholder="Cook Time"
                    onBlur={() => cookValidator()}
                    placeholderTextColor="lightgrey"
                    onChangeText={(text) => { setCook(text) }}
                  />
                </View>

                <View style={styles.errorText}>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>{timeError}</Text>
                </View>
                <View style={styles.inputView} >
                  <TextInput
                    style={styles.inputText}
                    placeholder="Total Time"
                    onBlur={() => timeValidator()}
                    placeholderTextColor="lightgrey"
                    onChangeText={(text) => { setTime(text) }}
                  />
                </View>

                <View style={styles.errorText}>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>{servingError}</Text>
                </View>
                <View style={styles.inputView} >
                  <TextInput
                    style={styles.inputText}
                    placeholder="Servings"
                    onBlur={() => servingValidator()}
                    placeholderTextColor="lightgrey"
                    onChangeText={(text) => { setServing(text) }}
                  />
                </View>

                <View style={styles.errorText}>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>{levelError}</Text>
                </View>
                <View style={styles.inputView} >
                  <TextInput
                    style={styles.inputText}
                    placeholder="Difficulty level"
                    onBlur={() => levelValidator()}
                    placeholderTextColor="lightgrey"
                    onChangeText={(text) => { setLevel(text) }}
                  />
                </View>

                <View style={styles.errorText}>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>{imageError}</Text>
                </View>
                <View style={styles.inputView} >
                  <TextInput
                    style={styles.inputText}
                    placeholder="Image Url"
                    onBlur={() => imageValidator()}
                    placeholderTextColor="lightgrey"
                    onChangeText={(text) => { setImage(text) }}
                  />
                </View>
                <View>
                <SearchableDropdown
                  onItemSelect={(item) => {
                    setSelectedIngredient(item);
                    setModalVisible(true);
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
                    placeholder: 'add ingredient',
                    underlineColorAndroid: 'transparent',
                    backgroundColor: 'white',
                    style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
                </View>
                <View>
                <SearchableDropdown
                  onItemSelect={(item) => {
                    addCategories(item)
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
                  items={categoriesData}
                  defaultIndex={2}
                  resetValue={false}
                  textInputProps={{
                    placeholder: 'add categories',
                    underlineColorAndroid: 'transparent',
                    backgroundColor: 'white',
                    style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    },
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
                </View>
                <View style={styles.errorText}>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>{directionError}</Text>
                </View>
                <View style={styles.inputDirections}>
                  <TextInput
                    multiline ={true}
                    numberOfLines = {20}
                    style={styles.inputText}
                    placeholder="Directions"
                    onBlur={() => directionValidator()}
                    placeholderTextColor="lightgrey"
                    onChangeText={(text) => { setDirection(text) }}
                  />
                </View>
                <TouchableOpacity style={styles.loginBtn}
                  onPress={() => onSubmit()}>
                  <Text style={styles.loginText}>
                    Submit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            
            <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.modalText}>Weight (US Customary):</Text>
            <TextInput
                  style={styles.input}
                    placeholder="weight"
                    placeholderTextColor="lightgrey"
                    onChangeText={(text) => { setUsCustomaryWeight(text) }}
                  />
            </View>
            <View style={{flexDirection: 'row'}}>
            <Text style={styles.modalText}>Unit Type (Us Customary):</Text>
            <TextInput
            style={styles.input}
            placeholder="cups, tbsp, tsp"
                    placeholderTextColor="lightgrey"
                    onChangeText={(text) => { setUsCustomaryUnit(text) }}
                  />
            </View>
            <View style={{flexDirection: 'row'}}>
            <Text style={styles.modalText}>Weight (Metric):</Text>
              <TextInput
              style={styles.input}
                    placeholder="weight"
                    placeholderTextColor="lightgrey"
                    onChangeText={(text) => { setMetricWeight(text) }}
                  />
              </View>
              <View style={{flexDirection: 'row'}}>
              <Text style={styles.modalText}>Unit Type (Metric):</Text>
              <TextInput
              style={styles.input}
                    placeholder="g, kg, mL, L"
                    placeholderTextColor="lightgrey"
                    onChangeText={(text) => { setMetricUnit(text) }}
                  />
              </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => addIngredient()}
            >
              <Text style={styles.textStyle}>Add Ingredient</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default UploadRecipeScreen;
