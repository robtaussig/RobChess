import { ButtonGroup } from './components/ButtonGroups/types';

const ChessButtonGroup: ButtonGroup = {
  name: 'Chess',
  items: [
    {
      name: 'vs. Player',
      link: '/chess',
    },
    {
      name: 'vs AI',
      link: '/ai',
    },
  ],
};

const ChuessButtonGroup: ButtonGroup = {
  name: 'Chuess',
  items: [
    {
      name: 'vs. Player',
      link: '/chuess',
    },
    {
      name: 'vs AI',
      link: '/chuess-ai',
    },
  ],
};

const ChaosButtonGroup: ButtonGroup = {
  name: 'Chaos',
  items: [
    {
      name: 'vs. Player',
      link: '/chaos',
    },
    {
      name: 'vs AI',
      link: '/chaos-ai',
    },
  ],
};

const RaceTheKingsButtonGroup: ButtonGroup = {
  name: 'RaceTheKings',
  items: [
    {
      name: 'vs. Player',
      link: '/race-the-kings',
    },
    {
      name: 'vs AI',
      link: '/race-the-kings-ai',
    },
  ],
};

export const ButtonGroups: ButtonGroup[] = [
  ChessButtonGroup,
  ChuessButtonGroup,
  ChaosButtonGroup,
  RaceTheKingsButtonGroup,
];
