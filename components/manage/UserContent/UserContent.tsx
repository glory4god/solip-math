import React from 'react';

import Button from '@material-ui/core/Button';
import { User } from 'types/user';

interface ContentProps {
  className?: string;
  condition: string;
  handleCurrIdx: () => void;
  grade: string;
  count: number;
  isShow: boolean;
  userList: User[];
  handleUser: (_id: string) => void;
}

const UserContent: React.FC<ContentProps> = ({
  className,
  condition,
  grade,
  handleCurrIdx,
  count,
  isShow,
  userList,
  handleUser,
}) => {
  return (
    <div className="flex py-2 flex-col justify-center">
      <a onClick={handleCurrIdx}>
        <b>{grade}</b> [{count}명]
      </a>
      {isShow &&
        userList.map((user) => {
          if (user.grade === grade)
            return (
              <div
                className="flex justify-between items-center"
                key={user.name}>
                <span>{user.name}</span>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    const result = confirm(
                      `${user.name}학생을 ${condition}하시겠습니까?`,
                    );
                    if (result) {
                      handleUser(user._id);
                    }
                  }}>
                  <a>{condition}</a>
                </Button>
              </div>
            );
        })}
    </div>
  );
};

export default UserContent;
