import React, { useCallback, useState } from 'react';
import socket from '../../socket.io';

const NoticeForm = () => {
  const [canNotice, setCanNotice] = useState(false);
  const [notice, setNotice] = useState('');

  const onNoticeSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      socket.emit('notice', notice);
      setNotice('');
      setCanNotice(false);
    },
    [notice],
  );

  const onNoticeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNotice(value);
  }, []);
  return (
    <div className="flex items-center space-x-2 h-10">
      {canNotice ? (
        <form onSubmit={onNoticeSubmit} className="relative h-10 min-w-[50%] rounded-md">
          <input
            value={notice}
            onChange={onNoticeChange}
            className="w-full h-full py-2 pl-5 pr-16 bg-gray-100 shadow-md rounded-sm text-sm placeholder:text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="공지사항 내용을 입력하세요"
          />
          <button className="absolute right-0  inset-y-0 px-2 h-full text-sm font-medium bg-blue-500 text-blue-50 ring-blue-500 ring-offset-1 hover:ring-1 active:ring-0 transition-all duration-75">
            전송
          </button>
        </form>
      ) : (
        <button
          onClick={() => setCanNotice(true)}
          className="flex self-start py-2 px-4 ml-2 text-sm font-bold text-blue-50 rounded-full shadow-md bg-blue-500  hover:scale-[103%] active:scale-100 transition-all duration-75"
        >
          공지사항 전달
        </button>
      )}
    </div>
  );
};

export default NoticeForm;
