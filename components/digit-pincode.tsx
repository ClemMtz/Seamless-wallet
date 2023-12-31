import React, { useState } from "react";
import PinInput from "react-pin-input";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const DigitPinCode = () => {
    const [pin, setPin] = useState("");

    const generatePin = () => {
        let randomPin = Math.floor(Math.random() * 10000).toString();
        randomPin = randomPin.padStart(4, "0");
        setPin(randomPin);
    };

    const handleChange = (value: any) => {
        setPin(value);
    };

    const handleComplete = (value: any) => {
        console.log("PIN entered:", value);
    };

    const handleKeyboardPress = (button: any) => {
        // Only allow digits to be appended to the PIN
        if (/\d/.test(button)) {
            setPin((prevPin) => prevPin + button);
        }
    };



    const keyboardLayout = {
        default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp}"],
    };

    return (
        <div className="h-screen w-screen absolute z-20 bg-white">
            <div className=" flex flex-col items-center gap-[10rem] fixed bottom-0 right-0 left-0">

                <h1>Enter PIN</h1>

                <PinInput
                    length={4}
                    initialValue={""}
                    onChange={handleChange}
                    onComplete={handleComplete}
                    type="numeric"
                    inputMode="number"
                    inputStyle={{ borderColor: "black" }}
                    inputFocusStyle={{ borderColor: "blue" }}
                />

                <Keyboard
                    layout={keyboardLayout}
                    display={{
                        "{bksp}": "⌫",
                    }}
                    onChange={handleKeyboardPress}
                    theme="hg-theme-default hg-layout-default"
                />

            </div>
        </div>
    );
};

export default DigitPinCode;


