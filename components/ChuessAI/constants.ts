export enum ChangeType {
    Release = 'release',
    BugFix = 'bugfix',
    Improvement = 'improvement',
    Feature = 'feature',
    Styling = 'styling',
}

export interface Change {
    text: string;
    type: ChangeType;
    credit?: string;
    description?: string;
}

export interface Version {
    version: string;
    changes: Change[];
}

export const CHANGELOG: Version[] = [
    {
        version: '1.0.0',
        changes: [
            {
                text: 'Release initial game',
                type: ChangeType.Release,
            },
        ],
    },
    {
        version: '1.1.0',
        changes: [
            {
                text: 'Add changelog',
                type: ChangeType.Feature,
            },
            {
                text: 'Add rules',
                type: ChangeType.Feature,
            },
            {
                text: 'Increase pre-move limit from 3 to 5',
                type: ChangeType.Improvement,
            },
            {
                text: 'Fix styling issues for desktop browsers',
                type: ChangeType.Styling,
            },
            {
                text: 'Fix AI promotion',
                type: ChangeType.BugFix,
            },
            {
                text: 'Fix visual bug caused by scrolling to new moves in move list',
                type: ChangeType.BugFix,
            },
            {
                text: 'Only allow player to unseat AI on player turn',
                type: ChangeType.BugFix,
            },
        ],
    },
];

export interface Rule {
    title: string;
    description?: string;
}

export const RULES: Rule[] = [
    {
        title: 'You cannot see your opponent\'s last move until after your response to it',
    },
    {
        title: 'You can start the game by claiming a color and assigning the AI to the other,'
    },
    {
        title: 'The background will turn turquoise when it is your turn',
        description: 'Otherwise, your opponent/AI is still thinking.'
    },
    {
        title: 'After the first move, all moves must be made as premoves',
        description: 'You can make a premove by dragging from one square to another square. Premoves are not constrained to valid moves only -- instead, they should be thought of as commands to be executed as soon as they are legal. A premove that is not executed one turn will persist until cancelled or executed.'
    },
    {
        title: 'You can queue up to 5 premoves',
        description: 'When you have made your premoves, click on the \'move\' button. The first premove (in the order that they were made) that is valid given the latest (but as of yet unknown) board position will be made. If no premoves are valid, then a random valid move will be made for you.'
    },
    {
        title: 'You can clear premoves by double clicking anywhere on the board',
    },
    {
        title: 'You have a certain number of peeks per game that will reveal the current board state',
        description: 'White will begin with 5, and black will begin with 6 \'peeks\'. You can use a peek by clicking on the \'peek\' button, when it is your turn. Your opponent will not know when you use your peek.',
    },
    {
        title: 'AI uses peeks a bit differntly',
        description: 'As a balancing measure, the AI will use peeks at random, but without any limit. The probability of using a peek is based on the difficulty slider -- furthest to the left means that the AI will never use a peek, and furthers to the right means that the AI will always use a peek.',
    },
];
 