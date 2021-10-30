import React from 'react';
import { User } from 'types/user';
interface Props {
  users: User[];
}
const UserList: React.FC<Props> = ({ users }) => {
  return (
    <div className="mt-8">
      {users.map((user, idx) => {
        return <div key={idx}>{user.name}</div>;
      })}
    </div>
  );
};

export default UserList;
