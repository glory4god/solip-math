import React from 'react';

import Button from '@material-ui/core/Button';
import { User } from 'types/user';
import { NEXT_SERVER } from 'config';
import { useRouter } from 'next/dist/client/router';

import cn from 'classnames';

interface ContentProps {
  className?: string;
  handleCurrIdx: () => void;
  grade: string;
  count: number;
  isShow: boolean;
  userList: User[];
  buttonProps: {
    type: 'alert' | 'modal';
    condition: string;
    buttonHandler: (user: User) => void;
  }[];
}

const UserContent: React.FC<ContentProps> = ({
  className,
  grade,
  handleCurrIdx,
  count,
  isShow,
  userList,
  buttonProps,
}) => {
  const router = useRouter();

  const deleteGradeHandler = async (grade: string) => {
    const res = await fetch(`${NEXT_SERVER}/v1/grade/post?id=${grade}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      return alert('반 삭제를 실패했습니다.');
    }

    router.replace(router.asPath);
    return alert('반을 삭제했습니다.');
  };

  return (
    <div className="flex py-2 flex-col justify-center">
      <a onClick={handleCurrIdx}>
        <b>{grade}</b> [{count}명]{' '}
        <span
          style={{ fontSize: '10px' }}
          onClick={(e) => {
            e.stopPropagation();
            const result = confirm(`${grade}반을 삭제하시겠습니까?`);
            if (result) {
              deleteGradeHandler(grade);
            }
          }}>
          반삭제
        </span>
      </a>
      <div
        className={cn(
          `removeScroll`,
          `${
            isShow ? 'max-h-72' : 'max-h-0'
          } transition:max-height duration-500`,
        )}>
        {isShow &&
          userList.map((user) => {
            if (user.grade === grade)
              return (
                <div
                  className="flex justify-between items-center"
                  key={user.name}>
                  <span>{user.name}</span>
                  <div>
                    {buttonProps.map(({ type, condition, buttonHandler }) => {
                      return (
                        <Button
                          key={condition}
                          variant="outlined"
                          color="secondary"
                          onClick={() => {
                            if (type === 'alert') {
                              const result = confirm(
                                `${user.name}학생을 ${condition}하시겠습니까?`,
                              );
                              if (result) {
                                buttonHandler(user);
                              }
                            } else if (type === 'modal') {
                              buttonHandler(user);
                            }
                          }}>
                          <a>{condition}</a>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              );
          })}
      </div>
    </div>
  );
};

export default UserContent;
