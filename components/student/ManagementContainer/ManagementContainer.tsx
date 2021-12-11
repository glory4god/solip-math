import React from 'react';
import { NEXT_SERVER } from 'config';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

import { selectUser } from 'lib/redux/user/userSlice';
import { mongoDateFormatting } from 'lib/common';
import { openWriteModal } from 'lib/redux/modal/modalSlice';

import Button from '@material-ui/core/Button';

interface Props {}

type PostManagement = {
  author: string;
  studentName: string;
  content: string;
};

const ManagementContainer: React.FC<Props> = ({}) => {
  const { selectedUser, managementList } = useSelector(selectUser);

  const dispatch = useDispatch();
  const router = useRouter();

  const [editId, setEditId] = React.useState<string>('');
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [editManagement, setEditManagement] = React.useState<PostManagement>({
    author: '',
    studentName: '',
    content: '',
  });

  const onChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditManagement(() => ({
      ...editManagement,
      [name]: value,
    }));
  };

  const deleteManagement = async (id: string) => {
    const res = await fetch(`${NEXT_SERVER}/v1/student/management/${id}/post`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      alert('삭제를 실패했습니다.');
    } else {
      alert('삭제를 성공했습니다.');
    }
    setInitialFetch();
  };

  const patchManagement = async (id: string, postData: PostManagement) => {
    const res = await fetch(`${NEXT_SERVER}/v1/student/management/${id}/post`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postData),
    });
    if (!res.ok) {
      alert('수정을 실패했습니다.');
    } else {
      setIsEditing(false);
      alert('수정을 성공했습니다.');
    }
    setInitialFetch();
  };

  const setInitialFetch = () => {
    router.replace(router.asPath);
    setEditManagement({
      author: '',
      studentName: '',
      content: '',
    });
    setEditId('');
  };

  return (
    <>
      <div className="my-2">학생관리</div>
      <div className="flex justify-end">
        <Button onClick={() => dispatch(openWriteModal('management'))}>
          글쓰기
        </Button>
      </div>
      <table className="w-full">
        <colgroup>
          <col className="w-1/6" />
          <col className="w-4/6" />
          <col className="w-1/6" />
        </colgroup>
        <thead className="h-12">
          <tr>
            <th>작성자/날짜</th>
            <th>내용</th>
            <th>옵션</th>
          </tr>
        </thead>
        <tbody>
          <>
            {managementList?.map((management, idx) => {
              return (
                <tr key={management._id}>
                  {isEditing && editId === management._id ? (
                    <>
                      <th className="sm:px-8 px-2">
                        <input
                          className="w-full  h-8"
                          type="text"
                          name="author"
                          value={editManagement.author}
                          onChange={onChangeHandler}
                        />
                      </th>
                      <td className="p-4">
                        <textarea
                          className="w-full h-32"
                          name="content"
                          value={editManagement.content}
                          onChange={onChangeHandler}
                        />
                      </td>
                      <td className="sm:px-8 flex py-4 justify-center sm:flex-row flex-col">
                        <Button
                          onClick={() => {
                            if (editManagement.author === '') {
                              alert('작성자를 입력하세요');
                            } else if (editManagement.content === '') {
                              alert('내용을 입력하세요');
                            } else {
                              patchManagement(management._id, editManagement);
                            }
                          }}>
                          수정
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditing(false);
                          }}>
                          취소
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <th>
                        {management.author}
                        <br />
                        <span className="text-xs">
                          {mongoDateFormatting(management.createdDate)}
                        </span>
                      </th>
                      <td className="text-left p-4">
                        {management.content
                          .split('\n')
                          .map((content: string, idx) => {
                            return (
                              <span key={idx}>
                                {content}
                                <br />
                              </span>
                            );
                          })}
                      </td>
                      <td className="flex py-4 justify-center sm:flex-row flex-col">
                        <Button
                          onClick={() => {
                            setEditId(management._id);
                            setIsEditing(true);
                            setEditManagement({
                              author: management.author,
                              content: management.content,
                              studentName: management.studentName,
                            });
                          }}>
                          수정
                        </Button>
                        <Button
                          onClick={() => {
                            const result = confirm('글을 삭제하시겠습니까?');
                            if (result) {
                              deleteManagement(management._id);
                            }
                          }}>
                          삭제
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </>
        </tbody>
      </table>
    </>
  );
};

export default ManagementContainer;
