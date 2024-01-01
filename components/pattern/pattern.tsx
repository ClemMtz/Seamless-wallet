

import React, { ReactEventHandler } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import RootState from "@/reduxComponents/store";
import { RecordPatternAction, ResetPatternAction } from "@/reduxComponents/pattern-reducer";
import { recordPattern, checkTrue, checkError } from "@/reduxComponents/pattern-action";
import Reset from "./reset";
import PatternComponent from "./pattern-component";

type RootAction = RecordPatternAction | ResetPatternAction;

interface PatternProps extends ConnectedProps<typeof connector> { }

const Pattern: React.FC<PatternProps> = ({ PatternReducer, dispatch }) => {
    const recordPattern: ReactEventHandler = (pattern: any) => {
        return new Promise<void>((resolve, reject) => {
            console.log("I am inside record patt");
            if (pattern.length < 3) {
                reject();
            } else {
                console.log(pattern);
                dispatch(recordPattern(pattern));
                resolve();
            }
        });
    };

    const checkPattern: ReactEventHandler = (pattern: any) => {
        return new Promise<void>((resolve, reject) => {
            if (pattern.join("-") === PatternReducer.selectedPattern.join("-")) {
                dispatch(checkTrue());
                resolve();
            } else {
                dispatch(checkError());
                reject();
            }
        });
    };

    const renderText = () => {
        if (PatternReducer.error) {
            return <div className="error">Patterns don't match</div>;
        } else
            return (
                <div>
                    <h2>Draw the pattern again to confirm it</h2>
                </div>
            );
    };

    if (PatternReducer.selectedPattern.length)
        return (
            <div className="screen1">
                <h2 className="h2">Draw your unlock pattern</h2>
                <PatternComponent onChange={recordPattern} />
            </div>
        );
    return PatternReducer.done ? (
        <div className="screen3">
            <h1>Success</h1>
            <Reset />
        </div>
    ) : (
        <div className="screen2">
            {renderText()}
            <PatternComponent onChange={checkPattern} />
            <Reset />
        </div>
    );
}


const mapStateToProps = (state: typeof RootState) => {
    return { PatternReducer: state.PatternReducer };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    dispatch,
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Pattern);




