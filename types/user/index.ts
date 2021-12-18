import { ObjType } from 'types/common';

export type UserEdit = {
  name: string;
  grade: string;
  gender: '남' | '여' | '';
};

export interface User extends UserEdit {
  _id: string;
  auth: boolean | undefined;
  createdDate: Date;
}

export interface Grade {
  _id: string;
  grade: string;
}

export type WrongAnswerType = {
  studentName: string;
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

export type StudentManagement = {
  _id: string;
  author: string;
  studentName: string;
  content: string;
  comment: [];
  createdDate: Date;
};

export interface ScoreManagement extends PostScore {
  _id: string;
}

interface Comment {
  author: string;
  content: string;
  createdDate: Date;
}

export interface PostScore extends ObjType {
  studentName: string;
  date: string;
  testName: string;
  score: string;
  comment: string;
}
