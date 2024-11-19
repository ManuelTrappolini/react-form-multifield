import { useState } from 'react'
import initialPosts from './database/db.js'
import './App.css'

const emptyPost = {
  title: "",
  image: "",
  content: "",
  tags: [],
  published: false,
}

function App() {

  const [formData, setFormData] = useState(emptyPost)
  const [posts, setPosts] = useState(initialPosts)
  const [newPosts, setNewPost] = useState('')



  function handleFormSubmit(e) {

    e.preventDefault()
    console.log('Form sent', formData);

    const newItem = {
      id: Date.now(),
      ...formData
    }

    setPosts([
      newItem,
      ...posts
    ])

    setFormData(emptyPost)
  }

  function handleTrashPostClick(e) {

    const postIndexToTrash = Number(e.target.getAttribute('data-index'))
    console.log(posts, postIndexToTrash);
    const newPosts = initialPosts.filter((post, index) => index != postIndexToTrash)
    setPosts(newPosts)
  }

  function handleFormField(e) {
    //console.log(e.target);

    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  return (
    <>
      <div className="containter mt-3 ">
        <h1>Posts List</h1>
        <form onSubmit={handleFormSubmit}>

          <div className="input-group mb-3">

            <label htmlFor="post" className='farm-label m-3'>Post</label>
            <div className="input-group mb-3">
              <input type="text"
                className="form-control"
                placeholder="Recipient's title"
                aria-label="Recipient's title"
                aria-describedby="titlehelper"
                value={formData.title}
                name='title'
                id='title'
                onChange={handleFormField}
              />
              <input type="text" className="form-control"
                placeholder="Recipient's tags"
                aria-label="Recipient's tags"
                aria-describedby="tagshelper"
                value={formData.tags}
                name='tags'
                id='tags'
                onChange={handleFormField}
              />
              <input type="text" className="form-control"
                placeholder="Recipient's image"
                aria-label="Recipient's image"
                aria-describedby="imagehelper"
                value={formData.image}
                name='image'
                id='image'
                onChange={handleFormField}
              />

              <textarea type="text" className="form-control"
                placeholder="Recipient's content"
                aria-label="Recipient's content"
                aria-describedby="contenthelper"
                value={formData.content}
                name='content'
                id='content'
                onChange={handleFormField}
              />


              <button className='btn btn-outline-secondary' type='submit'> Click ME</button>
            </div>
            <div className="form-check m-3">
              <input
                id="published"
                name='published'
                type="checkbox"
                className="form-check-input"
                value={formData.published}
                onChange={handleFormField}

              />
              <label className="form-check-label" htmlFor=""> Published </label>
            </div>
          </div>


        </form>

        <ul className="list-group">

          {initialPosts.map((post, index) => <li key={index} className="list-group-item d-flex justify-content-between">
            {post.title + " " + post.tags}
            <button type='submit' onClick={handleTrashPostClick} data-index={index}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg></button>

          </li>)}

        </ul>
      </div>
    </>
  )
}


export default App
