import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components/native';
import {useTranslation} from 'react-i18next';

import Cell from './Cell';
import {Screen, Typography} from '../../../shared/components';
import {COLS, ROWS, P1, P2, P1_COLOR, P2_COLOR, P1_SUCCESS_MESSAGE, P2_SUCCESS_MESSAGE, DROW_MESSAGE} from '../../../constants/contants';
import {checkGameStatus} from '../utils/utils';
import {BoardType} from '../../../types/types';

const Title = styled(Typography)`
  font-weight: bold;
  font-size: 36px;
  margin: 8px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: ${(props) => (props.disabled ? '#ccc' : ({theme: {palette}}) => palette.primary)};
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 120px;
  padding: 8px;
  margin: 8px;
  border-radius: 4px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const BoardContainer = styled.View`
  align-items: center;
  margin-top: 12px;
  margin-bottom: 4px;
`;

const Message = styled(Typography)`
  text-align: center;
`;

const HomeScreen = () => {
  const [message, setMessage] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(P1);
  const [board, setBoard] = useState<BoardType>();
  const {t} = useTranslation('homeScreen');

  const initBoard = useCallback(() => {
    let initialBoard = [];
    for (let i = 0; i < ROWS; i++) {
      initialBoard.push(new Array(COLS).fill(''));
    }
    setBoard(initialBoard);
    setCurrentPlayer(P1);
    setIsGameOver(false);
    setMessage('');
  }, []);

  const onStartGame = useCallback(() => {
    initBoard();
  }, [initBoard]);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  const onCellClicked = useCallback(
    (selectedColumn: number) => {
      for (let i = ROWS - 1; i >= 0; i--) {
        if (board && !board[i][selectedColumn]) {
          board[i][selectedColumn] = currentPlayer === P1 ? P1_COLOR : P2_COLOR;
          break;
        }
      }

      const gameStatus = checkGameStatus(board);

      switch (gameStatus) {
        case P1_COLOR: {
          setIsGameOver(true);
          setMessage(P1_SUCCESS_MESSAGE);
          setBoard(board);
          break;
        }
        case P2_COLOR: {
          setIsGameOver(true);
          setMessage(P2_SUCCESS_MESSAGE);
          setBoard(board);
          break;
        }
        case 'drow': {
          setIsGameOver(true);
          setMessage(DROW_MESSAGE);
          setBoard(board);
          break;
        }
        default: {
          setBoard(board);
          setCurrentPlayer((currPlayer) => (currPlayer === P1 ? P2 : P1));
        }
      }
    },
    [board, currentPlayer],
  );

  return (
    <Screen>
      <Title>{t('connect4')}</Title>
      <StyledButton onPress={onStartGame}>
        <Typography>{t('newGame')}</Typography>
      </StyledButton>
      {board && (
        <BoardContainer>
          {board.map((_, i) => (
            <RowContainer key={i}>
              {board[i].map((__, j) => (
                <Cell key={`${i}${j}`} disabled={isGameOver} onPress={() => onCellClicked(j)} backgroundColor={board[i][j]} />
              ))}
            </RowContainer>
          ))}
        </BoardContainer>
      )}
      <Message>{message}</Message>
    </Screen>
  );
};

export default HomeScreen;
