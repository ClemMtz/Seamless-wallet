

import React from "react";
import PatternLock from "react-17-pattern-lock";

const PatternComponent = (props: any) => {
    return (
        <div className="pattern">
            <PatternLock
                width={300}
                pointSize={10}
                onChange={props.onChange}
                path={[0]}
                onFinish={(path: void) => props.onChange(path)}
            />
        </div>
    );
};

export default PatternComponent;