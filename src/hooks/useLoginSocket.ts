import React, { useEffect } from 'react';
import socket from '../socket.io';

const useLoginSocket = (userId?: number, userRole?: 'Manager' | 'Client') => {
  useEffect(() => {
    if (userId == null || userRole == null) return;
    socket.emit('reConnect', { id: userId, role: userRole });
  }, [userId, userRole]);
};

export default useLoginSocket;
