import React, { Component } from 'react';
import { connection, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../template/button';
import { done, pending, remove } from './todoActions';

// class TodoList extends Component {
//     constructor(props) {
//         super(props);
//         this.renderRows = this.renderRows.bind(this);
//     }

//     render() {
//         return (
//             <div className="p-3 mt-5">
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>Descrição</th>
//                             <th className="tableActions">Ações</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.renderRows()}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }

//     renderRows() {
//         const list = props.list || [];
//         const { done, undo } = this.props;
//         return list.map(todo => (
//             <tr key={todo._id}>
//                 <td className={todo.done ? 'todo-done' : ''}> {todo.description} </td>
//                 <td>
//                     <Button style="success" icon="check" onClick={() => done(todo)} hide={todo.done}></Button>
//                     <Button style="warning" icon="undo" onClick={() => undo(todo)} hide={!todo.done}></Button>
//                     <Button style="danger" icon="trash-o" onClick={() => props.handleRemove(todo)} hide={!todo.done}></Button>
//                     {/* <Button style="success" icon="check" onClick={() => props.handleDone(todo)} hide={todo.done}></Button>
//                     <Button style="warning" icon="undo" onClick={() => props.handlePending(todo)} hide={!todo.done}></Button>
//                     <Button style="danger" icon="trash-o" onClick={() => props.handleRemove(todo)} hide={!todo.done}></Button> */}
//                 </td>
//             </tr>
//         ))
//     }

// }

const TodoList = props => {

    const renderRows = () => {

        const list = props.list || [];
        // const { done, undo } = this.props;
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'todo-done' : ''}> {todo.description} </td>
                <td>
                    <Button style="success" icon="check" onClick={() => props.done(todo)} hide={todo.done}></Button>
                    <Button style="warning" icon="undo" onClick={() => props.pending(todo)} hide={!todo.done}></Button>
                    <Button style="danger" icon="trash-o" onClick={() => props.remove(todo)} hide={!todo.done}></Button>
                </td>
            </tr>
        ))
    }

    return (
        <div className="p-3 mt-5">
            <table className="table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th className="tableActions">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}

// mapear todo list
const mapStateToProps = state => ({ list: state.todo.list })

// fazer ligação entre quem despara a ação
const mapDispatchToProp = dispatch => bindActionCreators({ done, pending, remove }, dispatch)

// exportação metodo decorator
export default connect(mapStateToProps, mapDispatchToProp)(TodoList)