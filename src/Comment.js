import React, {Component} from 'react'
import {FaTimes} from 'react-icons/fa'

export class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.submitComment = this.submitComment.bind(this)
    }

    submitComment(e) {
        e.preventDefault()
        this.props.onNewComment(this._newText.value)
        this._newText.value = ''
    }

    render() {
        return (
            <form className="add-comment" onSubmit={this.submitComment}>
                <div className='add-comment-control'>
                    <input type="text" placeholder='Add Comment' ref={input => this._newText = input} />
                </div>
                <button className='submit' type="submit">Add</button>
            </form>
        )
    }
}

export class Comment extends Component {
    constructor(props) {
        super(props)
        this.remove = this.remove.bind(this)
    }

    remove(){
        this.props.onRemove(this.props.index)
    }

    render() {
        return (
            <div className='comment'>
                {this.props.children}
                <button className='delete' onClick={this.remove}><FaTimes /></button>
            </div>
        )
    }
}