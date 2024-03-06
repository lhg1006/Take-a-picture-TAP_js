import React, {useRef} from 'react';
import "../../css/layout/layout.css"
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children } : any) => {
    const mainRef = useRef<HTMLDivElement | null>(null);

    const onClickToScrollTop = () => {
        if (mainRef.current) {
            mainRef.current.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    return (
        <>
            <header>
                <Header onClickToScrollTop={onClickToScrollTop} />
            </header>
            <div className={"layout-side"} ref={mainRef}>
                <main>
                    {children}
                </main>
            </div>
            <footer className={"layout-footer"}>
                <Footer onClickToScrollTop={onClickToScrollTop} />
            </footer>
        </>
    );
};

export default Layout;