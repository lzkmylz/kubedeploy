import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import styles from './index.module.scss';

interface MyChart extends HTMLDivElement {
  setOption: (options: object, flag: Boolean) => void
  resize: () => void
}

interface ChildComponentProps {
  /* other props for ChildComponent */
  style: React.CSSProperties
  myChart: MyChart
  options: object
}

const Chart: React.SFC<ChildComponentProps> = ({ style, myChart, options }) => {
  const ref = useRef<HTMLDivElement>(null);

  const loadData = (options: object | null) => {
    if(options) {
      myChart.setOption(options, true);
    }
  }

  const resize = () => {
    myChart.resize();
  }

  useEffect(() => {
    if(ref.current) {
      myChart = myChart || echarts.init(ref.current, options)
      loadData(options);
      window.addEventListener('optimizedResize', resize);
    }
    return () => {
      window.removeEventListener('optimizedResize', resize);
    }
  });



  return (
    <div className={styles.sixteen_nine} >
      <div className={styles.content} style={style} >
        <div
          ref={ref}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}

export default Chart;
