import React from 'react';
import axios from 'axios';
import { APIURL } from '../config/key';
import { useEffect, useState } from 'react';

const usePagination = ({ filter }) => {
  const [count, setCount] = useState(0);

  useEffect(async() => {
    const res = await axios.get(`${APIURL}/${filter}/count/0`);

    if(res.data.success){
      setCount(res.data.count);
    }

  }, []);

  return count;
};

export default usePagination;