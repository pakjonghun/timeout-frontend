import React from 'react';
import TextInput from '@components/TextInput';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@components/ErrorMessage';
import { searchForm } from '@models/record';
import { useGetMyInfoQuery } from '@redux/services/userApi';

interface props {
  onValid: ({ searchTerm, startDate, endDate }: searchForm) => void;
}

const SearchForm: React.FC<props> = ({ onValid }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<searchForm>({
    mode: 'onChange',
    defaultValues: {},
  });

  const { data } = useGetMyInfoQuery();

  return (
    <div className="flex flex-col w-fit mx-auto">
      <form onSubmit={handleSubmit(onValid)} className="relative flex-1 mx-auto z-10">
        <div className="absolute inset-y-0 flex items-center px-3 fill-gray-500">
          <svg className="h-5 w-5 fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7c-12.23-91.55-87.28-166-178.9-177.6c-136.2-17.24-250.7 97.28-233.4 233.4c11.6 91.64 86.07 166.7 177.6 178.9c53.81 7.191 104.3-6.235 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 .0004C515.9 484.7 515.9 459.3 500.3 443.7zM273.7 253.8C269.8 276.4 252.6 291.3 228 296.1V304c0 11.03-8.953 20-20 20S188 315 188 304V295.2C178.2 293.2 168.4 289.9 159.6 286.8L154.8 285.1C144.4 281.4 138.9 269.9 142.6 259.5C146.2 249.1 157.6 243.7 168.1 247.3l5.062 1.812c8.562 3.094 18.25 6.562 25.91 7.719c16.23 2.5 33.47-.0313 35.17-9.812c1.219-7.094 .4062-10.62-31.8-19.84L196.2 225.4C177.8 219.1 134.5 207.3 142.3 162.2C146.2 139.6 163.5 124.8 188 120V112c0-11.03 8.953-20 20-20S228 100.1 228 112v8.695c6.252 1.273 13.06 3.07 21.47 5.992c10.42 3.625 15.95 15.03 12.33 25.47C258.2 162.6 246.8 168.1 236.3 164.5C228.2 161.7 221.8 159.9 216.8 159.2c-16.11-2.594-33.38 .0313-35.08 9.812c-1 5.812-1.719 10 25.7 18.03l6 1.719C238.9 196 281.5 208.2 273.7 253.8z" />
          </svg>
        </div>
        <div className="grid grid-cols-[15rem_1fr]">
          <TextInput
            placeholder={data?.data.role === 'Manager' ? '사용자 이름을 입력하세요' : '초과근무 사유를 입력하세요'}
            register={register('searchTerm')}
            classes=" w-full pr-2 pl-10 pr-3 border-gray-800 rounded-none"
            id="search"
            isLabelShow={false}
          />
          <div className="flex whitespace-nowrap">
            <label
              className="border-[1px] border-x-transparent border-gray-800 ring-pink-300 focus-within:ring-1 focus-within:border-pink-300 flex items-center focus-within:z-40"
              htmlFor="startDate"
            >
              <span className="select-none flex items-center h-full pl-3 bg-gray-100 font-medium text-xs border-0">
                시작
              </span>
              <input
                id="startDate"
                {...register('startDate', {
                  validate: {
                    isValid: (value?: string) => {
                      if (!value) return true;
                      if (value.split('-').length < 3) return '시작날짜가 정확하지 않습니다.';
                      else return true;
                    },

                    isBeforeEndTime: (value?: string) => {
                      if (!value) return true;
                      const { endDate } = getValues();
                      if (!endDate || !value) return true;

                      const isValid = new Date(endDate).getTime() - new Date(value).getTime() >= 0;

                      if (!isValid) return '시작날짜는 종료날짜 이전의 날짜을 입력하세요';
                      else return true;
                    },
                    isBeforeNow: (value?: string) => {
                      if (!value) return true;
                      const diffFormNow = new Date().getTime() - new Date(value).getTime() + 24 * 1000 * 60 * 60;
                      if (diffFormNow < 0) return '시작날짜는 지금보다 이전의 날짜을 입력하세요.';
                      return true;
                    },
                  },
                })}
                className="h-full pr-0 pl-0 border-0 bg-gray-100 text-xs font-medium focus:ring-0 focus:border-transparent"
                type="date"
              />
            </label>
            <label
              className="flex items-center border-[1px] border-r-transparent border-gray-800 ring-pink-300 focus-within:ring-1 focus-within:border-pink-300 focus-within:z-50"
              htmlFor="endDate"
            >
              <span className="select-none flex items-center h-full pl-3 border-r-0 bg-gray-100 font-medium text-xs">
                종료
              </span>
              <input
                id="endDate"
                {...register('endDate', {
                  validate: {
                    isAfterStart: (value?: string) => {
                      if (!value) return true;
                      const { startDate } = getValues();
                      if (!startDate || !value) return true;

                      const isValid = new Date(value).getTime() - new Date(startDate).getTime() >= 0;

                      if (!isValid) return '종료 날짜는 시작날짜 이후의 날짜을 입력하세요';
                      else return true;
                    },
                    isBeforeNow: (value?: string) => {
                      if (!value) return true;
                      const diffFormNow = Date.now() - new Date(value).getTime() + 24 * 1000 * 60 * 60;
                      if (diffFormNow < 0) return '종료 날짜는 지금보다 이전의 날짜을 입력하세요.';
                      return true;
                    },
                  },
                })}
                className="h-full pl-0 pr-0 bg-gray-100 text-xs font-medium border-l-0 border-0 focus:border-gray-800 focus:ring-0"
                type="date"
              />
            </label>
            <button
              type="submit"
              className="px-3 bg-gray-100 border-[1px] border-gray-800 font-medium text-xs hover:border-pink-300 ring-pink-300 hover:ring-1 active:ring-0 active:border-gray-800"
            >
              검색
            </button>
          </div>
        </div>
      </form>
      <div className=" relative h-5">
        <ErrorMessage classes="absolute text-left left-0 w-full bg-white" errorMessage={errors.searchTerm?.message} />
        <ErrorMessage classes="absolute text-left left-0 w-full bg-white" errorMessage={errors.startDate?.message} />
        <ErrorMessage classes="absolute text-left left-0 w-full bg-white" errorMessage={errors.endDate?.message} />
      </div>
    </div>
  );
};

export default SearchForm;
