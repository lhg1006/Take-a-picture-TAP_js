import React, {useRef} from 'react';
import "../../css/layout/layout.css"
import Header from "./header";
import Footer from "./footer";

const Layout = ({children}: any) => {
    return (
        <>
            <main>
                <header className={"layout-header"}>
                    <Header/>
                </header>
                <div>
                    {children}
                </div>
                <footer className={"layout-footer"}>
                    <Footer/>
                </footer>
            </main>
        </>
    );
};

export default Layout;