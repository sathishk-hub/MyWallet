import {Button, Chip, Text, TextInput} from 'react-native-paper';
import {
  FlatList,
  GestureResponderEvent,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {customEnter, wallet} from '../types/Types';

import AppColors from '../utils/AppColors';
import AppSize from '../utils/AppSize';
import Firebase from '../firebase/Firebase';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

function Spent(): JSX.Element {
  const [data, setData] = useState<[]>();
  const [generatedItem, setGeneratedItem] = useState<Array<wallet>>([]);
  const [customData, setCustomData] = useState<customEnter>({});
 

  useEffect(() => {
    const subscriber = Firebase.optionDB.onSnapshot({
      next: snapshot => {
        var result: FirebaseFirestoreTypes.DocumentData = [];
        snapshot.forEach(data => {
          result.push(data.data());
        });
        setData(result[0]?.options);
      },
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const handleRemoveItem = (position?: number) => {
    if (position != -1) {
      setGeneratedItem(
        generatedItem.filter((item, index) => index !== position),
      );
    }
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        ListHeaderComponent={
          <Text style={{fontWeight: 'bold'}}>Select any Options</Text>
        }
        ListHeaderComponentStyle={{marginVertical: 15}}
        style={{marginHorizontal: AppSize.hs(25), flex: 1}}
        data={data}
        numColumns={2}
        scrollEnabled={false}
        renderItem={({item, index}) => (
          <Chip
            key={index}
            style={{
              margin: 5,
              flex: 1,
              borderColor: AppColors.JapaneseLaurel,
              borderWidth: 1,
            }}
            mode="outlined"
            textStyle={{
              color: AppColors.JapaneseLaurel,
              fontSize: AppSize.hs(15),
              fontWeight: 'bold',
            }}
            onPress={() => {
              setGeneratedItem([
                ...generatedItem,
                {
                  service: item,
                  type: 'debit',
                  position: generatedItem.length,
                  amount: 0,
                  
                },
              ]);
            }}>
            {item}
          </Chip>
        )}
        keyExtractor={item => item}
      />

      <View style={{margin: AppSize.hs(20)}}>
        <Text style={{flex: 0.7, fontWeight: 'bold'}}>
          {'Enter Custom  Services'}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            flex: 1,
          }}>
          <TextInput
            mode="outlined"
            label="Service"
            keyboardType="numeric"
            style={{flex: 1, marginHorizontal: 5}}
            value={customData.service || ''}
            activeOutlineColor={AppColors.JapaneseLaurel}
            placeholder="Enter custom service name"
            onChangeText={service => {
              setCustomData({service});
            }}
          />

          <TextInput
            mode="outlined"
            label="Amount"
            keyboardType="numeric"
            style={{flex: 1, marginHorizontal: 5}}
            value={String(customData.amount || '')}
            activeOutlineColor={AppColors.JapaneseLaurel}
            placeholder="Enter Amount"
            onChangeText={amount => {
              setCustomData({...customData, amount: Number(amount)});
            }}
          />
        </View>
        <Button
          style={{marginHorizontal: 65, marginVertical: AppSize.hs(20)}}
          color={AppColors.JapaneseLaurel}
          mode="contained"
          onPress={() => {
            setGeneratedItem([
              ...generatedItem,
              {
                service: customData.service,
                type: 'debit',
                position: generatedItem.length,
                amount: customData.amount,
              },
            ]);
            setCustomData({});
          }}>
          ADD
        </Button>
      </View>

      {generatedItem.length > 0 && (
        <View style={{marginHorizontal: AppSize.hs(20)}}>
          <Text style={{flex: 0.7, fontWeight: 'bold'}}>
            {'Enter Amount below'}
          </Text>
          {generatedItem.map((item, index) => {
            return (
              <View
                key={String(item + String(index))}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  flex: 1,
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text
                    style={{
                      flex: 0.3,
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {`${index + 1} .`}
                  </Text>
                  <Text style={{flex: 0.7, fontSize: 16, fontWeight: 'bold'}}>
                    {item.service}
                  </Text>

                  <Text style={{flex: 0.1, fontSize: 16, fontWeight: 'bold'}}>
                    :
                  </Text>
                </View>

                <TextInput
                  mode="outlined"
                  label="amount"
                  keyboardType="numeric"
                  style={{flex: 1}}
                  value={String(generatedItem[index]?.amount || '')}
                  activeOutlineColor={AppColors.JapaneseLaurel}
                  placeholder="Enter your username"
                  onChangeText={amount => {
                    generatedItem[index].amount = Number(amount);
                    setGeneratedItem([...generatedItem]);
                  }}
                />
              </View>
            );
          })}

          <Pressable
            style={{
              marginHorizontal: 65,
              marginVertical: AppSize.hs(30),
              backgroundColor: AppColors.JapaneseLaurel,
              borderRadius: 4,
              padding: 8,
              alignItems: 'center',
            }}
            onPress={() => {
              const res = Firebase.saveData({data: generatedItem});
              if (res) {
                setCustomData({});
                setGeneratedItem([]);
              }
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Submit
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

export default Spent;
