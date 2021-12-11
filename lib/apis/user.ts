import { NEXT_SERVER } from 'config';
import { ClassManagement } from 'types/class';
import { Wrong, User, Management } from 'types/user';
import fetcher from './fetcher';

export async function fetchUserList() {
  return (await fetcher(`${NEXT_SERVER}/v1/users?auth=true`)) as User[];
}

export async function fetchUserIds() {
  const users = (await fetcher(`${NEXT_SERVER}/v1/users?auth=true`)) as User[];
  return users.map((user) => {
    return user._id;
  });
}

export async function fetchExceptUserList() {
  return (await fetcher(`${NEXT_SERVER}/v1/users?auth=false`)) as User[];
}

export async function fetchUser(id: string) {
  return (await fetcher(`${NEXT_SERVER}/v1/user/${id}`)) as User;
}

export async function fetchWrongAnswers(id: string) {
  return (await fetcher(
    `${NEXT_SERVER}/v1/student/wrong/answers?id=${id}`,
  )) as Wrong[];
}

export async function fetchManagements(id: string) {
  return (await fetcher(
    `${NEXT_SERVER}/v1/student/managements/${id}`,
  )) as Management[];
}
export async function fetchClassManagements(grade: string) {
  return (await fetcher(
    `${NEXT_SERVER}/v1/class/managements/${grade}`,
  )) as ClassManagement[];
}
