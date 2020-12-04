import { GameModes } from "../../../../redux/lichess";

export const QuickPairingOptions = [
    {
        time: '1 + 0',
        mode: GameModes.Bullet,
    },
    {
        time: '2 + 1',
        mode: GameModes.Bullet,
    },
    {
        time: '3 + 0',
        mode: GameModes.Blitz,
    },
    {
        time: '3 + 2',
        mode: GameModes.Blitz,
    },
    {
        time: '5 + 0',
        mode: GameModes.Blitz,
    },
    {
        time: '5 + 3',
        mode: GameModes.Blitz,
    },
    {
        time: '10 + 0',
        mode: GameModes.Rapid,
    },
    {
        time: '10 + 5',
        mode: GameModes.Rapid,
    },
    {
        time: '15 + 10',
        mode: GameModes.Rapid,
    },
    {
        time: '30 + 0',
        mode: GameModes.Classic,
    },
    {
        time: '30 + 20',
        mode: GameModes.Classic,
    },
    {
        time: null,
        mode: GameModes.Custom,
    },
];
