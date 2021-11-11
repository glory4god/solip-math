import React from 'react';

import Paper from '@material-ui/core/Paper';
import { DataInfoContent } from '..';

interface Props {
  className?: string;
  title: string;
}

const DataInfoBox: React.FC<Props> = ({ className, title }) => {
  return (
    <Paper className="border-2 border-purple-100 rounded-md w-full h-96 p-4">
      <h2 className="text-lg border-b-2 pb-4">{title}</h2>
      {['123', '22', '152', '333', '451'].map((list, idx) => {
        return (
          <DataInfoContent
            key={idx}
            idx={idx}
            title={'마플'}
            number={list}
            count={3}
          />
        );
      })}
    </Paper>
  );
};

export default DataInfoBox;
