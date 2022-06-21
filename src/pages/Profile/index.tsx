import React, { useCallback, useEffect, useState } from 'react';
import MainLayout from '@components/MainLayout';
import Sticker from '@components/Sticker';
import { useLocation } from 'react-router-dom';
import EditProfileForm from './EditProfileForm';
import EditPasswordForm from './EditPasswordForm';
import EditAvatarForm from './EditAvatarForm';
import SelectButton from './SelectButton';
import { useGetMyInfoQuery, useGetMyPrivateQuery } from '@redux/services/userApi';
import Avatar from '@components/MainLayout/Avatar';

const Profile = () => {
  const { data: myPrivateInfo } = useGetMyPrivateQuery();
  const { data: myInfo, isLoading: isMyInfoLoading } = useGetMyInfoQuery();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/avatar') setIsEditAvatar(true);
  }, [pathname]);

  const closeAllInput = useCallback(() => {
    setIsEditPassword(false);
    setIsEditAvatar(false);
    setIsEditProfile(false);
  }, []);

  const onEditProfileClick = useCallback(() => {
    if (isEditPassword) setIsEditPassword(false);
    if (isEditAvatar) setIsEditAvatar(false);
    setIsEditProfile(true);
  }, [isEditPassword, isEditAvatar]);

  const onEditPasswordClick = useCallback(() => {
    if (isEditProfile) setIsEditProfile(false);
    if (isEditAvatar) setIsEditAvatar(false);
    setIsEditPassword(true);
  }, [isEditProfile, isEditAvatar]);

  const onEditAvatarClick = useCallback(() => {
    if (isEditPassword) setIsEditPassword(false);
    if (isEditProfile) setIsEditProfile(false);
    setIsEditAvatar(true);
  }, [isEditPassword, isEditProfile]);

  const phoneInfo = myPrivateInfo?.data.phone;

  return (
    <MainLayout title="Profile">
      <div className="w-fit mx-auto pt-10 flex space-x-10">
        <Avatar isLoading={isMyInfoLoading} src={myInfo?.data.avatar} src2={myInfo?.data.avatar2} size="large" />
        <div className="flex flex-col text-gray-800 space-y-3 font-medium text-sm">
          <span>{myPrivateInfo?.data.name}</span>
          <span>{myPrivateInfo?.data.email}</span>
          <span>{getFullPhoneNumber(phoneInfo)}</span>
          <div className="grid grid-cols-3 gap-y-2 sm:flex sm:items-center sm:space-x-5">
            <SelectButton title="editProfile" onClick={onEditProfileClick} />
            <SelectButton title="editPassword" onClick={onEditPasswordClick} />
            <SelectButton title="editAvatar" onClick={onEditAvatarClick} />
            <Sticker classes="w-fit px-2 py-1 text-sm font-medium text-xs" title={'manager'} />
          </div>
        </div>
      </div>
      {isEditProfile && (
        <EditProfileForm
          email={myPrivateInfo?.data.email}
          phone={myPrivateInfo?.data.phone}
          closeAllInput={closeAllInput}
        />
      )}
      {isEditPassword && <EditPasswordForm closeAllInput={closeAllInput} />}
      {isEditAvatar && <EditAvatarForm closeAllInput={closeAllInput} />}
    </MainLayout>
  );
};

export default Profile;

function getFullPhoneNumber(phone?: number) {
  if (phone == null) return '';
  const temp = phone + '';
  const a = temp.slice(0, 3);
  const b = temp.slice(3, 7);
  const c = temp.slice(7, 11);

  return `${a}-${b}-${c}`;
}
