import React from 'react';

import Button from '@material-ui/core/Button';
import { Management, Wrong, WrongAnswerType } from 'types/user';
import { NEXT_SERVER } from 'config';
import { useSelector } from 'react-redux';
import { selectUser } from 'lib/redux/user/userSlice';
import { useRouter } from 'next/dist/client/router';
import { fetchManagements } from 'lib/apis/user';
import { mongoDateFormatting } from 'lib/common';
import ManageMentInput from 'components/ui/ManageMentInput';

interface Props {}

type PostManagement = {
  author: string;
  studentName: string;
  content: string;
};

const ManagementContainer: React.FC<Props> = ({}) => {
  const { selectedUserId, selectedUser } = useSelector(selectUser);
  const [managementList, setManagementList] = React.useState<Management[]>();
  const [postManagement, setPostManagement] = React.useState<PostManagement>({
    author: '',
    studentName: '',
    content: '',
  });

  const [editId, setEditId] = React.useState<string>('');
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [editManagement, setEditManagement] = React.useState<PostManagement>({
    author: '',
    studentName: '',
    content: '',
  });

  const route = useRouter();

  const handlePostManagement = async (postData: PostManagement) => {
    const res = await fetch(`${NEXT_SERVER}/v1/student/management/post`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postData),
    });
    if (!res.ok) {
      alert('저장에 실패했습니다.');
    } else {
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

  const patchManagementOnChange = async (
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
      setEditId('');
      alert('수정을 성공했습니다.');
    }
    setInitialFetch();
  };

  const setInitialFetch = async () => {
    setIsLoading(true);
    const management = await fetchManagements(selectedUser);

    setPostManagement({
      author: '',
      studentName: selectedUser,
      content: '',
    });
    setManagementList(management);
    setIsLoading(false);
    setIsEditing(false);
    setEditId('');
  };

  React.useEffect(() => {
    setInitialFetch();
  }, [route.query, selectedUser]);

  return (
    <>
      <div className="sm:mb-6 my-2">학생관리</div>
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
          {!isEditing && (
            <ManageMentInput
              author={postManagement.author}
              content={postManagement.content}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
              ) => postManagementOnChange(e)}
              handlePost={() => handlePostManagement(postManagement)}
              tag={'추가'}
            />
          )}
          {isLoading ? (
            <>
              <tr>
                <th className="sm:px-8 px-2">Loading ... </th>
                <td className="px-4">Loading ...</td>
                <td className="sm:px-8 flex py-4 justify-center sm:flex-row flex-col">
                  Loading ...
                </td>
              </tr>
            </>
          ) : (
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
                            onChange={patchManagementOnChange}
                          />
                        </th>
                        <td className="p-4">
                          <textarea
                            className="w-full h-32"
                            name="content"
                            value={editManagement.content}
                            onChange={patchManagementOnChange}
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
          )}
        </tbody>
      </table>
    </>
  );
};

export default ManagementContainer;
