const App = React.createClass({
    getInitialState: function () {
        return {
            todos: [],
            allChecked: false
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
    showItems: function (value) {
        const todos = this.state.todos;
        const todosIsActive = todos.filter(todo=>todo.isDone === false);
        const todosIsDone = todos.filter(todo=>todo.isDone === true);
        if (value == 'active') {
            this.setState({todos: todosIsActive});
        } else if (value == 'complete') {
            this.setState({todos: todosIsDone});
        } else {
            this.setState({todos});
        }
    },
    clearComplete: function () {
        const todos = this.state.todos;
        const todosIsActive = todos.filter(todo=>todo.isDone === false);
        this.setState({todos: todosIsActive});
    },
    render: function () {
        return <div>
            <input type="text" placeholder="what do you want to do ?" onKeyPress={this.addTodos}/>
            <Todo todos={this.state.todos} deleteTodos={this.deleteTodos} changeStatus={this.changeStatus}/>
            <Footer todos={this.state.todos} showItems={this.showItems} clearComplete={this.clearComplete}/>
        </div>
    }
});

const Todo = React.createClass({
    render(){
        return <div>
            <ul>
                {this.props.todos.map((todo, index)=> {
                    return <TodoList key={index} index={index} isDone={todo.isDone} item={todo.item}
                                     deleteTodos={this.props.deleteTodos} changeStatus={this.props.changeStatus}
                                     showItems={this.props.showItems}/>
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

const Footer = React.createClass({
    showItems: function (value) {
        this.props.showItems(value);
    },
    clearComplete: function () {
        this.props.clearComplete();
    },
    render(){
        const todos = this.props.todos;
        const todosIsActive = todos.filter(todo=>todo.isDone === false);
        const count = todosIsActive.length;
        return <div>
            <div>
                <span>{count} item left</span>
                <button onClick={this.showItems.bind(this, 'all')}>All</button>
                <button onClick={this.showItems.bind(this, 'active')}>Active</button>
                <button onClick={this.showItems.bind(this, 'complete')}>Completed</button>
                <button onClick={this.clearComplete}>Clear completed</button>
            </div>
        </div>
    }
});

ReactDOM.render(<App/>, document.getElementById('content'));