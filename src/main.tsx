import * as React from 'react'

interface Props {
    vimjsPath: string;
    memPath: string;
    children?: React.ReactElement<any>[];
}

interface State {
}

export default class Vim extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        global.Module = {
          noInitialRun: false,
          noExitRuntime: true,
          arguments: ['/usr/local/share/vim/example.js'],
          preRun: [ function() { vimjs.pre_run(); } ],
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

        if (!document.getElementById('vimjs-source')) {
            let script = document.createElement('script');
            script.setAttribute('src', this.props.vimjsPath);
            script.id = "vimjs-source";
            document.body.appendChild(script);
        }
    }

    render() {
        return (
            <div className="root">
                <div id="vimjs-container" className="vimjs-container">
                    <canvas id="vimjs-canvas"></canvas>
                    {this.props.children}
                </div>
                <audio id="vimjs-beep" src=""></audio>
                <input id="vimjs-file" className="vimjs-invisible" type="file"/>
                <div id="vimjs-font-test" className="vimjs-invisible"></div>
                <div id="vimjs-trigger-dialog" className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Ugly workaround for Chrome</h4>
                            </div>
                            <div className="modal-body">
                                <button id="vimjs-trigger-button" type="button" className="btn btn-primary">Click Me</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

