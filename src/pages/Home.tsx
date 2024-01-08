import React, {useEffect, useState} from 'react';

import Firebase from '../firebase/Firebase';
import {Text} from 'react-native-paper';
import {wallet} from '../types/Types';

function Home(): JSX.Element {
  const [data, setData] = useState<wallet[]>([]);
  const userId = Firebase.getCurrentUser();
  useEffect(() => {
    const subscriber = Firebase.walletDB.onSnapshot({
      next: snapshot => {
        var result: wallet[] = [];
        snapshot.forEach(data => {
          result.push({...data.data(), docId: data.id});
        });
        setData(result.filter(i => i.userId == userId));
      },
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const getTotal = () => {
    var total = 0;
    data.forEach(item => {
      if (item.amount) total += item.amount;
    });

    return total;
  };
  console.log(data);
  return (
    <Text style={{flex: 0.1, fontSize: 16, fontWeight: 'bold'}}>
      {getTotal()}
    </Text>
  );
}

export default Home;
