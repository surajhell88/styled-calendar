import styled from 'styled-components';

export default styled.div`
  font-size: 1.2em;
  min-height: 85px;
  padding-top: 5px;
  padding-right: 5px;
  border-left: 1px solid #DDD;
  border-top: 1px solid #DDD;
  &:nth-child(7n-6) {
    background-color: #EEE;
  }
  &:nth-child(7n) {
    border-right: 1px solid #DDD;
  }
  &:nth-last-child(-n+7) {
    border-bottom: 1px solid #DDD;
  }
  color: ${props => props.gray ? '#CCC' : ''}
`;
