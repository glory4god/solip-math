import { NEXT_SERVER } from 'config';
import { User } from 'types/user';
import fetcher from './fetcher';

export default async function fetchUserList() {
  return (await fetcher(`${NEXT_SERVER}/v1/user`)) as User[];
}
