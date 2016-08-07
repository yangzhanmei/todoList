const App = React.createClass({
    getInitialState: function () {
        return {
            todos: [],
            allChecked:false
        }
    },
    addTodos: function (event) {
        if (event.key != 'Enter') {
            return;
        }
        let value = event.target.value;
        let todos = this.state.todos;

        if (!value) return false;
        let newTodoItem = {
            item: value,
            isDone: false
        };
        todos.push(newTodoItem);
        event.target.value = '';
        this.setState({todos});
    },
    deleteTodos: function (index) {
        const todos = this.state.todos;
        todos.splice(index, 1);
        this.setState({todos});
    },
    changeStatus: function (index) {
        const todos = this.state.todos;
        todos[index].isDone = !todos[index].isDone;
        this.setState({todos});
    },
    componentDidMount: function () {
        $.get('/api/1', (elements) => {
            this.setState({elements});
        });
    },
    render: function () {
        return <div>
            <input type="text" placeholder="what do you want to do ?" onKeyPress={this.addTodos}/>
            <Todo todos={this.state.todos} deleteTodos={this.deleteTodos} changeStatus={this.changeStatus}/>
        </div>
    }
});

const Todo = React.createClass({
    render(){
        return <div>
            <ul>
                {this.props.todos.map((todo, index)=> {
                    return <TodoList key={index} index={index} isDone={todo.isDone} item={todo.item}
                                     deleteTodos={this.props.deleteTodos} changeStatus={this.props.changeStatus}/>
                })}
            </ul>
        </div>
    }
});

const TodoList = React.createClass({
    changeStatus: function (index) {
        this.props.changeStatus(index);
    },
    deleteTodos: function (index) {
        this.props.deleteTodos(index);
    },
    render(){
        let className = this.props.isDone ? "isDone" : '';
        return <div id="isChecked" className={className}>
            <input type="checkbox" checked={this.props.isDone}
                   onChange={this.changeStatus.bind(this, this.props.index)}/>
            <label>{this.props.item}</label>
            <button onClick={this.deleteTodos.bind(this, this.props.index)}>x</button>
        </div>
    }
});

ReactDOM.render(<App/>, document.getElementById('content'));