export type UserEdit = {
  name: string;
  grade: '중1' | '중2' | '중3' | '고1' | '고2' | '고3' | '';
  gender: '남' | '여' | '';
};

export interface User extends UserEdit {
  _id: string;
  createdDate: Date;
}

export type WrongAnswerType = {
  name: string;
  book: string;
  number: string;
};

export type Wrong = {
  book: string;
  numbers: idAndNumber[];
};

export type idAndNumber = {
  _id: string;
  number: string;
};

export type Management = {
  _id: string;
  author: string;
  studentName: string;
  content: string;
  comment: [];
  createdDate: Date;
};

interface Comment {
  author: string;
  content: string;
  createdDate: Date;
}
