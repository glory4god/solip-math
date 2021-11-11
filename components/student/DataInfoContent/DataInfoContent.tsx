import React from 'react';

interface Props {
  className?: string;
  idx: number;
  title: string;
  number: string;
  count: number;
}

const DataInfoContent: React.FC<Props> = ({
  className,
  idx,
  title,
  number,
  count,
}) => {
  return (
    <div className="flex justify-between h-16 items-center">
      <div>
        <span className="pr-4">{idx + 1}. </span>
        <span>{title} </span>
        <span>
          <b>{number}</b>
        </span>
      </div>
      <div>
        <span>
          <b className="text-xl">{count} </b>회
        </span>
      </div>
    </div>
  );
};

export default DataInfoContent;
