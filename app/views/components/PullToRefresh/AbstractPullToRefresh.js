'use strict'
import React, { Component } from 'react';
import {
    ListView,
    ScrollView,
    Animated,
    FlatList,
    SectionList,
    SwipeableListView,
    VirtualizedList,
    View,
    StyleSheet,
    Easing
} from 'react-native';

const LIST = 'LIST';
const FOOTER = 'FOOTER';
const HEADER = 'HEADER';
import FooterIndicator from './FooterIndicator';
import HeaderIndicator from './HeaderIndicator';
const AnimatedVirtualizedList = Animated.createAnimatedComponent(VirtualizedList);
class AbstractPullToRefresh extends Component {
    constructor(...props) {
        super(...props);
        this._startPoint;
        this._endPoint;
        this._touched = false;
        this._topReached = true;
        this._endReached = false;
        this._translateY = new Animated.Value(-this.props.headerHeight||0);
        this._translateYValue = 0;
        this._height = 0;
        this._width = 0;
        this._contentHeight = 0;
        this._isScrolling = false;
        this._scrollHandle;
        this._lastMoveTime = 0;
        this.isRefreshing = false;
    }
    componentDidMount() {
    }

    _disableScroll() {
        this.refs[LIST]._scrollRef.setNativeProps({ scrollEnabled: false })
    }
    _enableScroll() {
        this.refs[LIST]._scrollRef.setNativeProps({ scrollEnabled: true })
    }
    _getY() {
        return this.refs[LIST]._scrollMetrics.offset;
    }
    setRefreshing(isRefreshing) {
        this.isRefreshing = isRefreshing;
        if(isRefreshing){
            this._disableScroll();
        }else{
            this._enableScroll();
            this._release();
        }
    }
    _setTranslateY(value){
        if(value>0){
            this._translateYValue = Math.min(this.props.headerHeight,value);
            this._translateY.setValue(this._translateYValue - this.props.headerHeight);
        }else{
            this._translateYValue = Math.max(-this.props.footerHeight,value);
            this._translateY.setValue(this._translateYValue - this.props.headerHeight);
        }
    }
    _release(){
        this._translateYValue = 0;
        Animated.timing(this._translateY,{
            timing:500,
            easing:Easing.ease,
            ...this.props.releaseAnimationConfig,
            toValue:- this.props.headerHeight
            
        }).start();
    }
    _onScroll(e) {
        var { x, y } = e.nativeEvent.contentOffset;
        var { height, width } = e.nativeEvent.layoutMeasurement;
        var contentHeight = e.nativeEvent.contentSize.height;

        this._height = height;
        this._width = width;
        if (y == 0) {
            this._topReached = true;
        }else{
            this._topReached = false;
        }
        if (contentHeight - y - height <= 0) {
            this._endReached = true;
        }else{
            this._endReached = false;
        }
        this.props.onScroll && this.props.onScroll(e);
    }
    _isTopReached() {
        return this._getY() == 0;
    }
    _isEndReached() {
        return this._getY() + this._height >= this._contentHeight;
    }
    _onTouchStart(e) {
        this._touched = true;
        var event = e.nativeEvent;
        this._startPoint = event;
    }
    _onScrollEnd() {
        this._isScrolling = false;
    }
    _onTouchMove(e) {
        var now = Date.now();
        var event = e.nativeEvent;

        var y = this._getY();
        var isTopReached = this._topReached;
        var isEndReached = this._endReached;
        this._endPoint = this._startPoint;
        this._startPoint = event;
        var lastValue = this._translateYValue;
        this._translateYValue += this._startPoint.pageY - this._endPoint.pageY;
        if ((lastValue > 0 && this._translateYValue < 0)) {
            this._translateYValue = 0;
            this.refs[HEADER].onPull(this._translateYValue);
            this._translateY.setValue(this._translateYValue - this.props.headerHeight);
        }
        if (lastValue < 0 && this._translateYValue > 0) {
            this.refs[FOOTER].onPull(this._translateYValue);
            this._translateY.setValue(this._translateYValue - this.props.headerHeight);
        }

        if (isTopReached && this._translateYValue > 0 && this.props.footerHeight) {
            this._setTranslateY(this._translateYValue);
            this._disableScroll();
            this.refs[HEADER].onPull(this._translateYValue);
            return;
        }
        if (isEndReached && this._translateYValue < 0 && this.props.footerHeight) {
            this._setTranslateY(this._translateYValue);
            this._disableScroll();
            this.refs[FOOTER].onPull(this._translateYValue);
            return;
        }
        this._enableScroll();
    }
    _onTouchEnd(e) {
        this._touched = false;
        if (this._endReached && this._translateYValue < 0) {
            this.refs[FOOTER].onRelease(this._translateYValue);
        } else if (this._topReached && this._translateYValue > 0) {
            this.refs[HEADER].onRelease(this._translateYValue);
        }
        if(this.isRefreshing){

        }else{
            this._enableScroll();
            this._release();
        }
        this._lastMoveTime = 0;
    }
    _onLayout(e) {
        var { height, width } = e.nativeEvent.layout;
        if (this._height != height) {
            this._height = height;
            this._width = width;
            this.forceUpdate();
        }
        this.props.onLayout&&this.props.onLayout(e);
    }
    _onListViewLayout(e){
        if(this._isTopReached()){
            this._topReached = true;
        }else{
            this._topReached = false;
        }
        if(this._isEndReached()){
            this._endReached =  true;
        }else{
            this._endReached = false;
        }
        this.props.onListViewLayout&&this.props.onListViewLayout(e);
    }
    _onListViewContentChange(width,height){
         this._contentHeight = height;
         if(this._isTopReached()){
            this._topReached = true;
        }else{
            this._topReached = false;
        }
        if(this._isEndReached()){
            this._endReached =  true;
        }else{
            this._endReached = false;
        }
    }   

    _onMomentumScrollEnd(e) {
    }
    _onScrollEndDrag(e) {
        var event = e.nativeEvent;
        var { x, y } =event.contentOffset;
        var { height, width } = event.layoutMeasurement;
        var contentHeight = event.contentSize.height;
        if (y == 0) {
            this._topReached = true;
        }else{
            this._topReached = false;
        }
        if (contentHeight - y - height <= 0) {
            this._endReached = true;
        }else{
            this._endReached = false;
        }
    }
    render() {
        var style = [this.props.style,styles.wrapper];
        var listViewStyle = [
            {
                height:this._height,
                width:this._width,
                flexDirection:'column'
            }
        ]
        return  <View 
                    onLayout={(e) => this._onLayout(e)}
                    style = {style}>
                    <Animated.View
                        style={[{transform: [{ translateY: this._translateY }] }]}
                        onTouchMove={(e) => this._onTouchMove(e)}
                        onTouchEnd={(e) => this._onTouchEnd(e)}
                        onTouchStart={(e) => this._onTouchStart(e)}
                        >
                        <HeaderIndicator
                            ref={HEADER}
                            onPull={(layout) => this.props.onPull && this.props.onPull(layout)}
                            onRelease={this.props.onPullRelease}
                            children={this.props.headerComponent} />
                        <VirtualizedList
                            ref={LIST}
                            onContentSizeChange = {(width,height)=>this._onListViewContentChange(width,height)}
                            onLayout = {(e)=>this._onListViewLayout(e)}
                            style={listViewStyle}
                            bounces={false}
                            data={this.props.data}
                            getItem={this.props.getItem}
                            getItemCount={this.props.getItemCount}
                            renderItem={this.props.renderItem}
                            keyExtractor={this.props.keyExtractor}
                            scrollEventThrottle={16}
                            onScrollEndDrag={(e) => this._onScrollEndDrag(e)}
                            onViewableItemsChanged={this.props.onViewableItemsChanged}
                            onScroll={(e) => this._onScroll(e)}
                            />
                        <FooterIndicator
                            ref={FOOTER}
                            onPull={(layout) => this.props.onPush && this.props.onPush(layout)}
                            onRelease={this.props.onPushRelease}
                            children={this.props.footerComponent} />
                </Animated.View>
            </View>
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        overflow:'hidden'
    },
    list: {
        flex: 1
    }
})
AbstractPullToRefresh.propTypes = {

}
AbstractPullToRefresh.defaultProps = {
    releaseAnimationConfig:{
        duration:500,
        easing:Easing.ease
    }
}
export default AbstractPullToRefresh;