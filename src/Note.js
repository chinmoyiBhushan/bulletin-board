import React, {Component} from 'react'
import classNames from 'classnames'
import {CommentForm, Comment} from './Comment'
import {FaPencilAlt, FaTrash, FaSave, FaComment} from 'react-icons/fa'

class Note extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            done: false,
            commenting: false,
            comments: [],
        }
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.save = this.save.bind(this)
        this.toggleIsDone = this.toggleIsDone.bind(this)
        this.toggleAddComment = this.toggleAddComment.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.generateCommentHtml = this.generateCommentHtml.bind(this)
        this.addNewComment = this.addNewComment.bind(this)
        this.removeComment = this.removeComment.bind(this)
    }
    edit() {
        this.setState({
            editing: true,
        })
    }

    remove() {
        this.props.onRemove(this.props.index)
    }

    save(e) {
        e.preventDefault()
        this.props.onChange(this._newText.value, this.props.index)
        this.setState({
            editing: false,
        })
    }

    toggleIsDone() {
        this.setState({
            done: !this.state.done,
        })
    }

    getStylesFor(done) {
        return done ? { color: 'green', textDecoration: 'line-through' } : {};
    }

    toggleAddComment() {
        this.setState({
            commenting: !this.state.commenting,
        })
    }
    
    removeComment(index) {
        this.setState(prevState => {
            const newComments = [...prevState.comments]
            newComments.splice(index, 1)
            return {comments: newComments}
        })
    }
    
    generateCommentHtml(comment, index) {
        return (
            <Comment key={index} index={index} onRemove={this.removeComment}>
                {comment}
            </Comment>
        )
    }

    addNewComment(comment) {
        this.setState(prevState => ({
            comments: [
                ...prevState.comments,
                comment,
            ],
            commenting: false,
        }))
    }

    renderForm() {
        return (
            <div className={classNames({
                note: true,
                done: this.state.done,
            })} style={this.getStylesFor(this.state.done)}>
                <form onSubmit={this.save}>
                    <textarea ref={input => this._newText = input} />
                    <button id="save"><FaSave /></button>
                </form>
            </div>
        )
    }
    renderDisplay() {
        return (
            <div className={classNames({
                note: true,
                done: this.state.done,
            })} style={this.getStylesFor(this.state.done)}>
                <p>{this.props.children}</p>
                <div className='doneCheckBox'>
                    <label>Done</label>
                    <input type="checkbox" checked={this.state.done} onChange={this.toggleIsDone} />
                </div>
                <aside className='actions'>
                    <button onClick={this.toggleAddComment} id='comment'><FaComment /></button>
                    <button onClick={this.edit} id='edit'><FaPencilAlt /></button>
                    <button onClick={this.remove} id='remove'><FaTrash /></button>
                </aside>
                {this.state.commenting ? <CommentForm onNewComment={this.addNewComment} /> : ''}
                {this.state.comments.map(this.generateCommentHtml)}
            </div>
        )
    }

    render() {
        return this.state.editing ? this.renderForm() : this.renderDisplay()
    }
}

export default Note
