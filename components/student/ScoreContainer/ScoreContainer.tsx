import Button from '@material-ui/core/Button';
import { NEXT_SERVER } from 'config';
import { fetchScoreManagements } from 'lib/apis/user';
import { stringToHTMLFormatting } from 'lib/common';
import { openWriteModal, selectModal } from 'lib/redux/modal/modalSlice';
import { selectUser } from 'lib/redux/user/userSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScoreManagement } from 'types/user';

interface Props {}

const ScoreContainer: React.FC<Props> = ({}) => {
  const { selectedUserId, selectedUser } = useSelector(selectUser);
  const { showScoreWriteModal } = useSelector(selectModal);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [scores, setScores] = React.useState<ScoreManagement[]>([]);

  const dispatch = useDispatch();

  const deleteHandler = async (id: string) => {
    const res = await fetch(`${NEXT_SERVER}/v1/management/score/${id}/post`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      alert('삭제를 실패했습니다.');
    } else {
      alert('삭제를 성공했습니다.');
    }
    setInitialFetch();
  };

  const setInitialFetch = React.useCallback(async () => {
    setIsLoading(true);
    const scores = await fetchScoreManagements(selectedUserId);
    setScores(scores);
    setIsLoading(false);
  }, [selectedUserId]);

  React.useEffect(() => {
    if (showScoreWriteModal === false) {
      setInitialFetch();
    }
  }, [selectedUser, setInitialFetch, showScoreWriteModal]);

  return (
    <>
      <div className="my-2">성적관리</div>
      <div className="flex justify-end">
        <Button onClick={() => dispatch(openWriteModal('score'))}>
          성적추가
        </Button>
      </div>
      <table className="w-full">
        <colgroup>
          <col className="w-2/12" />
          <col className="w-3/12" />
          <col className="w-1/12" />
          <col className="w-6/12" />
        </colgroup>
        <thead className="h-12">
          <tr>
            <th>시험일시</th>
            <th>시험이름</th>
            <th>점수</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <>
              <tr>
                <th className="sm:px-8 px-2">Loading</th>
                <td className="px-4">Loading</td>
                <td className="px-4">Loading</td>
                <td className="sm:px-8 flex justify-center sm:flex-row flex-col">
                  Loading
                </td>
              </tr>
            </>
          ) : (
            <>
              {scores.map((score, idx) => {
                return (
                  <tr className="h-12" key={score._id}>
                    <th>
                      {score.date}
                      <br />
                      <a
                        onClick={() => {
                          const result = confirm('삭제하시겠습니까?');
                          if (result) {
                            deleteHandler(score._id);
                          }
                        }}>
                        삭제
                      </a>
                    </th>
                    <td>{score.testName}</td>
                    <td>
                      <b>{score.score}</b>
                    </td>
                    <td
                      dangerouslySetInnerHTML={stringToHTMLFormatting(
                        score.comment,
                      )}
                    />
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

export default ScoreContainer;
