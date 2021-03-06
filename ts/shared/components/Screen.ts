import styled from 'styled-components/native';

const Screen = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  background-color: ${({theme: {palette}}) => palette.backgroundColor};
  align-items: center;
`;

export default Screen;
