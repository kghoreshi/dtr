import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ChoiceInput.css';
import '../../ComponentStyles.css';

import {getListOfChoices} from '../../../util/util.js';


export default class ChoiceInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            choices:[]
        };

        this.setChoice = this.setChoice.bind(this);
    }

    componentDidMount() {
        // setup
        const value = this.props.retrieveCallback(this.props.item.linkId);
        if(value) {
            this.setState({value: value});
        }

        const returnAnswer = getListOfChoices(this.props, this.setChoice);
        if(returnAnswer) {
            this.setValue(returnAnswer);
        }

    }


    setChoice(pair) {
        this.setState(previousState => ({
            choices: [...previousState.choices, pair]
        }));
    }
    setValue(value) {
        if(this.state.value === value) {
            value = null;
        }
        this.setState({value});
        this.props.updateCallback(this.props.item.linkId, value)
    }

    render() {
        return (
            <div className="text-input">
                <p className="header-input">{this.props.item.text}</p>
                <div>
                    {this.state.choices.map((element)=>{
                        return (
                            <div key={element.display}>
                                <button 
                                    className={"radio-button btn "+(element.code===this.state.value?"selected":null)}
                                    onClick={()=>{
                                        this.setValue(element.code)
                                    }}
                                >
                                    
                                </button>
                                <span className="text-radio">{element.display}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
