import React, { Component } from 'react';
import axios from'axios';

import PageHader from '../template/pageHeader';
import TodoForm from '../todo/todoForm';
import TodoList from '../todo/todoList';

const URL = 'http://localhost:3006/api/todos';

export default class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = { description: '', list: [] }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handlePending = this.handlePending.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.refresh();
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : '';
        axios.get(`${URL}?=sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value })
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.refresh())
    }

    handleRemove(todo){
        console.log("Item será removido!")
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description));
    }

    handleDone(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
            .then(resp => this.refresh(this.state.description));
    }

    handlePending(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
            .then(resp => this.refresh(this.state.description));
    }

    handleClear(){
        this.refresh();
    }

    render() {
        return (
            <div>
                <PageHader name="Tarefas" small="Cadastro" />
                <TodoForm
                    // description={this.state.description}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}>
                </TodoForm>
                <TodoList 
                    // list={this.state.list} 
                    handleDone={this.handleDone}
                    handlePending={this.handlePending}
                    handleRemove={this.handleRemove}></TodoList>
            </div>
        )
    }
}