import * as React from 'react'

export interface Props {
    vimjsPath: string;
    memPath: string;
    vimrc?: string;
    children?: React.ReactElement<any>[];
    args?: string[];
    onStart?: () => void;
    defaultFiles?: {[path: string]: string};
    syntax?: {[ft: string]: string};
}

export default class Vim extends React.Component<Props, {}> {
    public static defaultProps = {
        args: ['/usr/local/share/vim/example.js'],
        defaultFiles: {},
        syntax: {},
    }

    constructor(props: Props) {
        super(props);
    }

    private loadVimrc() {
        if (this.props.vimrc && typeof localStorage !== 'undefined' && !localStorage['vimjs/root/.vimrc']) {
            localStorage['vimjs/root/.vimrc'] = this.props.vimrc;
        }
    }

    private loadVimJS() {
        if (document.getElementById('vimjs-source')) {
            return;
        }
        let script = document.createElement('script');
        script.setAttribute('src', this.props.vimjsPath);
        script.id = 'vimjs-source'
        document.body.appendChild(script);
    }

    private injectSyntax() {
        if (this.props.syntax === {}) {
            return;
        }

        const create = (global.Module as {[n: string]: Function})['FS_createDataFile'];

        for (const ft in this.props.syntax) {
            const content = this.props.syntax[ft];
            create('/usr/local/share/vim/syntax', ft + '.vim', content, true, true);
        }
    }

    private writeDefaultFiles() {
        if (this.props.defaultFiles === {}) {
            return;
        }

        const create = (global.Module as {[n: string]: Function})['FS_createDataFile'];

        for (const name in this.props.defaultFiles) {
            const content = this.props.defaultFiles[name];
            create('/root', name, content, true, true);
        }
    }

    private prepareModule() {
        global.Module = {
          noInitialRun: false,
          noExitRuntime: true,
          arguments: this.props.args,
          preRun: [
              () => {
                  this.loadVimrc.bind(this);
                  vimjs.pre_run();
                  this.writeDefaultFiles();
                  this.injectSyntax();
                  if (this.props.onStart) {
                      this.props.onStart();
                  }
              },
          ],
          postRun: [],
          print: function() {
              console.group.apply(console, arguments);
              console.groupEnd();
          },
          printErr: function() {
              console.group.apply(console, arguments);
              console.groupEnd();
          },
        };
        global.__vimjs_memory_initializer = this.props.memPath;
    }

    componentDidMount() {
        this.prepareModule();
        this.loadVimJS();
    }

    render() {
        return (
            <div className='root'>
                <div id='vimjs-container' className='vimjs-container'>
                    <canvas id='vimjs-canvas'></canvas>
                    {this.props.children}
                </div>
                <audio id='vimjs-beep' src=''></audio>
                <input id='vimjs-file' className='vimjs-invisible' type='file'/>
                <div id='vimjs-font-test' className='vimjs-invisible'></div>
                <div id='vimjs-trigger-dialog' className='modal'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h4 className='modal-title'>Ugly workaround for Chrome</h4>
                            </div>
                            <div className='modal-body'>
                                <button id='vimjs-trigger-button' type='button' className='btn btn-primary'>Click Me</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

