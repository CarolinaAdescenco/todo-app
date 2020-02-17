import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Grid from '../template/grid';
import Button from '../template/button';
import { add, changeDescription, search } from './todoActions';


class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.keyHandler = this.keyHandler.bind(this);
    }

    componentWillMount(){
        this.props.search()
    }

    keyHandler(e) {

        const { add, search, description } = this.props;

        if (e.key === 'Enter') {
            e.shiftKey ? search() : add(description);
        } else if (e.key === 'Escape') {
            props.handleClear()
        }
    }

    render() {
        const { add, search, description } = this.props;
        return (
            <div role="form" className="todoForm p-3">
                <h1>Nova tarefa</h1>
                <div className="row mx-0 no-gutters justify-content-between">

                    <Grid cols="12 9 9">
                        <input id="description" className="form-control"
                            placeholder="Adicione uma tarefa"
                            onChange={this.props.changeDescription}
                            onKeyUp={this.keyHandler}
                            value={this.props.description}
                        />
                        <input type="radio" name="color" value="red"/>
                        <input type="radio" name="color" value="blue"/>
                    </Grid>

                    <Grid cols="12 3 2">
                        <Button style="primary" icon="plus" onClick={() => add(description)}></Button>
                        <Button style="info" icon="search" onClick={() => search()}></Button>
                        <Button style="secondary" icon="close" onClick={this.props.handleClear}></Button>
                    </Grid>

                </div>
            </div>
        )
    }
}

//mapeia os estados da função
const mapStateToProps = state => ({ description: state.todo.description })

//faz a ligação entre quem dispara a ação
const mapDispatchToProps = dispatch => bindActionCreators({ add, changeDescription, search }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);



