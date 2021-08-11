// import useSWR from 'swr';
import { useState } from 'react';

export const fetcher = async url => await fetch(url)
  .then(async res => {
    const result = await res.json();

    if (res.status !== 200) {
      return Promise.reject(result);
    } else {
      //return result;
      return Promise.resolve(result);
    }
  }).catch(e=>{ 
    console.clear();
    return Promise.reject(e); 
  });

export function useApiHandler(apiCall) {
  const [reqState, setReqState] = useState({
    error: null,
    data: null,
    loading: false
  });
  
  const handler = async (...data) => {
    setReqState({error: null, data: null, loading: true});

    try {
      const json = await apiCall(...data);
      console.log("actions index js useApiHandler hander() json.data: \n", json.data);
      setReqState({error: null, data: json.data, loading: false});
      return json.data;
    } catch (e) {
      // console.log("actions index js useApiHandler hander() error: \n", e);
      // console.log("actions index js useApiHandler hander() error.toString(): \n", e.toString());
      const message = (e && e) 
        || (e.toString() && e.toString()) || 'Oooops, something went wrong...';
      setReqState({error: message, data: null, loading: false});
      return Promise.reject(message);
    }
  }
  return [handler, {...reqState}];
};