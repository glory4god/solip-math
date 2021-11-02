import { NEXT_SERVER } from 'config';
import { Wrong, User, Management } from 'types/user';
import fetcher from './fetcher';

export async function fetchUserList() {
  return (await fetcher(`${NEXT_SERVER}/v1/users`)) as User[];
}

export async function fetchUser(id: string) {
  return (await fetcher(`${NEXT_SERVER}/v1/user/${id}`)) as User;
}

export async function fetchWrongAnswers(id: string) {
  return (await fetcher(
    `${NEXT_SERVER}/v1/student/wrong/answers?id=${id}`,
  )) as Wrong[];
}

export async function fetchManagements(studentNm: string) {
  return (await fetcher(
    `${NEXT_SERVER}/v1/student/management/${studentNm}`,
  )) as Management[];
}
