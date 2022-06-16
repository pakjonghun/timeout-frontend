import React, { useCallback, useEffect, useState } from 'react';
import MainLayout from '@components/MainLayout';
import gravatar from 'gravatar';
import Sticker from '@components/Sticker';
import { useLocation } from 'react-router-dom';
import EditProfileForm from './EditProfileForm';
import EditPasswordForm from './EditPasswordForm';
import EditAvatarForm from './EditAvatarForm';
import SelectButton from './SelectButton';

const Profile = () => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/avatar') setIsEditAvatar(true);
  }, [pathname]);

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

  return (
    <MainLayout title="Profile">
      <div className="w-fit mx-auto pt-10 flex space-x-10">
        <img
          onClick={onEditAvatarClick}
          className="rounded-full w-28 h-28 shadow-md"
          src={gravatar.url('avatar', { s: '80px', d: 'retro' })}
          alt="avatar"
        />
        <div className="flex flex-col text-gray-800 space-y-1">
          <span>name</span>
          <span>phone</span>
          <span>email</span>
          <div className="grid grid-cols-3 gap-y-2 sm:flex sm:items-center sm:space-x-5">
            <SelectButton title="editProfile" onClick={onEditProfileClick} />
            <SelectButton title="editPassword" onClick={onEditPasswordClick} />
            <SelectButton title="editAvatar" onClick={onEditAvatarClick} />
            <Sticker classes="w-fit px-2 py-1 text-sm font-medium text-xs" title={'manager'} />
          </div>
        </div>
      </div>
      {isEditProfile && <EditProfileForm />}
      {isEditPassword && <EditPasswordForm />}
      {isEditAvatar && <EditAvatarForm />}
    </MainLayout>
  );
};

export default Profile;
