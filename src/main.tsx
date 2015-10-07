import * as React from 'react'

interface Props {
    vimjsPath: string;
    memPath: string;
    vimrc?: string;
    children?: React.ReactElement<any>[];
    args?: string[];
    onStart?: () => void;
    defaultFiles: {[path: string]: string};
}

interface State {
}

export default class Vim extends React.Component<Props, State> {
    public static defaultProps = {
        args: ['/usr/local/share/vim/example.js'],
        defaultFiles: {},
    }

    constructor(props: Props) {
        super(props);
    }

    loadVimrc() {
        if (this.props.vimrc && typeof localStorage !== 'undefined' && !localStorage['vimjs/root/.vimrc']) {
            localStorage['vimjs/root/.vimrc'] = this.props.vimrc;
        }
    }

    loadVimJS() {
        if (document.getElementById('vimjs-source')) {
            return;
        }
        let script = document.createElement('script');
        script.setAttribute('src', this.props.vimjsPath);
        script.id = 'vimjs-source'
        document.body.appendChild(script);
    }

    writeDefaultFiles() {
        for (const name in this.props.defaultFiles) {
            const content = this.props.defaultFiles[name];
            const create = (global.Module as {[n: string]: Function})['FS_createDataFile']
            create('/root', name, content, true, true);
        }
    }

    prepareModule() {
        global.Module = {
          noInitialRun: false,
          noExitRuntime: true,
          arguments: this.props.args,
          preRun: [
              () => {
                  this.loadVimrc.bind(this);
                  vimjs.pre_run();
                  this.writeDefaultFiles();
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

