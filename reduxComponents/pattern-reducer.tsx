export interface PatternState {
    loading: boolean;
    done: boolean;
    error: boolean;
    selectedPattern: number[];
}


export interface RecordPatternAction {
    type: "RECORD_PATTERN";
    patternValue: any;
}

export interface ResetPatternAction {
    type: "RESET_PATTERN";
}

export interface CheckPatternTrueAction {
    type: "CHECK_PATTERN_TRUE";
}

export interface CheckErrorAction {
    type: "CHECK_ERROR";
}

export type PatternActionTypes =
    | RecordPatternAction
    | ResetPatternAction
    | CheckPatternTrueAction
    | CheckErrorAction;

export const PatternReducer = (
    state: PatternState = {
        loading: false,
        done: false,
        error: false,
        selectedPattern: [],
    },
    action: PatternActionTypes
): PatternState => {
    switch (action.type) {
        case "RECORD_PATTERN":
            return {
                ...state,
                selectedPattern: action.patternValue,
            };
        case "RESET_PATTERN":
            return {
                loading: false,
                done: false,
                error: false,
                selectedPattern: [],
            };
        case "CHECK_PATTERN_TRUE":
            return {
                ...state,
                done: true,
            };
        case "CHECK_ERROR":
            return {
                ...state,
                error: true,
            };
        default:
            return state;
    }
};
