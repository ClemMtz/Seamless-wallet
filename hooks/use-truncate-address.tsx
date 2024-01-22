export const UseTruncateAddress = () => {
    const truncateAddress = (address: string | undefined) => {
        if (!address) {
            return "";
        }
        const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-6)}`;
        return truncatedAddress;
    };

    return truncateAddress;
}