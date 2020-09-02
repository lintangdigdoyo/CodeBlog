import React, { useEffect } from 'react';
import styled from 'styled-components';

const EditComment = ({
  className,
  setEditFormComment,
  editFormComment: { text },
  comment,
}) => {
  useEffect(() => {
    setEditFormComment({
      text: comment,
    });
    return () => {
      setEditFormComment({ text: comment });
    };
  }, [setEditFormComment]);

  return (
    <textarea
      className={className}
      name='text'
      cols='30'
      rows='5'
      id='comment'
      placeholder='What do you think about this post...'
      value={text}
      onChange={(e) => setEditFormComment({ text: e.target.value })}
    ></textarea>
  );
};

export default styled(EditComment)`
  width: 100%;
`;
