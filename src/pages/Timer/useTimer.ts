import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from './../../hooks/useRedux';
import { setHour, setMinute } from '@redux/features/timer';

const useTimer = (signal: boolean) => {
  const hour = useAppSelector((state) => state.timer.hour);
  const minute = useAppSelector((state) => state.timer.minute);
  const dispatch = useAppDispatch();

  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (signal) {
      timeRef.current = setTimeout(() => {
        const newMinute = getMinute(minute + 1);
        dispatch(setMinute(newMinute));
        if (!newMinute) dispatch(setHour(hour + 1));
      }, 1000 * 60);
    }

    if (!signal) {
      if (timeRef.current !== null) clearTimeout(timeRef.current);
      timeRef.current = null;
    }

    return () => {
      if (timeRef.current !== null) clearTimeout(timeRef.current);
    };
  }, [signal, minute, hour, dispatch]);

  return getHourAndMinute(hour, minute);
};

export default useTimer;

function getMinute(minute: number) {
  return minute < 60 ? minute : 0;
}

function getHourAndMinute(hour: number, minute: number) {
  const newMinute = minute < 10 ? `0${minute}` : minute;
  const newHour = `0${hour}`;
  return `${newHour} : ${newMinute}`;
}
