import Avatar from '@components/MainLayout/Avatar';
import React from 'react';

export const userMenuList = [
  {
    id: 1,
    title: 'timer',
    link: '/',
    icon: (
      <svg className="fill-inherit h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M352 0C369.7 0 384 14.33 384 32C384 49.67 369.7 64 352 64V74.98C352 117.4 335.1 158.1 305.1 188.1L237.3 256L305.1 323.9C335.1 353.9 352 394.6 352 437V448C369.7 448 384 462.3 384 480C384 497.7 369.7 512 352 512H32C14.33 512 0 497.7 0 480C0 462.3 14.33 448 32 448V437C32 394.6 48.86 353.9 78.86 323.9L146.7 256L78.86 188.1C48.86 158.1 32 117.4 32 74.98V64C14.33 64 0 49.67 0 32C0 14.33 14.33 0 32 0H352zM111.1 128H272C282.4 112.4 288 93.98 288 74.98V64H96V74.98C96 93.98 101.6 112.4 111.1 128zM111.1 384H272C268.5 378.7 264.5 373.7 259.9 369.1L192 301.3L124.1 369.1C119.5 373.7 115.5 378.7 111.1 384V384z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'record',
    link: '/record',
    icon: (
      <svg className="fill-inherit h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z" />
      </svg>
    ),
  },
];

export const adminMenuList = [
  {
    id: 1,
    title: 'timer',
    link: '/',
    icon: (
      <svg className="fill-inherit h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M352 0C369.7 0 384 14.33 384 32C384 49.67 369.7 64 352 64V74.98C352 117.4 335.1 158.1 305.1 188.1L237.3 256L305.1 323.9C335.1 353.9 352 394.6 352 437V448C369.7 448 384 462.3 384 480C384 497.7 369.7 512 352 512H32C14.33 512 0 497.7 0 480C0 462.3 14.33 448 32 448V437C32 394.6 48.86 353.9 78.86 323.9L146.7 256L78.86 188.1C48.86 158.1 32 117.4 32 74.98V64C14.33 64 0 49.67 0 32C0 14.33 14.33 0 32 0H352zM111.1 128H272C282.4 112.4 288 93.98 288 74.98V64H96V74.98C96 93.98 101.6 112.4 111.1 128zM111.1 384H272C268.5 378.7 264.5 373.7 259.9 369.1L192 301.3L124.1 369.1C119.5 373.7 115.5 378.7 111.1 384V384z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'record',
    link: '/record',
    icon: (
      <svg className="fill-inherit h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z" />
      </svg>
    ),
  },
  {
    id: 28,
    title: 'admin',
    link: '/admin',
    icon: (
      <svg className="fill-inherit h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z" />
      </svg>
    ),
  },
];

export const subMenuList = [
  {
    id: 3,
    title: 'search',
    link: '/search',
    icon: (
      <svg className="w-5 h-5 fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'profile',
    link: '/profile',
    icon: (
      <svg className="h-5 w-5 fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path d="M512 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM176 128c35.35 0 64 28.65 64 64s-28.65 64-64 64s-64-28.65-64-64S140.7 128 176 128zM272 384h-192C71.16 384 64 376.8 64 368C64 323.8 99.82 288 144 288h64c44.18 0 80 35.82 80 80C288 376.8 280.8 384 272 384zM496 320h-128C359.2 320 352 312.8 352 304S359.2 288 368 288h128C504.8 288 512 295.2 512 304S504.8 320 496 320zM496 256h-128C359.2 256 352 248.8 352 240S359.2 224 368 224h128C504.8 224 512 231.2 512 240S504.8 256 496 256zM496 192h-128C359.2 192 352 184.8 352 176S359.2 160 368 160h128C504.8 160 512 167.2 512 176S504.8 192 496 192z" />
      </svg>
    ),
  },

  {
    id: 5,
    link: '/avatar',
  },
];

export const logout = {
  id: 30,
  title: 'logout',
  link: '#',
  icon: (
    <svg className="h-5 w-5 fill-inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z" />
    </svg>
  ),
};
