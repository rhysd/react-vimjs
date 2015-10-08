var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Vim = (function (_super) {
    __extends(Vim, _super);
    function Vim(props) {
        _super.call(this, props);
    }
    Vim.prototype.loadVimrc = function () {
        if (this.props.vimrc && typeof localStorage !== 'undefined' && !localStorage['vimjs/root/.vimrc']) {
            localStorage['vimjs/root/.vimrc'] = this.props.vimrc;
        }
    };
    Vim.prototype.loadVimJS = function () {
        if (document.getElementById('vimjs-source')) {
            return;
        }
        var script = document.createElement('script');
        script.setAttribute('src', this.props.vimjsPath);
        script.id = 'vimjs-source';
        document.body.appendChild(script);
    };
    Vim.prototype.injectSyntax = function () {
        if (this.props.syntax === {}) {
            return;
        }
        var create = global.Module['FS_createDataFile'];
        for (var ft in this.props.syntax) {
            var content = this.props.syntax[ft];
            create('/usr/local/share/vim/syntax', ft + '.vim', content, true, true);
        }
    };
    Vim.prototype.writeDefaultFiles = function () {
        if (this.props.defaultFiles === {}) {
            return;
        }
        var create = global.Module['FS_createDataFile'];
        for (var name_1 in this.props.defaultFiles) {
            var content = this.props.defaultFiles[name_1];
            create('/root', name_1, content, true, true);
        }
    };
    Vim.prototype.prepareModule = function () {
        var _this = this;
        global.Module = {
            noInitialRun: false,
            noExitRuntime: true,
            arguments: this.props.args,
            preRun: [
                function () {
                    _this.loadVimrc.bind(_this);
                    vimjs.pre_run();
                    _this.writeDefaultFiles();
                    _this.injectSyntax();
                    if (_this.props.onStart) {
                        _this.props.onStart();
                    }
                },
            ],
            postRun: [],
            print: function () {
                console.group.apply(console, arguments);
                console.groupEnd();
            },
            printErr: function () {
                console.group.apply(console, arguments);
                console.groupEnd();
            },
        };
        global.__vimjs_memory_initializer = this.props.memPath;
    };
    Vim.prototype.componentDidMount = function () {
        this.prepareModule();
        this.loadVimJS();
    };
    Vim.prototype.render = function () {
        return (React.createElement("div", {"className": 'root'}, React.createElement("div", {"id": 'vimjs-container', "className": 'vimjs-container'}, React.createElement("canvas", {"id": 'vimjs-canvas'}), this.props.children), React.createElement("audio", {"id": 'vimjs-beep', "src": ''}), React.createElement("input", {"id": 'vimjs-file', "className": 'vimjs-invisible', "type": 'file'}), React.createElement("div", {"id": 'vimjs-font-test', "className": 'vimjs-invisible'}), React.createElement("div", {"id": 'vimjs-trigger-dialog', "className": 'modal'}, React.createElement("div", {"className": 'modal-dialog'}, React.createElement("div", {"className": 'modal-content'}, React.createElement("div", {"className": 'modal-header'}, React.createElement("h4", {"className": 'modal-title'}, "Ugly workaround for Chrome")), React.createElement("div", {"className": 'modal-body'}, React.createElement("button", {"id": 'vimjs-trigger-button', "type": 'button', "className": 'btn btn-primary'}, "Click Me")))))));
    };
    Vim.defaultProps = {
        args: ['/usr/local/share/vim/example.js'],
        defaultFiles: {},
        syntax: {},
    };
    return Vim;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Vim;
//# sourceMappingURL=main.js.map