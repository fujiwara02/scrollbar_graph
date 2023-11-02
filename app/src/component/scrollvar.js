import React, { useEffect, useState } from 'react';

const ChartWithScrollbar = () => {
  const [scrollValue, setScrollValue] = useState(0);

  const handleScrollChange = (event) => {
    const newValue = event.target.value;
    setScrollValue(newValue);
  };

  useEffect(() => {
    const createScrollbar = () => {
      const scrollbarContainer = document.getElementById('scrollbar-container');

      // 既存のスクロールバーが存在する場合は削除
      if (scrollbarContainer.children.length > 0) {
        scrollbarContainer.removeChild(scrollbarContainer.children[0]);
      }

      const scrollbar = document.createElement('input');
      scrollbar.type = 'range';
      scrollbar.min = '0';
      scrollbar.max = '100';
      scrollbar.value = scrollValue;
      scrollbar.addEventListener('input', handleScrollChange);

      scrollbarContainer.appendChild(scrollbar);

      console.log(scrollValue)

      return scrollbar;
    };

    const scrollbar = createScrollbar();

    return () => {
      scrollbar.removeEventListener('input', handleScrollChange);
    };
  }, [scrollValue]);

  return (
    <div>
      <div id="scrollbar-container"></div>
      <div id="chartdiv" style={{ width: '100%', height: '300px' }}></div>
    </div>
  );
};

export default ChartWithScrollbar;
