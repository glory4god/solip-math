import React from 'react';

import Button from '@material-ui/core/Button';
import { Wrong, WrongAnswerType } from 'types/user';
import { NEXT_SERVER } from 'config';
import { useSelector } from 'react-redux';
import { selectUser } from 'lib/redux/user/userSlice';
import { useRouter } from 'next/dist/client/router';
import { fetchWrongAnswers } from 'lib/apis/user';

interface Props {}

const WrongAnswerContainer: React.FC<Props> = ({}) => {
  const { selectedUserId, selectedUser } = useSelector(selectUser);
  const [wrongAnswerList, setWrongAnswerList] = React.useState<Wrong[]>();
  const route = useRouter();
  // 책에 따른 번호만 추가하는 상태
  const [addWrongReq, setAddWrongReq] = React.useState<WrongAnswerType>({
    name: '',
    book: '',
    number: '',
  });

  // 책이름까지 설정해서 추가하는 상태
  const [addNewWrongReq, setAddNewWrongReq] = React.useState<WrongAnswerType>({
    name: '',
    book: '',
    number: '',
  });

  const postWrongAnswer = async (postData: WrongAnswerType) => {
    const res = await fetch(`${NEXT_SERVER}/v1/student/wrong/answers`, {
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

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'book' || name === 'number') {
      setAddNewWrongReq(() => ({
        ...addNewWrongReq,
        [name]: value,
      }));
    }
    if (name === '') {
    }
    if (name === '') {
    }
  };

  const deleteWrongAnswer = async (id: string, book: string = '') => {
    if (book === '') {
      const res = await fetch(
        `${NEXT_SERVER}/v1/student/wrong/answers?id=${id}`,
        {
          method: 'DELETE',
        },
      );
      if (!res.ok) {
        alert('삭제를 실패했습니다.');
      } else {
        alert('삭제를 성공했습니다.');
      }
    } else {
      const res = await fetch(
        `${NEXT_SERVER}/v1/student/wrong/answers?id=${id}&book=${book}`,
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
    const books = await fetchWrongAnswers(selectedUserId);
    setAddWrongReq({
      book: '',
      number: '',
      name: selectedUser,
    });
    setAddNewWrongReq({
      book: '',
      number: '',
      name: selectedUser,
    });
    books.map((book, idx) => {
      book.numbers.sort((a, b) => a.number.length - b.number.length);
    });
    setWrongAnswerList(books);
  };

  React.useEffect(() => {
    setInitialFetch();
  }, [selectedUserId]);

  return (
    <>
      <div className=" my-2">오답관리</div>
      <div className="flex justify-end">
        <Button>책추가</Button>
      </div>
      <table className="w-full">
        <colgroup>
          <col className="w-1/6" />
          <col className="w-4/6" />
          <col className="w-1/6" />
        </colgroup>
        <thead className="h-12">
          <tr>
            <th>문제집</th>
            <th>번호</th>
            <th>번호 추가</th>
          </tr>
        </thead>
        <tbody>
          {wrongAnswerList?.map((wrongs, idx) => {
            return (
              <tr key={wrongs.book}>
                <th>
                  {wrongs.book}{' '}
                  <a
                    href="#"
                    onClick={() => {
                      let result = confirm(
                        '책에 대한 오답을 전부 삭제하시겠습니까?',
                      );
                      if (result) {
                        deleteWrongAnswer(selectedUserId, wrongs.book);
                      } else {
                      }
                    }}
                    className="text-xs text-red-300">
                    책 지우기
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
                <td className="flex py-4 sm:flex-row flex-col">
                  <input
                    className="w-full"
                    name={wrongs.book}
                    type="text"
                    value={
                      addWrongReq.book === wrongs.book ? addWrongReq.number : ''
                    }
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
            <th className="sm:px-8 px-1">
              <input
                className="w-full"
                type="text"
                name="book"
                value={addNewWrongReq.book}
                onChange={onChangeHandler}
              />
            </th>
            <td className="px-8">
              <input
                className="w-full"
                type="text"
                value={addNewWrongReq.number}
                name="number"
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
                onChange={onChangeHandler}
              />
            </td>
            <td className="sm:px-8">
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
    </>
  );
};

export default React.memo(WrongAnswerContainer);
