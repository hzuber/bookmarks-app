import React, { Component } from  'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config'
import './EditBookmark.css';

class EditBookmark extends Component{
    static contextType = BookmarksContext;
    constructor(props){
        super(props);
        this.state = {
            error: null,
            id: '',
            title: '',
            url: '',
            description: '',
            rating:''
        }
    }

    componentDidMount(){
        const bookmarkId = this.props.match.params.id
        fetch(`${config.API_ENDPOINT}/${bookmarkId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${config.API_KEY}`
              }
        })
        .then(res => {
          if (!res.ok) {
            return res.json().then(error => {
              throw error
            })
          }
          return res.json()
        })
        .then(res => {
            this.setState({
                id: bookmarkId,
                title: res.title,
                url: res.url,
                description: res.description,
                rating: res.rating
            })
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }

    handleChangeDescription(description){
        this.setState({description})
    }
    handleChangeTitle(title){
        this.setState({title})
    }
    handleChangeRating(rating){
        this.setState({rating})
    }
    handleChangeUrl(url){
        this.setState({url})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit clicked')
        const id = Number(this.props.match.params.id)
        const { title, url, description, rating } = this.state
        const newBookmark = { title, url, description, rating, id }
        fetch(`${config.API_ENDPOINT}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(newBookmark),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
              }
        })
        .then(res => {
          if (!res.ok) {
            return res.json().then(error => {
              throw error
            })
          }
        })
        .then(() => {
            this.setState({
                error: null,
                id: '',
                title: '',
                url: '',
                description: '',
                rating:''
            })
            this.context.editBookmark(newBookmark)
        })
        .then(() => 
            this.props.history.push('/')
        )
        .catch(error => {
          this.setState({ error })
        }) 
    }

    clickCancel = () => {
        this.props.history.push('/')
    }

    render(){
        const { error, title, url, description, rating } = this.state;
        return(
            <section className = "editBookmarkContainer">
                <h2>Edit Bookmark</h2>
                <form 
                    className = "editBookmarkForm"
                    onSubmit = {e => this.handleSubmit(e)}>   
                    <div className='EditBookmark__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <label>Title: 
                        <input 
                            type="text"
                            name="title"
                            id="title"
                            placeholder='title'
                            value={title}
                            required
                            onChange={e => this.handleChangeTitle(e.target.value)}/>
                    </label>
                    <label>URL: 
                        <input 
                            type="text"
                            name="url"
                            id="url"
                            placeholder='url@url.com'
                            value={url}
                            required
                            onChange={e => this.handleChangeUrl(e.target.value)}/>
                    </label>
                    <label>Description: 
                        <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder='description'
                            value={description}
                            onChange={e => this.handleChangeDescription(e.target.value)}/>
                    </label>
                    <label>Rating: 
                        <input 
                            type="number"
                            min="1"
                            max="5"
                            name="rating"
                            id="rating"
                            placeholder='5'
                            value={rating}
                            required
                            onChange={e => this.handleChangeRating(e.target.value)}/>
                    </label>
                    <div className = "editForm_Buttons">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={this.clickCancel}>Cancel</button>
                    </div>
                </form>
            </section>
        )
    }
}

export default EditBookmark;
