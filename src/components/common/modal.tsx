import React from 'react';
import "../../css/modal/modal.css"

export const Modal = (props:any) => {
  const { open, close, header } = props;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header style={{marginTop: '70px'}}>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main style={{ maxHeight: '80vh', overflowY: 'auto'}}>
            {props.children}
          </main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
