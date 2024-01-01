import React, { useState, useRef, ChangeEvent, } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const DigitPinCode = () => {
    const [pin, setPin] = useState(["", "", "", ""]);
    const inputRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([...Array(4)].map(() => React.createRef<HTMLInputElement>()));
    console.log(inputRefs)

    const handleChange = (index: number, value: string) => {
        const newPin = [...pin];
        newPin[index] = value;

        if (value && index < 3 && inputRefs.current[index + 1] && inputRefs.current[index + 1].current) {
            inputRefs.current[index + 1].current.focus();
        }

        setPin(newPin);
    };

    const keyboardLayout = {
        default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp}"],
    };

    return (
        <div className="h-screen w-screen absolute z-20 bg-white">
            <div className="flex flex-col items-center gap-[10rem] fixed bottom-0 right-0 left-0">
                <h1>Enter PIN</h1>
                <div className="flex gap-4">
                    {pin.map((value, index) => (
                        <input
                            key={index}
                            className="w-14 h-14 border-black border text-center"
                            type="password"
                            value={value}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            ref={inputRefs.current[index]}
                        />
                    ))}
                </div>
                <Keyboard
                    layout={keyboardLayout}
                    display={{
                        "{bksp}": "⌫",
                    }}
                    onChange={(value) => setPin(value.split("").slice(0, 4))}
                    theme="hg-theme-default hg-layout-default"
                />
            </div>
        </div>
    );
};


export default DigitPinCode;





