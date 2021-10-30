interface EditMap {
  tit: string;
  name: 'name' | 'grade' | 'gender';
  type: string;
  data?: Data[];
}
type Data = {
  value: string;
};
export const profileEditMap: EditMap[] = [
  {
    tit: '이름',
    name: 'name',
    type: 'text',
  },
  {
    tit: '학년',
    name: 'grade',
    type: 'radio',
    data: [
      { value: '중1' },
      { value: '중2' },
      { value: '중3' },
      { value: '고1' },
      { value: '고2' },
      { value: '고3' },
    ],
  },
  {
    tit: '성별',
    name: 'gender',
    type: 'radio',
    data: [{ value: '남' }, { value: '여' }],
  },
];
