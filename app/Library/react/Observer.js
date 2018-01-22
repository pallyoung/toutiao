import Observer from './../Observer';
import TargetSet from './TargetSet';
var next = Observer.next;

Observer.next = function (data) {

    let target = TargetSet.get(data.id);

    data.target = target;

    next.call(Observer,data);
}

export default Observer;