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
    deleteTodos:function (index) {
        const todos=this.state.todos;
        todos.splice(index,1);
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
            <Todo todos={this.state.todos} deleteTodos={this.deleteTodos}/>
        </div>
    }
});

const Todo = React.createClass({
    render(){
        return <div>
            <ul>
                {this.props.todos.map((todo, index)=> {
                    return <TodoList key={index} index={index} isDone={todo.isDone} item={todo.item} deleteTodos={this.props.deleteTodos}/>
                })}
            </ul>
        </div>
    }
});

const TodoList = React.createClass({
    deleteTodos:function (index) {
        this.props.deleteTodos(index);
    },
    render(){
        return <div>
            <input type="checkbox" checked={this.props.isDone}/>
            <input type="text" value={this.props.item}/>
            <button onClick={this.deleteTodos.bind(this,this.props.index)}>x</button>
        </div>
    }
});

ReactDOM.render(<App/>, document.getElementById('content'));