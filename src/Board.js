import React, {Component} from 'react'
import Note from './Note'
import {FaPlus} from 'react-icons/fa'

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
        }
        this.eachNote = this.eachNote.bind(this)
        this.add = this.add.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
        this.nextId = this.nextId.bind(this)
    }

    add(text) {
        this.setState(prevState => ({
            notes: [
                ...prevState.notes,
                {
                    id: this.nextId(),
                    note: text
                },
            ]
        }))
    }

    nextId() {
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }

    update(newText, id) {
        console.log('updating item at index', id, newText)
        this.setState(prevState => ({
            notes: prevState.notes.map(
                note => (note.id !== id) ? note : { ...note, note: newText }
            )
        }))
    }

    remove(id) {
        this.setState(prevState => ({
            notes: prevState.notes.filter(
                note => note.id !== id
            )
        }))
    }

    eachNote(note, id) {
        return (
            <Note key={note.id} index={note.id}
                onChange={this.update} onRemove={this.remove}>
                {note.note}
            </Note>
        )
    }

    render() {
        return (
            <div className='board'>
                {this.state.notes.map(this.eachNote)}
                <button onClick={this.add.bind(null, "New Note")} id="add" title="Add New Note"><FaPlus /></button>
            </div>
        )
    }
}

export default Board
