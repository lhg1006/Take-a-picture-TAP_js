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
            <div className={"layout-side"} ref={mainRef}>
                <header>
                    <Header onClickToScrollTop={onClickToScrollTop} />
                </header>

                <main>
                    {children}
                </main>

                <footer className={"layout-footer"}>
                    <Footer onClickToScrollTop={onClickToScrollTop} />
                </footer>
            </div>
        </>
    );
};

export default Layout;