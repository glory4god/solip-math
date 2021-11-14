import React from 'react';

import Button from '@material-ui/core/Button';

interface ManageMentInputProps {
  author: string;
  content: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handlePost: () => void;
  tag: string;
}

const ManageMentInput: React.FC<ManageMentInputProps> = ({
  author,
  content,
  onChange,
  handlePost,
  tag,
}) => {
  return (
    <>
      <th className="sm:px-8 px-2">
        <input
          className="w-full h-8"
          type="text"
          name="author"
          value={author}
          onChange={onChange}
        />
      </th>
      <td className="px-4">
        <textarea
          className="w-full h-32 p-4"
          name="content"
          value={content}
          onChange={onChange}
        />
      </td>
      <td className="sm:px-8">
        <Button
          onClick={() => {
            if (author === '') {
              alert('작성자를 입력하세요');
            } else if (content === '') {
              alert('내용을 입력하세요');
            } else {
              handlePost();
            }
          }}>
          {tag}
        </Button>
      </td>
    </>
  );
};

export default ManageMentInput;
