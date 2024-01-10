import React, {FC, useEffect, useState} from 'react';

import {Colors} from 'react-native-paper';
import PieChart from 'react-native-pie-chart';
import {chartData} from '../../types/Types';

const Chart: FC<chartData> = (props: chartData) => {
  const {spentData, earnData} = props;

  const widthAndHeight = 150;

  const sliceColor = [
    Colors.deepOrangeA700,
    Colors.yellow900,
    Colors.greenA700,
  ];

  function getSpendTotal() {
    var total = 0;
    spentData
      .filter(i => i.service !== 'Credit Card')
      .forEach(item => {
        if (item.amount) total += item.amount;
      });

    var cardTotal = 0;
    spentData
      .filter(i => i.service === 'Credit Card')
      .forEach(item => {
        if (item.amount) cardTotal += item.amount;
      });

    if (total > 0 || cardTotal > 0) {
      setSeries([...series, total, cardTotal]);
    }
  }

  function getIncomeTotal() {
    var total = 0;
    earnData.forEach(item => {
      if (item.amount) total += item.amount;
    });
    if (total > 0) {
      setSeries([...series, total]);
    }
  }

  const [series, setSeries] = useState<number[]>([]);

  useEffect(() => {
    getSpendTotal();
  }, [spentData]);

  useEffect(() => {
    getIncomeTotal();
  }, [earnData]);

  console.log('series', series);
  return (
    <React.Fragment>
      {/* {series.length > 2 && (
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
        />
      )} */}
    </React.Fragment>
  );
};

export default Chart;
