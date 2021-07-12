import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

type Props = {
  backgroundColor: string | null;
  onPress: any;
  disabled: boolean;
};

const CellContainer = styled.TouchableOpacity`
  background-color: ${({theme: {palette}}) => palette.secondary};
  width: 50px;
  height: 50px;
  margin: 2px;
  justify-content: center;
  align-items: center;
`;

const StyledCell = styled(View)<{$color: string | null}>`
  background-color: ${({$color}): string | null => ($color ? $color : 'white')};
  height: 40px;
  width: 40px;
  border-radius: 100px;
`;

const Cell = ({backgroundColor, onPress, disabled}: Props) => {
  return (
    <CellContainer disabled={disabled} onPress={onPress}>
      <StyledCell $color={backgroundColor} />
    </CellContainer>
  );
};

export default Cell;
