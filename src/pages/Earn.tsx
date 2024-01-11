import {Button, Colors, Text, TextInput} from 'react-native-paper';
import {Pressable, ScrollView, StatusBar, View} from 'react-native';
import React, {useState} from 'react';
import {customEnter, wallet} from '../types/Types';

import AppColors from '../utils/AppColors';
import AppSize from '../utils/AppSize';
import Firebase from '../firebase/Firebase';

function Earn(): JSX.Element {
  const [generatedItem, setGeneratedItem] = useState<Array<wallet>>([]);
  const [customData, setCustomData] = useState<customEnter>({
    service: 'Salary',
  });

  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View style={{margin: AppSize.hs(20)}}>
        <Text style={{flex: 0.7, fontWeight: 'bold'}}>
          {'Enter Custom  Name'}
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
            label="Name"
            keyboardType="numeric"
            style={{flex: 1, marginHorizontal: 5}}
            value={customData.service}
            activeOutlineColor={AppColors.JapaneseLaurel}
            placeholder="Enter custom  name"
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
          color={Colors.amber200}
          mode="contained"
          onPress={() => {
            if (customData.service && customData.amount) {
              setGeneratedItem([
                ...generatedItem,
                {
                  service: customData.service,
                  type: 'credit',
                  position: generatedItem.length,
                  amount: customData.amount,
                },
              ]);
              setCustomData({});
            }
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
                  placeholder="Enter amount"
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

export default Earn;
