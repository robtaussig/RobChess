export interface BugReport {
    email: string;
    description: string;
    createdAt?: string;
    state?: string;
}

export interface BugReportState {
    email: string;
    messageType: string;
    feedback: string;
    isSending: boolean;
    bugReports: BugReport[];
}

export enum ActionTypes {
    SendingStart,
    SendingFinished,
    Edit,
    FetchBugReports,
}

export type SendingStartAction = {
    type: ActionTypes.SendingStart,
};

export type SendingFinishedAction = {
    type: ActionTypes.SendingFinished,
};

export type EditFieldAction = {
    type: ActionTypes.Edit,
    payload: {
        field: string, value: string,
    }
};

export type FetchBugReportsAction = {
    type: ActionTypes.FetchBugReports,
    payload: BugReport[],
}

export type Actions =
    SendingStartAction |
    SendingFinishedAction |
    EditFieldAction |
    FetchBugReportsAction;

export const INITIAL_STATE: BugReportState = {
    email: '',
    messageType: 'Bug',
    feedback: '',
    isSending: null,
    bugReports: [],
};

export const bugReportReducer = (state: BugReportState, action: Actions): BugReportState => {
    switch (action.type) {
        case ActionTypes.SendingStart:
            return {
                ...state,
                isSending: true,
            };
        case ActionTypes.SendingFinished:
            return {
                ...state,
                isSending: false,
                bugReports: state.bugReports.concat({ email: state.email, description: state.feedback }),
            };
        case ActionTypes.Edit:
            return {
                ...state,
                [action.payload.field]: action.payload.value,
            };
        case ActionTypes.FetchBugReports:
            return {
                ...state,
                bugReports: action.payload,
            };
        default:
            return state;
    }
}
