import Image from 'next/image';
import DevLinks from './dev-links';

const Header = () => {
    return (
        <div className="app-header-container">
            <div className="flex flex-col gap-2.5 items-center">
                <Image src="assets/logo.svg" alt="logo" height={32} width={32} />
                <div className="text-center text-white text-xl font-extrabold font-['Inter'] leading-[30px]">Magic</div>
                <div className="text-center text-white text-opacity-50 text-base font-normal font-['SF Mono'] leading-normal">
                    Demo
                </div>
            </div>
            <DevLinks />
        </div>
    );
};

export default Header;