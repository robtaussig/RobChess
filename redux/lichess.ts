import { createSlice, ThunkAction } from '@reduxjs/toolkit';
import { AppState } from './reducers';
import { initChaosChess, makeMove, getRandomValidMove, currentTurn } from './util';
import { getBestMove } from './board';
import { v4 as uuidv4 } from 'uuid';

export interface Streamer {
    name: string;
    link: string;
    description: string;
}

const rand = (max: number): number => {
    return Math.floor(Math.random() * (max + 1));
};

const generateStreamers = (max: number): Streamer[] => {
    return new Array(rand(max) + 1).fill(null).map((_,idx) => {
        return {
            name: `Streamer ${idx}`,
            link: 'link',
            description: `Description ${idx}`,
        };
    });
};

export enum EventType {
    Broadcast,
    Simul,
    Tournament,
}

export interface Event {
    type: EventType;
    title: string;
    time: string;
    participantIds: string[];
    description: string;
}

const randomId = () => uuidv4().slice(0,6);
const randomItemFromPool = <T>(pool: T[]): T => pool[rand(pool.length - 1)];

const generateEvents = (max: number, playerPool: Player[]): Event[] => {
    return new Array(rand(max) + 1).fill(null).map((_,idx) => {
        return {
            type: idx % 2 ?
                EventType.Broadcast :
                idx % 3 ?
                    EventType.Simul :
                    EventType.Tournament,
            title: `Event ${idx}`,
            time: new Date().toISOString(),
            participantIds: new Array(rand(15)).fill(null).map(() => {
                return randomItemFromPool(playerPool).id;
            }),
            description: `Description ${idx}`,
        };
    });
};

const generateHistory = (max: number, playerPool: Player[]): HistoryItem[] => {
    return new Array(rand(max) + 1).fill(null).map((_,idx) => {
        return {
            result: idx % 2 === 0 ? Results.Win : Results.Loss,
            opponentId: randomItemFromPool(playerPool).id,
            time: new Date().toISOString(),
            mode: GameModes.Correspondence,
        };
    });
};

export enum GameModes {
    Classic = 'Classic',
    Rapid = 'Rapid',
    Blitz = 'Blitz',
    Bullet = 'Bullet',
    Correspondence = 'Correspondence',
    Custom = 'Custom',
}

export interface LobbyGame {
    playerId: string;
    rating: number;
    time: string;
    rated: boolean;
    mode: GameModes;
    challengerColor: 'white' | 'black' | 'random';
}

const challengerColors: ('white' | 'black' | 'random')[] = ['white', 'black', 'random'];

const generateLobbyGames = (max: number, playerPool: Player[]): LobbyGame[] => {
    let randomSeed = rand(max);

    return new Array(rand(max) + 1).fill(null).map((_,idx) => {
        const seed = (randomSeed + idx) % playerPool.length;

        const player = playerPool[seed];
        return {
            playerId: player.id,
            rating: player.rating,
            time: idx % 3 ?
                '1 day' :
                idx % 2 ?
                    '10 + 0' :
                    '5 + 3',
            rated: idx % 2 === 0,
            challengerColor: randomItemFromPool(challengerColors),
            mode: idx % 3 ?
                GameModes.Correspondence :
                idx % 2 ?
                    GameModes.Classic :
                    GameModes.Rapid,
        }
    });
};

export interface Game {
    board: string;
    opponentId: string;
    isWhite: boolean;
}

const generateGamesInPlay = (max: number, playerPool: Player[]): Game[] => {
    return new Array(rand(max) + 1).fill(null).map((_,idx) => {
        return {
            board: initChaosChess(5).fen,
            opponentId: randomItemFromPool(playerPool).id,
            isWhite: idx % 2 === 0,
        }
    });
};

export enum Title {
    GM = 'GM',
    NM = 'NM',
    IM = 'IM',
}

export interface Player {
    title: Title;
    id: string;
    name: string;
    rating: number;
}

const Titles = [Title.GM, Title.NM, Title.IM];

const generatePlayers = (max: number): Player[] => {
    return new Array(rand(max) + 1).fill(null).map((_,idx) => {
        return {
            title: randomItemFromPool(Titles),
            id: randomId(),
            name: `Player ${idx}`,
            rating: rand(3000),
        }
    });
};

export interface Leader {
    mode: GameModes;
    playerId: string;
    rating: number;
    positionDiff: number;
}

const generateLeaderboard = (max: number, playerPool: Player[]): Leader[] => {
    return new Array(rand(max) + 1).fill(null).map((_,idx) => {
        const player = randomItemFromPool(playerPool);
        return {
            mode: GameModes.Classic,
            playerId: player.id,
            rating: player.rating,
            positionDiff: 5 - rand(10),
        }
    });
};

export interface TournamentWinner {
    playerId: string;
    tournamentId: string;
}

const generateTournamentWinners = (
    max: number,
    playerPool: Player[],
    tournaments: Tournament[],
): TournamentWinner[] => {
    return new Array(rand(max) + 1).fill(null).map((_,idx) => {
        return {
            playerId: randomItemFromPool(playerPool).id,
            tournamentId: randomItemFromPool(tournaments).id,
        }
    });
};

export interface Tournament {
    id: string;
    title: string;
    duration: number;
    createdAt: string;
    participantIds: string[];
}

const generateTournaments = (max: number): Tournament[] => {
    return new Array(rand(max) + 1).fill(null).map((_,idx) => {
        return {
            id: randomId(),
            title: `Tournament ${idx}`,
            duration: rand(60),
            createdAt: new Date().toISOString(),
            participantIds: [],
        };
    });
};

export interface Update {
    title: string;
    id: string;
    description: string;
    createdAt: string;
}

const generateUpdates = (max: number): Update[] => {
    return new Array(rand(max) + 1).fill(null).map((_,idx) => {
        return {
            title: `Title ${idx}`,
            id: randomId(),
            description: `Description ${idx}`,
            createdAt: new Date().toISOString(),
        };
    });
};

export interface ForumPost {
    id: string;
    parentId: string;
    authorId: string;
    title: string;
    content: string;
    createdAt: string;
}

const generateForumPosts = (max: number, playerPool: Player[]): ForumPost[] => {
    return new Array(rand(max) + 1).fill(null).map((_,idx) => {
        return {
            id: randomId(),
            parentId: null,
            authorId: randomItemFromPool(playerPool).id,
            title: `Title ${idx}`,
            content: `Content ${idx}`,
            createdAt: new Date().toISOString(),
        };
    });
};

export enum Results {
    Win = 'Win',
    Loss = 'Loss',
    Draw = 'Draw',
}
export interface HistoryItem {
    result: Results;
    opponentId: string;
    time: string;
    mode: GameModes;
}

export interface TopGame {
    board: string;
    whitePlayerId: string;
    blackPlayerId: string;
    whiteTime: number;
    blackTime: number;
    lastMove: [number, number];
}

export interface Lichess {
    playerCount: number;
    gameCount: number;
    streamers: Streamer[];
    events: Event[];
    history: HistoryItem[];
    topGame: TopGame;
    puzzle: string;
    lobby: LobbyGame[];
    gamesInPlay: Game[];
    leaderboard: Leader[];
    tournamentWinners: TournamentWinner[];
    players: Player[];
    tournaments: Tournament[];
    updates: Update[];
    forumPosts: ForumPost[];
}

const isBrowser = typeof window !== 'undefined';

const INITIAL_STATE: Lichess = {
    playerCount: 10050,
    gameCount: 1040,
    streamers: [],
    events: [],
    history: [],
    topGame: null,
    puzzle: null,
    lobby: [],
    gamesInPlay: [],
    leaderboard: [],
    tournamentWinners: [],
    tournaments: [],
    players: [],
    updates: [],
    forumPosts: [],
};

const lichessSlice = createSlice({
  name: 'lichess',
  initialState: INITIAL_STATE,
  reducers: {
    reset(state, action) {
      return INITIAL_STATE;
    },
    init() {
        const players = generatePlayers(100);
        const tournaments = generateTournaments(10);
        const topGame = initChaosChess(5);
        
        return {
            playerCount: 10050,
            gameCount: 1040,
            streamers: generateStreamers(5),
            events: generateEvents(5, players),
            history: generateHistory(20, players),
            topGame: isBrowser ?
                {
                    board: topGame.fen,
                    lastMove: topGame.lastMove,
                    whitePlayerId: randomItemFromPool(players).id,
                    blackPlayerId: randomItemFromPool(players).id,
                    whiteTime: 120,
                    blackTime: 120,
                } :
                null,
            puzzle: isBrowser ?
                initChaosChess(5).fen :
                null,
            lobby: generateLobbyGames(30, players),
            gamesInPlay: isBrowser ?
                generateGamesInPlay(6, players) :
                [],
            leaderboard: generateLeaderboard(15, players),
            tournamentWinners: generateTournamentWinners(10, players, tournaments),
            tournaments,
            players,
            updates: generateUpdates(3),
            forumPosts: generateForumPosts(10, players),
        };
    },
    makeMove(state, action) {
        const { fen } = makeMove(
            state.topGame.board,
            action.payload.bestMove[0],
            action.payload.bestMove[1],
            action.payload.bestMove[2],
        );
        const isWhiteTurn = currentTurn(fen) === 'white';
        if (isWhiteTurn) {
            state.topGame.whiteTime -= action.payload.timeTook;
        } else {
            state.topGame.blackTime -= action.payload.timeTook;
        }
        state.topGame.board = fen;
        state.topGame.lastMove = action.payload.bestMove;
    }
  },
  extraReducers: {
    
  },
})

export const { reset, init } = lichessSlice.actions

export const makeBestMove = (): ThunkAction<void, AppState, void, any> =>
    async (dispatch, getState) => {
        const { lichess } = getState();
        const board = lichess.topGame.board;
        const start = +new Date();
        const bestMove = await getBestMove(board);
        const end = +new Date();
        const timeTook = Math.ceil((end - start) / 1000);
        if (bestMove) {
            dispatch(lichessSlice.actions.makeMove({ bestMove, timeTook }));
        }
    };


export const lichessSelector = (state: AppState) => state.lichess

export default lichessSlice.reducer
