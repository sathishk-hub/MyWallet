import {Button, Colors, DataTable, Modal, Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';

import AppSize from '../utils/AppSize';
import {Calendar} from 'react-native-calendars';
import Firebase from '../firebase/Firebase';
import Helper from '../utils/Helper';
import SelectDropdown from 'react-native-select-dropdown';
import firestore from '@react-native-firebase/firestore';
import {wallet} from '../types/Types';

function Table({data}: {data: wallet[]}): JSX.Element {
  return (
    <DataTable style={{padding: 10}}>
      <DataTable.Header>
        <DataTable.Title
          textStyle={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
          Name
        </DataTable.Title>
        <DataTable.Title
          numeric
          textStyle={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
          Type
        </DataTable.Title>
        <DataTable.Title
          numeric
          textStyle={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
          Amount(Rs)
        </DataTable.Title>
      </DataTable.Header>

      {data.map((item, index) => (
        <DataTable.Row key={item.service!! + index}>
          <DataTable.Cell>{item.service}</DataTable.Cell>
          <DataTable.Cell numeric>{item.type}</DataTable.Cell>
          <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}

function DateView(): JSX.Element {
  return <></>;
}

function Home(): JSX.Element {
  const [spentData, setSpentData] = useState<wallet[]>([]);
  const [earnData, setEarnData] = useState<wallet[]>([]);
  const userId = Firebase.getCurrentUser()?.uid;
  const [dataTable, setDataTable] = useState<wallet[]>([]);

  const [spentTotal, setSpentTotal] = useState(0);
  const [earnTotal, setEarnTotal] = useState(0);

  const [selectedMonth, setSelectedMonth] = React.useState(0);

  useEffect(() => {
    const subscriber = Firebase.walletDB.onSnapshot({
      next: snapshot => {
        var result: wallet[] = [];
        snapshot.forEach(data => {
          result.push({...data.data(), docId: data.id});
        });
        setSpentData(
          result.filter(i => i.userId == userId && i.type === 'debit'),
        );
        setEarnData(
          result.filter(i => i.userId == userId && i.type === 'credit'),
        );
      },
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  useEffect(() => {
    const sData = spentData.filter(
      i => i.createdMonth == Helper.getMonths()[selectedMonth],
    );
    const eData = earnData.filter(
      i => i.createdMonth == Helper.getMonths()[selectedMonth],
    );
    setDataTable([...sData, ...eData]);
    getSpentTotal(sData);
    getEarnTotal(eData);
  }, [selectedMonth, spentData, earnData]);

  const getSpentTotal = (data: wallet[]) => {
    var total = 0;
    data.forEach(item => {
      if (item.amount) total += item.amount;
    });

    setSpentTotal(total);
  };
  const getEarnTotal = (data: wallet[]) => {
    var total = 0;
    data.forEach(item => {
      if (item.amount) total += item.amount;
    });

    setEarnTotal(total);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <SelectDropdown
          buttonStyle={{backgroundColor: Colors.green700, width: '100%'}}
          buttonTextStyle={{color: 'white', fontSize: 22}}
          defaultValueByIndex={Helper.getCurrentMonthIndex()}
          data={Helper.getMonths()}
          onSelect={(selectedItem, index) => {
            setSelectedMonth(index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

      {dataTable.length > 0 && <Table data={dataTable} />}
      <View style={{flex: 1, margin: 25}}>
        <View style={{flex: 1, flexDirection: 'row', marginTop: AppSize.vs(4)}}>
          <Text
            style={{
              flex: 0.7,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {`Total income in this month`}
          </Text>
          <Text
            style={{
              flex: 0.1,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {`:`}
          </Text>
          <Text
            style={{
              flex: 0.2,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'right',
            }}>
            {earnTotal}
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: AppSize.vs(4)}}>
          <Text
            style={{
              flex: 0.7,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {`Total amount spend for this month`}
          </Text>
          <Text
            style={{
              flex: 0.1,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {`:`}
          </Text>

          <Text
            style={{
              flex: 0.2,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'right',
            }}>
            {spentTotal}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: AppSize.vs(4)}}>
          <Text
            style={{
              flex: 0.7,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {`Remaining in hand`}
          </Text>
          <Text
            style={{
              flex: 0.1,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {`:`}
          </Text>

          <Text
            style={{
              flex: 0.2,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'right',
            }}>
            {earnTotal - spentTotal}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Home;
