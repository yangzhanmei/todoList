const App = React.createClass({
    getInitialState: function () {
        return {
            todos: []
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
    componentDidMount: function () {
        $.get('/api/1', (elements) => {
            this.setState({elements});
        });
    },
    render: function () {
        return <div>
            <input type="text" placeholder="what do you want to do ?" onKeyPress={this.addTodos}/>
            <Todo todos={this.state.todos}/>
        </div>
    }
});

const Todo = React.createClass({
    render(){
        return <div>
            <ul>
                {this.props.todos.map((todo, index)=> {
                    return <TodoList key={index} index={index} isDone={todo.isDone} item={todo.item}/>
                })}
            </ul>
        </div>
    }
});

const TodoList = React.createClass({
    render(){
        return <div>
            <input type="checkbox" checked={this.props.isDone}/>
            <input type="text" value={this.props.item}/>
        </div>
    }
});

ReactDOM.render(<App/>, document.getElementById('content'));