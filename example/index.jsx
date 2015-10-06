import React from 'react'
import Vim from 'react-vimjs'

const props = {
    vimjsPath: 'node_modules/react-vimjs/dist/vim.js',
    memPath: 'node_modules/react-vimjs/dist/vim.js.mem'
};

React.render(
    <Vim {...props}>
        <h1 className="loading"><i className="fa fa-spinner fa-pulse" /> Now Loading...</h1>
    </Vim>,
    document.querySelector('.main')
);
