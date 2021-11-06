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

type Menu = {
  name: string;
  code: string;
};

export const studentMenu: Menu[] = [
  { name: '오답관리', code: '1' },
  { name: '학생관리', code: '2' },
  { name: '???', code: '3' },
];

export const grades = ['중1', '중2', '중3', '고1', '고2', '고3'];
