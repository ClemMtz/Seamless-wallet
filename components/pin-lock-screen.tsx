
import { useState } from 'react';

const PinLockScreen = () => {
    const [currentPin, setCurrentPin] = useState<string>('');
    const [newPin, setNewPin] = useState<string>('');
    const [confirmNewPin, setConfirmNewPin] = useState<string>('');
    const [resetPin, setResetPin] = useState<string>('');
    const [isPinSet, setIsPinSet] = useState<boolean>(false);

    const handleSetPin = () => {
        if (newPin === confirmNewPin) {
            setIsPinSet(true);
            setCurrentPin(newPin);
            console.log('PIN set successfully:', newPin);
        } else {
            console.error('PIN confirmation does not match. Please try again.');
        }
    };

    const handleResetPin = () => {
        if (resetPin === currentPin) {
            setIsPinSet(false);
            setCurrentPin('');
            console.log('PIN reset successful.');
        } else {
            console.error('Incorrect PIN. Unable to reset.');
        }
    };

    return (
        <div>
            {!isPinSet ? (
                <div>
                    <label>Create New PIN:</label>
                    <input type="password" value={newPin} onChange={(e) => setNewPin(e.target.value)} />
                    <label>Confirm New PIN:</label>
                    <input type="password" value={confirmNewPin} onChange={(e) => setConfirmNewPin(e.target.value)} />
                    <button onClick={handleSetPin}>Set PIN</button>
                </div>
            ) : (
                <div>
                    <label>Enter Current PIN:</label>
                    <input type="password" value={resetPin} onChange={(e) => setResetPin(e.target.value)} />
                    <button onClick={handleResetPin}>Reset PIN</button>
                </div>
            )}
        </div>
    );
};

export default PinLockScreen;
