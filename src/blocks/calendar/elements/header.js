import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  font-size: 1.7em
`;

export default props => (
  <Header>
    <div>
      <Title>
        <b>{props.month}</b>&nbsp;{props.year}
      </Title>
    </div>
    <div>
      <button onClick={props.goToPrevMonth}>{'<'}</button>
      <button onClick={props.whereIWas}>Today</button>
      <button onClick={props.goToNextMonth}>{'>'}</button>
    </div>
  </Header>
);
