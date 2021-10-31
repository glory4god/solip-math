import React from 'react';

import Button from '@material-ui/core/Button';
import { Wrong, WrongAnswerType } from 'types/user';
import { NEXT_SERVER } from 'config';
import { useSelector } from 'react-redux';
import { selectUser } from 'lib/redux/user/userSlice';
import { useRouter } from 'next/dist/client/router';
import { fetchUser, fetchWrongAnswers } from 'lib/apis/user';

interface Props {
  pageId: string;
}

const WrongAnswerBox: React.FC<Props> = ({ pageId }) => {
  const { selectedUserId, selectedUser } = useSelector(selectUser);
  const [wrongAnswerList, setwrongAnswerList] = React.useState<Wrong[]>();
  const route = useRouter();
  const [addWrongReq, setAddWrongReq] = React.useState<WrongAnswerType>({
    name: '',
    book: '',
    number: '',
  });

  const [addNewWrongReq, setAddNewWrongReq] = React.useState<WrongAnswerType>({
    name: '',
    book: '',
    number: '',
  });

  const postWrongAnswer = async (postData: WrongAnswerType) => {
    const res = await fetch(`${NEXT_SERVER}/v1/user/wrong/answers`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postData),
    });
    if (!res.ok) {
      alert('저장에 실패했습니다.');
    } else {
      setAddWrongReq({
        name: '',
        book: '',
        number: '',
      });
      setInitialFetch();
    }
  };
  const newBookOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddNewWrongReq(() => ({
      ...addNewWrongReq,
      number: e.target.value,
    }));
  };

  const deleteWrongAnswer = async (id: string, book: string = '') => {
    if (book === '') {
      const res = await fetch(`${NEXT_SERVER}/v1/user/wrong/answers?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        alert('삭제를 실패했습니다.');
      } else {
        alert('삭제를 성공했습니다.');
      }
    } else {
      const res = await fetch(
        `${NEXT_SERVER}/v1/user/wrong/answers?id=${id}&book=${book}`,
        {
          method: 'DELETE',
        },
      );
      if (!res.ok) {
        alert('삭제를 실패했습니다.');
      } else {
        alert('삭제를 성공했습니다.');
      }
    }

    setInitialFetch();
  };

  const setInitialFetch = async () => {
    const res = await fetchUser(pageId);
    const books = await fetchWrongAnswers(pageId);
    setAddWrongReq({
      book: '',
      number: '',
      name: res.name,
    });
    setAddNewWrongReq({
      book: '',
      number: '',
      name: res.name,
    });
    setwrongAnswerList(books);
  };

  React.useEffect(() => {
    setInitialFetch();
  }, [route.query]);

  return (
    <table className="w-full h-44">
      <colgroup>
        <col className="w-1/6" />
        <col className="w-4/6" />
        <col className="w-1/6" />
      </colgroup>
      <thead>
        <tr>
          <th>문제집</th>
          <th>번호</th>
          <th>번호추가</th>
        </tr>
      </thead>
      <tbody>
        {wrongAnswerList?.map((wrongs, idx) => {
          return (
            <tr key={idx} className="border-t-2 border-purple-200">
              <th>
                {wrongs.book}{' '}
                <a
                  href="#"
                  onClick={() => {
                    let result = confirm(
                      '책에 대한 오답을 전부 삭제하시겠습니까?',
                    );
                    if (result) {
                      deleteWrongAnswer(pageId, wrongs.book);
                    } else {
                    }
                  }}
                  className="text-xs text-red-300">
                  지우기
                </a>
              </th>
              <td>
                {wrongs.numbers.map((arr, idx) => {
                  return (
                    <a
                      href="#"
                      onClick={() => {
                        deleteWrongAnswer(arr._id);
                      }}
                      key={idx}>
                      <b>{arr.number}</b> ,{' '}
                    </a>
                  );
                })}
              </td>
              <td className="flex py-4">
                <input
                  className="w-full"
                  name={wrongs.book}
                  type="text"
                  value={addWrongReq.number}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (addWrongReq.number !== '') {
                        postWrongAnswer(addWrongReq);
                      } else {
                        alert('번호를 입력하세요');
                      }
                    }
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = e.target;
                    if (name === wrongs.book) {
                      setAddWrongReq(() => ({
                        ...addWrongReq,
                        book: wrongs.book,
                        number: value,
                      }));
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    if (addWrongReq.number !== '') {
                      postWrongAnswer(addWrongReq);
                    } else {
                      alert('번호를 입력하세요');
                    }
                  }}>
                  추가
                </Button>
              </td>
            </tr>
          );
        })}
        <tr>
          <th className="px-8">
            <input
              className="w-full"
              type="text"
              value={addNewWrongReq.book}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAddNewWrongReq(() => ({
                  ...addNewWrongReq,
                  book: e.target.value,
                }));
              }}
            />
          </th>
          <td className="px-8">
            <input
              className="w-full"
              type="text"
              value={addNewWrongReq.number}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (addNewWrongReq.book === '') {
                    alert('책을 입력하세요');
                  } else if (addNewWrongReq.number === '') {
                    alert('번호를 입력하세요');
                  } else {
                    postWrongAnswer(addNewWrongReq);
                  }
                }
              }}
              onChange={newBookOnChange}
            />
          </td>
          <td className="px-8">
            <Button
              onClick={() => {
                if (addNewWrongReq.book === '') {
                  alert('책을 입력하세요');
                } else if (addNewWrongReq.number === '') {
                  alert('번호를 입력하세요');
                } else {
                  postWrongAnswer(addNewWrongReq);
                }
              }}>
              추가
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default WrongAnswerBox;
