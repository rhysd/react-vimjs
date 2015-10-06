import React from 'react'
import Vim from 'react-vimjs'

React.render(
    <Vim vimjsPath="node_modules/react-vimjs/dist/vim.js" memPath="node_modules/react-vimjs/dist/vim.js.mem">
        <h1 className="loading"><i className="fa fa-spinner fa-pulse" /> Now Loading...</h1>
    </Vim>,
    document.querySelector('.main')
);
