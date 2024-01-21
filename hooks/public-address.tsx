import { useState } from "react";



export const UsePublicAddress = () => {
    const [publicAddress, setPublicAddress] = useState(localStorage.getItem('user'));
    return publicAddress


};






