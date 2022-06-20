import React, { useCallback, useEffect } from 'react';
import MainLayout from '@components/MainLayout';
import useTimer from './useTimer';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { setInitTimer, setIsWorking } from '@redux/features/timer';
import socket from '../../socket.io';
import { toast } from 'react-toastify';
import { joinStyle } from '@utils/styleUtils';
import { useEndTimerMutation, useStartTimerMutation } from '@redux/services/timerApi';
import Spinner from '@components/Spinner';

const Timer = () => {
  const isWorking = useAppSelector((state) => state.timer.isWorking);
  const dispatch = useAppDispatch();
  const time = useTimer(isWorking);
  const [startTimerMutation, { isLoading: isStartTimerLoading, error: startTimerError }] = useStartTimerMutation();
  const [endTimerMutation, { isLoading: isEndTimerLoading, error: endTimerError }] = useEndTimerMutation();
  const isLoading = isStartTimerLoading || isEndTimerLoading;

  const onStartClick = useCallback(() => {
    dispatch(setIsWorking(true));
    const startTime = new Date();
    startTimerMutation({ startTime });
  }, [dispatch, startTimerMutation]);

  const onStopClick = useCallback(() => {
    const confirm = window.confirm('초과근무를 종료 합니다.');
    if (!confirm) return;
    endTimerMutation({ endTime: new Date() });
    dispatch(setInitTimer());
  }, [dispatch, endTimerMutation]);

  useEffect(() => {
    if (startTimerError) toast.error('초과근무를 시작 할 수 없습니다.');
    if (endTimerError) toast.error('초과근무를 시작 할 수 없습니다.');
  }, [endTimerError, startTimerError]);

  useEffect(() => {
    socket.on('login', (msg) => {
      toast(msg);
    });
    return () => {
      socket.off('login');
    };
  }, []);

  return (
    <MainLayout title="Timer">
      <div className="flex flex-col items-center justify-center h-40 w-40 mt-5 pt-3 mx-auto bg-orange-300 rounded-full bg-gradient-to-tl from-orange-700 to-orange-300">
        {!isLoading && isWorking && (
          <span className="animate-[down_1.5s_linear] text-black font-bold text-2xl">{time}</span>
        )}
        {(isLoading || isEndTimerLoading) && <Spinner classes="mt-16 animate-spin h-5 w-5 fill-orange-500" />}
        <div className="flex p-3 fill-gray-500"></div>
      </div>
      <div className="w-fit mx-auto space-x-2 mt-3">
        <button
          disabled={isWorking}
          onClick={onStartClick}
          className={joinStyle(
            isWorking
              ? 'fill-gray-300'
              : 'hover:fill-gray-800 hover:scale-105 transition-all duration-75 active:scale-100',
          )}
        >
          <svg className="ml-1 fill-inherit h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
          </svg>
        </button>
        <button
          disabled={!isWorking}
          onClick={onStopClick}
          className={joinStyle(
            !isWorking
              ? 'fill-gray-300'
              : 'hover:fill-gray-800 hover:scale-105 transition-all duration-75 active:scale-100',
          )}
        >
          <svg className="fill-inherit h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />
          </svg>
        </button>
      </div>
      <div className="h-[2px] bg-gray-200 my-10" />
      <div className="flex flex-col items-center font-medium text-gray-800 space-y-5">
        <h1 className="text-lg font-bold">Notice</h1>
        <small>초과근무는 오후 7시부터 오후 10시까지 할 수 있습니다.</small>
        <small>오후 10시가 넘어가면 자동으로 종료됩니다.</small>
        <small>열심히 일하는 당신을 응원합니다.</small>
      </div>
    </MainLayout>
  );
};

export default Timer;
