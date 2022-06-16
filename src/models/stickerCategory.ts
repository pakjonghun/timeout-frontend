export const stickerCategory = {
  working: { bgColor: 'bg-orange-500', textColor: 'text-orange-50' },
  done: { bgColor: 'bg-gray-500', textColor: 'text-gray-50' },
  manager: { bgColor: 'bg-purple-300', textColor: 'text-purple-50' },
  client: { bgColor: 'bg-pink-300', textColor: 'text-pink-50' },
};

export type StickerCategory = keyof typeof stickerCategory;
