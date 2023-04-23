const currentDate = new Date();

export const districtExample = {
  id: 1,
  provinceId: 1,
  districtNumber: 1,
  createdAt: currentDate,
  updatedAt: currentDate,
  deletedAt: null,

  province: {
    id: 1,
    nameEn: 'Bangkok',
    nameTh: 'กรุงเทพมหานคร',
  },
};
