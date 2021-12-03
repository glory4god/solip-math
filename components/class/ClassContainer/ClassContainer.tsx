import React from 'react';

import Paper from '@material-ui/core/Paper';
import { Management } from 'types/user';
import Button from '@material-ui/core/Button';
import { fetchClassManagements } from 'lib/apis/user';
import { useSelector } from 'react-redux';
import { selectUser } from 'lib/redux/user/userSlice';
import { NEXT_SERVER } from 'config';
import { ClassManagement } from 'types/class';
import { mongoDateFormatting } from 'lib/common';
import ManageMentInput from 'components/ui/ManageMentInput';

interface Props {
  className?: string;
  grade: string;
}

type PostClassManagement = {
  author: string;
  grade: string;
  content: string;
};

const ClassContainer: React.FC<Props> = ({ className, grade }) => {
  const { selectedUser } = useSelector(selectUser);
  const [managementList, setManagementList] =
    React.useState<ClassManagement[]>();

  const [postManagement, setPostManagement] =
    React.useState<PostClassManagement>({
      author: '',
      grade: grade,
      content: '',
    });

  const [editId, setEditId] = React.useState<string>('');
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [editManagement, setEditManagement] =
    React.useState<PostClassManagement>({
      author: '',
      grade: grade,
      content: '',
    });

  const handlePostManagement = async (postData: PostClassManagement) => {
    const res = await fetch(`${NEXT_SERVER}/v1/class/management/post`, {
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
    const res = await fetch(`${NEXT_SERVER}/v1/class/management/${id}/post`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      alert('삭제를 실패했습니다.');
    } else {
      alert('삭제를 성공했습니다.');
    }
    setInitialFetch();
  };

  const patchManagement = async (id: string, postData: PostClassManagement) => {
    const res = await fetch(`${NEXT_SERVER}/v1/class/management/${id}/post`, {
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
    const management = await fetchClassManagements(grade);

    setPostManagement({
      author: '',
      grade: grade,
      content: '',
    });
    setEditManagement({
      author: '',
      grade: grade,
      content: '',
    });
    setManagementList(management);
    setIsLoading(false);
    setIsEditing(false);
    setEditId('');
  };

  React.useEffect(() => {
    setInitialFetch();
  }, [grade]);

  return (
    <Paper className="w-full h-full p-2 max-h-screen overflow-y-scroll">
      <h3 className="text-xl border-b-2 py-2">{grade}</h3>
      <div className="w-full">
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
            <tr>
              {!isEditing && (
                <ManageMentInput
                  author={postManagement.author}
                  content={postManagement.content}
                  onChange={(
                    e: React.ChangeEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >,
                  ) => postManagementOnChange(e)}
                  handlePost={() => handlePostManagement(postManagement)}
                  tag={'추가'}
                />
              )}
            </tr>
          </tbody>
          {isLoading ? (
            <tbody>
              <tr>
                <th className="sm:px-8 px-2">Loading ... </th>
                <td className="px-4">Loading ...</td>
                <td className="sm:px-8 flex py-4 justify-center sm:flex-row flex-col">
                  Loading ...
                </td>
              </tr>
            </tbody>
          ) : (
            <>
              {managementList?.map((management, idx) => {
                return (
                  <tbody key={management._id}>
                    {isEditing && editId === management._id ? (
                      <tr>
                        <ManageMentInput
                          author={editManagement.author}
                          content={editManagement.content}
                          onChange={(
                            e: React.ChangeEvent<
                              HTMLInputElement | HTMLTextAreaElement
                            >,
                          ) => patchManagementOnChange(e)}
                          handlePost={() =>
                            patchManagement(management._id, editManagement)
                          }
                          tag={'수정'}
                        />
                      </tr>
                    ) : (
                      <tr key={idx} className="border-t-2">
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
                        <td className="py-4 h-full">
                          <div className="flex justify-center items-center sm:flex-row flex-col">
                            <Button
                              onClick={() => {
                                setEditId(management._id);
                                setIsEditing(true);
                                setEditManagement({
                                  author: management.author,
                                  content: management.content,
                                  grade: management.grade,
                                });
                              }}>
                              수정
                            </Button>
                            <Button
                              onClick={() => {
                                const result =
                                  confirm('글을 삭제하시겠습니까?');
                                if (result) {
                                  deleteManagement(management._id);
                                }
                              }}>
                              삭제
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                );
              })}
            </>
          )}
        </table>
      </div>
    </Paper>
  );
};

export default ClassContainer;
