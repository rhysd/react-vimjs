import React from 'react'
import Vim from 'react-vimjs'
import marked from 'marked'

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
        return `autocmd FileType *.md setlocal ft=markdown
function s:executeCallBack()
  if &ft !=# 'markdown'
    return
  endif
  let buf = join(map(getline(1, '$'), 'escape(v:val, "\\\\!''")'), '\\n')
  execute "!ReactVimJSExample.callback('" . buf . "')"
endfunction
autocmd TextChanged,VimEnter * call <SID>executeCallBack()`;
    }

    render() {
        const props = {
            vimjsPath: 'node_modules/react-vimjs/dist/vim.js',
            memPath: 'node_modules/react-vimjs/dist/vim.js.mem',
            vimrc: this.getVimrc(),
            args: ['test.md'],
            defaultFiles: {
                'test.md': 'react-vimjs Markdown Example\n============================\n\nEdit as you **like**!\n'
            }
        };

        return (
            <div className="root">
                <div className="vim">
                    <Vim {...props}>
                        <h1 className="loading"><i className="fa fa-spinner fa-pulse" /> Now Loading...</h1>
                    </Vim>
                </div>
                <div className="preview markdown-body">
                    <span dangerouslySetInnerHTML={{__html: marked(this.state.buffer)}}/>
                </div>
            </div>
        );
    }
}

React.render(
    <VimMarkdown/>,
    document.querySelector('.main')
);
