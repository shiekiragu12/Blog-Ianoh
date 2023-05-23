import React from 'react'
import './BlogDetails.scss'
import { useParams } from 'react-router-dom'
import ListBlogs from './ListBlogs'
import { Card, Image, Button } from 'react-bootstrap';

function BlogDetails() {
  const { id } = useParams()
  const blogPost = ListBlogs.find((post) => post.id === parseInt(id));


  return (
    <div className='blogDetails'>
      <div className='topDetails'>
        <Image src={blogPost.image}></Image>
        <Card>
          <Card.Body>
            <Image src={blogPost.userImage} className='cardImage'></Image>
            <p>{blogPost.userCreated}</p>
            <p>Created on :{blogPost.datePosted}</p>
            <p className='pSpan'>{blogPost.tag}</p>
            <p>Number of Reviews:{blogPost.numReviews}</p>
          </Card.Body>
        </Card>
      </div>
          <p className='pSpan' >{blogPost.tag}</p>
      <p className='mt-2'>{blogPost.description}</p>
    </div>
  )
}

export default BlogDetails