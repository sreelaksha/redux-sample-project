import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked = {this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked = {this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked = {this.props.onAddCounter} />
                <CounterControl label="Subtract 15" clicked = {this.props.onSubtractCounter}  />
                <hr/>
                <button onClick = {() => this.props.onStoreResults(this.props.ctr)}> STORE RESULTS </button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                          <li key = {strResult.id} onClick = {() => this.props.onDeleteResults(strResult.id)}> {strResult.val} </li>
                    ))}
                </ul>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ctr : state.control.counter,
        storedResults : state.result.results
    };
}

const mapDispatchToProps = dispatch => {
    return {
            onIncrementCounter: () => dispatch({type : actionTypes.INCREMENT}) ,
            onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
            onAddCounter : () => dispatch({type: actionTypes.ADD, value: 10}),
            onSubtractCounter : () => dispatch({type: actionTypes.SUBTRACT, value: 15}),
            onStoreResults : (solution) => dispatch ({ type: actionTypes.STORE_RESULT, solution: solution }),
            onDeleteResults : (id) => dispatch({ type: actionTypes.DELETE_RESULT, resultElId : id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);