export interface EditMap {
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
    data: [],
  },
  {
    tit: '성별',
    name: 'gender',
    type: 'radio',
    data: [{ value: '남' }, { value: '여' }],
  },
];

export const gradeEditMap: EditMap[] = [
  {
    tit: '반이름',
    name: 'grade',
    type: 'text',
  },
];

type Menu = {
  name: string;
  code: string;
};

export const studentMenu: Menu[] = [
  { name: '오답관리', code: '1' },
  { name: '학생관리', code: '2' },
  { name: '성적관리', code: '3' },
];

type GradeTag = 'name' | 'date' | 'testName' | 'score' | 'comment';

export type GradeModal = {
  학생이름: GradeTag;
  시험일시: GradeTag;
  시험이름: GradeTag;
  '점 수': GradeTag;
  '내 용': GradeTag;
};
export const gradeModalTag: GradeModal = {
  학생이름: 'name',
  시험일시: 'date',
  시험이름: 'testName',
  '점 수': 'score',
  '내 용': 'comment',
};

type AddBookTag = 'name' | 'book' | 'number';

export type AddBookModal = {
  학생이름: AddBookTag;
  책이름: AddBookTag;
  오답번호: AddBookTag;
};
export const addBookModalTag: AddBookModal = {
  학생이름: 'name',
  책이름: 'book',
  오답번호: 'number',
};
