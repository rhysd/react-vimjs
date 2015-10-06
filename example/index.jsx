import React from 'react';
import Vim from 'react-vimjs';

React.render(
    <Vim vimjsPath="node_modules/react-vimjs/dist/vim.js" memPath="node_modules/react-vimjs/dist/vim.js.mem">
        <div>Now Loading...</div>
    </Vim>,
    document.querySelector('.main')
);
