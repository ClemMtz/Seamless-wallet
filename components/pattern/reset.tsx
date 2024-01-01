
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { reset } from "@/reduxComponents/pattern-action";

interface ResetProps extends ConnectedProps<typeof connector> { }

const Reset: React.FC<ResetProps> = ({ dispatch }) => {
    const handleReset = () => {
        dispatch(reset());
    };

    return (
        <div className="reset">
            <h2>
                Click{" "}
                <span style={{ color: "lightblue", cursor: "pointer" }} onClick={handleReset}>
                    here
                </span>{" "}
                to reset.
            </h2>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });

const connector = connect(null, mapDispatchToProps);

export default connector(Reset);