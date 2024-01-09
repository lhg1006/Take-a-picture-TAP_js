import React from 'react';
import "../../css/layout/layout.css"
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children } : any) => {
    return (
        <>
            <div className={"layout-side"}>
                <header className={"layout-header"}>
                    <Header/>
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    );
};

export default Layout;