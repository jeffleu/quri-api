import React from 'react';

const List = (props) => {
  return (
    <div className="list">
      <ul className="upcs">
        { props.upcs.map((upc, i) => <li key={i}>{upc}</li>) }
      </ul>
    </div>
  );
};

export default List;
