import React from 'react';
import "../../css/layout/layout.css"
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children } : any) => {
    return (
        <>
            <header>
                <Header/>
            </header>

            <div className={"layout-side"}>
                <main>
                    {children}
                </main>
            </div>

            <footer className={"layout-footer"}>
                <Footer />
            </footer>
        </>
    );
};

export default Layout;