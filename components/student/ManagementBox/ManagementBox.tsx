import React from 'react';

import Button from '@material-ui/core/Button';
import { Management, Wrong, WrongAnswerType } from 'types/user';
import { NEXT_SERVER } from 'config';
import { useSelector } from 'react-redux';
import { selectUser } from 'lib/redux/user/userSlice';
import { useRouter } from 'next/dist/client/router';
import { fetchManagements } from 'lib/apis/user';
import { mongoDateFormatting } from 'lib/common';

interface Props {
  pageId: string;
}

type PostManagement = {
  author: string;
  studentName: string;
  content: string;
};

const ManagementBox: React.FC<Props> = ({ pageId }) => {
  const { selectedUserId, selectedUser } = useSelector(selectUser);
  const [managementList, setManagementList] = React.useState<Management[]>();

  const [addWrongReq, setAddWrongReq] = React.useState<WrongAnswerType>({
    name: '',
    book: '',
    number: '',
  });

  const [postManagement, setPostManagement] = React.useState<PostManagement>({
    author: '',
    studentName: '',
    content: '',
  });

  const route = useRouter();

  const handlePostManagement = async (postData: PostManagement) => {
    const res = await fetch(
      `${NEXT_SERVER}/v1/student/management/${postData.studentName}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(postData),
      },
    );
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
  const postManagementOnChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPostManagement(() => ({
      ...postManagement,
      [name]: value,
    }));
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
    const management = await fetchManagements(selectedUser);
    setAddWrongReq({
      book: '',
      number: '',
      name: selectedUser,
    });
    setPostManagement({
      author: '',
      studentName: selectedUser,
      content: '',
    });
    setManagementList(management);
  };

  React.useEffect(() => {
    setInitialFetch();
  }, [route.query]);

  return (
    <table className="w-full">
      <colgroup>
        <col className="w-1/6" />
        <col className="w-4/6" />
        <col className="w-1/6" />
      </colgroup>
      <thead>
        <tr>
          <th>작성자/날짜</th>
          <th>내용</th>
          <th>옵션</th>
        </tr>
      </thead>
      <tbody>
        {managementList?.map((management, idx) => {
          return (
            <tr key={idx} className="border-t-2 border-purple-200">
              <th>
                {management.author}
                <br />
                <span className="text-xs">
                  {mongoDateFormatting(management.createdDate)}
                </span>
              </th>
              <td className="text-left px-4">
                {management.content.split('\n').map((content: string, idx) => {
                  return (
                    <span key={idx}>
                      {content}
                      <br />
                    </span>
                  );
                })}
              </td>
              <td className="flex py-4 justify-center">
                <Button onClick={() => {}}>댓글달기</Button>
              </td>
            </tr>
          );
        })}
        <tr>
          <th className="px-8">
            <input
              className="w-full"
              type="text"
              name="author"
              value={postManagement.author}
              onChange={postManagementOnChange}
            />
          </th>
          {console.log(postManagement)}
          <td className="px-4">
            <textarea
              className="w-full"
              name="content"
              value={postManagement.content}
              onChange={postManagementOnChange}
            />
          </td>
          <td className="px-8">
            <Button
              onClick={() => {
                if (postManagement.author === '') {
                  alert('작성자를 입력하세요');
                } else if (postManagement.content === '') {
                  alert('내용을 입력하세요');
                } else {
                  handlePostManagement(postManagement);
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

export default ManagementBox;
