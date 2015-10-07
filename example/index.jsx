import React from 'react'
import Vim from 'react-vimjs'

global.ReactVimJSExample = {};

class VimMarkdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {buffer: ''}
    }

    componentDidMount() {
        localStorage['vimjs/root/.vimrc'] = this.getVimrc();

        global.ReactVimJSExample.callback = buf => {
            this.setState({buffer: buf});
        };
    }

    getVimrc() {
        return `function s:executeCallBack()
" TODO: Execute only when filetype is markdown
let buf = join(map(getline(1, '$'), 'escape(v:val, "\\\\!''")'), '\\n')
execute "!ReactVimJSExample.callback('" . buf . "')"
endfunction
autocmd TextChanged * call <SID>executeCallBack()`;
    }

    render() {
        const props = {
            vimjsPath: 'node_modules/react-vimjs/dist/vim.js',
            memPath: 'node_modules/react-vimjs/dist/vim.js.mem',
            vimrc: this.getVimrc()
        };

        return (
            <div className="root">
                <div className="vim">
                    <Vim {...props}>
                        <h1 className="loading"><i className="fa fa-spinner fa-pulse" /> Now Loading...</h1>
                    </Vim>
                </div>
                <div className="preview">
                    {this.state.buffer}
                </div>
            </div>
        );
    }
}

React.render(
    <VimMarkdown/>,
    document.querySelector('.main')
);
