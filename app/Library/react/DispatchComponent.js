'use strict'
import Dispatcher from './Dispatcher';
import Observer from './Observer';
import {Component} from 'react';

class DispatchComponent extends Component{
    constructor(...props){
        super(...props);
    }
    componentDidMount() {
        Observer.subscribe(this._onData)
    }
    componentWillUnmount() {
        Observer.unsubscribe(this._onData)
    }
    _onData=(data)=>{
        var result = this.onData(data);
        if(!result && data.target==this ){
            this.setState(data.state);
            
        }
    }
    onData(){

    }
    dispatch(action,payload){
        let data = {
            payload:payload,
            target:this
        }
        Dispatcher.dispatch(action,data);
    }
}


export default DispatchComponent;