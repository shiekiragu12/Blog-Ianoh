import React, { useState } from 'react'
import './Blog.scss'
import { Button, Card } from 'react-bootstrap';
import Book from '../assets/book.png'
import Travel from '../assets/travel_2.png'
import Travel2 from '../assets/travel.png'
import Editor from '../assets/editor.png'
import Influencer from '../assets/influencer.png'
import { Link } from 'react-router-dom';


function Blog() {
  const blogData = [
    {
      id: "1",
      title: "The Ultimate Travel Guide: Top Destinations for Adventure Seekers",
      description: "Embark on an exhilarating journey as we explore the most thrilling destinations around the world for adventure seekers. From scaling majestic mountains to diving into the depths of the ocean, this blog post will provide a comprehensive guide to adrenaline-pumping activities and breathtaking landscapes. Discover hidden gems, adrenaline-fueled experiences, and insider tips for adventure travel enthusiasts looking to push their boundaries and create unforgettable memories.",
      img: Book,
      tag: "Travel",
      datePosted: "2022-06-20",
      personPosted: "David Kim",

    },
    {
      id: "2",
      title: "The Role of Education in Shaping the Future Generation",
      description: "Education is the foundation of a prosperous society. In this blog post, we will delve into the critical role education plays in shaping the minds of the future generation. Explore how education fosters intellectual growth, cultivates essential skills, and instills values that prepare individuals for success in a rapidly evolving world. Discuss the significance of innovative teaching methods, inclusive education, and lifelong learning in equipping the next generation with the tools they need to navigate the challenges and seize the opportunities of the future.",
      img: Travel2,
      tag: "Education",
      datePosted: "2022-05-10",
      personPosted: "Emily Lee",
    },
    {
      id: "3",
      title: "Social Media: The Good, the Bad, and the Impact on Society",
      description: "Step into the captivating world of social media and examine its profound influence on individuals and society as a whole. This blog post will delve into the positive aspects of social media, such as its power to connect people, amplify voices, and drive social change. It will also address the negative impacts, including the effects on mental health, privacy concerns, and the spread of misinformation. Analyze the evolving role of social media in shaping societal norms, political landscapes, and cultural trends, and explore strategies for cultivating a healthy and responsible digital presence",
      img: Travel,
      tag: "Social Media",
      datePosted: "2022-04-15",
      personPosted: "Sarah Johnson",
    },
    {
      id: "4",
      title: "The Ultimate Travel Guide: Top Destinations for Adventure Seekers",
      description: "Embark on an exhilarating journey as we explore the most thrilling destinations around the world for adventure seekers. From scaling majestic mountains to diving into the depths of the ocean, this blog post will provide a comprehensive guide to adrenaline-pumping activities and breathtaking landscapes. Discover hidden gems, adrenaline-fueled experiences, and insider tips for adventure travel enthusiasts looking to push their boundaries and create unforgettable memories.",
      img: Editor,
      tag: "Travel",
      datePosted: "2022-03-01",
      personPosted: "John Smith",
    },
    {
      id: "5",
      title: "The Role of Education in Shaping the Future Generation",
      description: "Education is the foundation of a prosperous society. In this blog post, we will delve into the critical role education plays in shaping the minds of the future generation. Explore how education fosters intellectual growth, cultivates essential skills, and instills values that prepare individuals for success in a rapidly evolving world. Discuss the significance of innovative teaching methods, inclusive education, and lifelong learning in equipping the next generation with the tools they need to navigate the challenges and seize the opportunities of the future.",
      img: Travel2,
      tag: "Education",
      datePosted: "2022-05-10",
      personPosted: "Emily Lee",
    },
    {
      id: "6",
      title: "Social Media: The Good, the Bad, and the Impact on Society",
      description: "Step into the captivating world of social media and examine its profound influence on individuals and society as a whole. This blog post will delve into the positive aspects of social media, such as its power to connect people, amplify voices, and drive social change. It will also address the negative impacts, including the effects on mental health, privacy concerns, and the spread of misinformation. Analyze the evolving role of social media in shaping societal norms, political landscapes, and cultural trends, and explore strategies for cultivating a healthy and responsible digital presence",
      img: Influencer,
      tag: "Social Media",
      datePosted: "2022-04-15",
      personPosted: "Sarah Johnson",
    },
    {
      id: "1",
      title: "The Ultimate Travel Guide: Top Destinations for Adventure Seekers",
      description: "Embark on an exhilarating journey as we explore the most thrilling destinations around the world for adventure seekers. From scaling majestic mountains to diving into the depths of the ocean, this blog post will provide a comprehensive guide to adrenaline-pumping activities and breathtaking landscapes. Discover hidden gems, adrenaline-fueled experiences, and insider tips for adventure travel enthusiasts looking to push their boundaries and create unforgettable memories.",
      img: Book,
      tag: "Travel",
      datePosted: "2022-06-20",
      personPosted: "David Kim",

    },
    {
      id: "2",
      title: "The Role of Education in Shaping the Future Generation",
      description: "Education is the foundation of a prosperous society. In this blog post, we will delve into the critical role education plays in shaping the minds of the future generation. Explore how education fosters intellectual growth, cultivates essential skills, and instills values that prepare individuals for success in a rapidly evolving world. Discuss the significance of innovative teaching methods, inclusive education, and lifelong learning in equipping the next generation with the tools they need to navigate the challenges and seize the opportunities of the future.",
      img: Travel2,
      tag: "Education",
      datePosted: "2022-05-10",
      personPosted: "Emily Lee",
    },
    {
      id: "3",
      title: "Social Media: The Good, the Bad, and the Impact on Society",
      description: "Step into the captivating world of social media and examine its profound influence on individuals and society as a whole. This blog post will delve into the positive aspects of social media, such as its power to connect people, amplify voices, and drive social change. It will also address the negative impacts, including the effects on mental health, privacy concerns, and the spread of misinformation. Analyze the evolving role of social media in shaping societal norms, political landscapes, and cultural trends, and explore strategies for cultivating a healthy and responsible digital presence",
      img: Travel,
      tag: "Social Media",
      datePosted: "2022-04-15",
      personPosted: "Sarah Johnson",
    },
    {
      id: "4",
      title: "The Ultimate Travel Guide: Top Destinations for Adventure Seekers",
      description: "Embark on an exhilarating journey as we explore the most thrilling destinations around the world for adventure seekers. From scaling majestic mountains to diving into the depths of the ocean, this blog post will provide a comprehensive guide to adrenaline-pumping activities and breathtaking landscapes. Discover hidden gems, adrenaline-fueled experiences, and insider tips for adventure travel enthusiasts looking to push their boundaries and create unforgettable memories.",
      img: Editor,
      tag: "Travel",
      datePosted: "2022-03-01",
      personPosted: "John Smith",
    },
    {
      id: "5",
      title: "The Role of Education in Shaping the Future Generation",
      description: "Education is the foundation of a prosperous society. In this blog post, we will delve into the critical role education plays in shaping the minds of the future generation. Explore how education fosters intellectual growth, cultivates essential skills, and instills values that prepare individuals for success in a rapidly evolving world. Discuss the significance of innovative teaching methods, inclusive education, and lifelong learning in equipping the next generation with the tools they need to navigate the challenges and seize the opportunities of the future.",
      img: Travel2,
      tag: "Education",
      datePosted: "2022-05-10",
      personPosted: "Emily Lee",
    },
    {
      id: "6",
      title: "Social Media: The Good, the Bad, and the Impact on Society",
      description: "Step into the captivating world of social media and examine its profound influence on individuals and society as a whole. This blog post will delve into the positive aspects of social media, such as its power to connect people, amplify voices, and drive social change. It will also address the negative impacts, including the effects on mental health, privacy concerns, and the spread of misinformation. Analyze the evolving role of social media in shaping societal norms, political landscapes, and cultural trends, and explore strategies for cultivating a healthy and responsible digital presence",
      img: Influencer,
      tag: "Social Media",
      datePosted: "2022-04-15",
      personPosted: "Sarah Johnson",
    },
    {
      id: "1",
      title: "The Ultimate Travel Guide: Top Destinations for Adventure Seekers",
      description: "Embark on an exhilarating journey as we explore the most thrilling destinations around the world for adventure seekers. From scaling majestic mountains to diving into the depths of the ocean, this blog post will provide a comprehensive guide to adrenaline-pumping activities and breathtaking landscapes. Discover hidden gems, adrenaline-fueled experiences, and insider tips for adventure travel enthusiasts looking to push their boundaries and create unforgettable memories.",
      img: Book,
      tag: "Travel",
      datePosted: "2022-06-20",
      personPosted: "David Kim",

    },
    {
      id: "2",
      title: "The Role of Education in Shaping the Future Generation",
      description: "Education is the foundation of a prosperous society. In this blog post, we will delve into the critical role education plays in shaping the minds of the future generation. Explore how education fosters intellectual growth, cultivates essential skills, and instills values that prepare individuals for success in a rapidly evolving world. Discuss the significance of innovative teaching methods, inclusive education, and lifelong learning in equipping the next generation with the tools they need to navigate the challenges and seize the opportunities of the future.",
      img: Travel2,
      tag: "Education",
      datePosted: "2022-05-10",
      personPosted: "Emily Lee",
    },
    {
      id: "3",
      title: "Social Media: The Good, the Bad, and the Impact on Society",
      description: "Step into the captivating world of social media and examine its profound influence on individuals and society as a whole. This blog post will delve into the positive aspects of social media, such as its power to connect people, amplify voices, and drive social change. It will also address the negative impacts, including the effects on mental health, privacy concerns, and the spread of misinformation. Analyze the evolving role of social media in shaping societal norms, political landscapes, and cultural trends, and explore strategies for cultivating a healthy and responsible digital presence",
      img: Travel,
      tag: "Social Media",
      datePosted: "2022-04-15",
      personPosted: "Sarah Johnson",
    },
    {
      id: "4",
      title: "The Ultimate Travel Guide: Top Destinations for Adventure Seekers",
      description: "Embark on an exhilarating journey as we explore the most thrilling destinations around the world for adventure seekers. From scaling majestic mountains to diving into the depths of the ocean, this blog post will provide a comprehensive guide to adrenaline-pumping activities and breathtaking landscapes. Discover hidden gems, adrenaline-fueled experiences, and insider tips for adventure travel enthusiasts looking to push their boundaries and create unforgettable memories.",
      img: Editor,
      tag: "Travel",
      datePosted: "2022-03-01",
      personPosted: "John Smith",
    },
    {
      id: "5",
      title: "The Role of Education in Shaping the Future Generation",
      description: "Education is the foundation of a prosperous society. In this blog post, we will delve into the critical role education plays in shaping the minds of the future generation. Explore how education fosters intellectual growth, cultivates essential skills, and instills values that prepare individuals for success in a rapidly evolving world. Discuss the significance of innovative teaching methods, inclusive education, and lifelong learning in equipping the next generation with the tools they need to navigate the challenges and seize the opportunities of the future.",
      img: Travel2,
      tag: "Education",
      datePosted: "2022-05-10",
      personPosted: "Emily Lee",
    },
    {
      id: "6",
      title: "Social Media: The Good, the Bad, and the Impact on Society",
      description: "Step into the captivating world of social media and examine its profound influence on individuals and society as a whole. This blog post will delve into the positive aspects of social media, such as its power to connect people, amplify voices, and drive social change. It will also address the negative impacts, including the effects on mental health, privacy concerns, and the spread of misinformation. Analyze the evolving role of social media in shaping societal norms, political landscapes, and cultural trends, and explore strategies for cultivating a healthy and responsible digital presence",
      img: Influencer,
      tag: "Social Media",
      datePosted: "2022-04-15",
      personPosted: "Sarah Johnson",
    },
    {
      id: "1",
      title: "The Ultimate Travel Guide: Top Destinations for Adventure Seekers",
      description: "Embark on an exhilarating journey as we explore the most thrilling destinations around the world for adventure seekers. From scaling majestic mountains to diving into the depths of the ocean, this blog post will provide a comprehensive guide to adrenaline-pumping activities and breathtaking landscapes. Discover hidden gems, adrenaline-fueled experiences, and insider tips for adventure travel enthusiasts looking to push their boundaries and create unforgettable memories.",
      img: Book,
      tag: "Travel",
      datePosted: "2022-06-20",
      personPosted: "David Kim",

    },
    {
      id: "2",
      title: "The Role of Education in Shaping the Future Generation",
      description: "Education is the foundation of a prosperous society. In this blog post, we will delve into the critical role education plays in shaping the minds of the future generation. Explore how education fosters intellectual growth, cultivates essential skills, and instills values that prepare individuals for success in a rapidly evolving world. Discuss the significance of innovative teaching methods, inclusive education, and lifelong learning in equipping the next generation with the tools they need to navigate the challenges and seize the opportunities of the future.",
      img: Travel2,
      tag: "Education",
      datePosted: "2022-05-10",
      personPosted: "Emily Lee",
    },
    {
      id: "3",
      title: "Social Media: The Good, the Bad, and the Impact on Society",
      description: "Step into the captivating world of social media and examine its profound influence on individuals and society as a whole. This blog post will delve into the positive aspects of social media, such as its power to connect people, amplify voices, and drive social change. It will also address the negative impacts, including the effects on mental health, privacy concerns, and the spread of misinformation. Analyze the evolving role of social media in shaping societal norms, political landscapes, and cultural trends, and explore strategies for cultivating a healthy and responsible digital presence",
      img: Travel,
      tag: "Social Media",
      datePosted: "2022-04-15",
      personPosted: "Sarah Johnson",
    },
    {
      id: "4",
      title: "The Ultimate Travel Guide: Top Destinations for Adventure Seekers",
      description: "Embark on an exhilarating journey as we explore the most thrilling destinations around the world for adventure seekers. From scaling majestic mountains to diving into the depths of the ocean, this blog post will provide a comprehensive guide to adrenaline-pumping activities and breathtaking landscapes. Discover hidden gems, adrenaline-fueled experiences, and insider tips for adventure travel enthusiasts looking to push their boundaries and create unforgettable memories.",
      img: Editor,
      tag: "Travel",
      datePosted: "2022-03-01",
      personPosted: "John Smith",
    },
    {
      id: "5",
      title: "The Role of Education in Shaping the Future Generation",
      description: "Education is the foundation of a prosperous society. In this blog post, we will delve into the critical role education plays in shaping the minds of the future generation. Explore how education fosters intellectual growth, cultivates essential skills, and instills values that prepare individuals for success in a rapidly evolving world. Discuss the significance of innovative teaching methods, inclusive education, and lifelong learning in equipping the next generation with the tools they need to navigate the challenges and seize the opportunities of the future.",
      img: Travel2,
      tag: "Education",
      datePosted: "2022-05-10",
      personPosted: "Emily Lee",
    },
    {
      id: "6",
      title: "Social Media: The Good, the Bad, and the Impact on Society",
      description: "Step into the captivating world of social media and examine its profound influence on individuals and society as a whole. This blog post will delve into the positive aspects of social media, such as its power to connect people, amplify voices, and drive social change. It will also address the negative impacts, including the effects on mental health, privacy concerns, and the spread of misinformation. Analyze the evolving role of social media in shaping societal norms, political landscapes, and cultural trends, and explore strategies for cultivating a healthy and responsible digital presence",
      img: Influencer,
      tag: "Social Media",
      datePosted: "2022-04-15",
      personPosted: "Sarah Johnson",
    },
    {
      id: "1",
      title: "The Ultimate Travel Guide: Top Destinations for Adventure Seekers",
      description: "Embark on an exhilarating journey as we explore the most thrilling destinations around the world for adventure seekers. From scaling majestic mountains to diving into the depths of the ocean, this blog post will provide a comprehensive guide to adrenaline-pumping activities and breathtaking landscapes. Discover hidden gems, adrenaline-fueled experiences, and insider tips for adventure travel enthusiasts looking to push their boundaries and create unforgettable memories.",
      img: Book,
      tag: "Travel",
      datePosted: "2022-06-20",
      personPosted: "David Kim",

    },
    {
      id: "2",
      title: "The Role of Education in Shaping the Future Generation",
      description: "Education is the foundation of a prosperous society. In this blog post, we will delve into the critical role education plays in shaping the minds of the future generation. Explore how education fosters intellectual growth, cultivates essential skills, and instills values that prepare individuals for success in a rapidly evolving world. Discuss the significance of innovative teaching methods, inclusive education, and lifelong learning in equipping the next generation with the tools they need to navigate the challenges and seize the opportunities of the future.",
      img: Travel2,
      tag: "Education",
      datePosted: "2022-05-10",
      personPosted: "Emily Lee",
    },
    {
      id: "3",
      title: "Social Media: The Good, the Bad, and the Impact on Society",
      description: "Step into the captivating world of social media and examine its profound influence on individuals and society as a whole. This blog post will delve into the positive aspects of social media, such as its power to connect people, amplify voices, and drive social change. It will also address the negative impacts, including the effects on mental health, privacy concerns, and the spread of misinformation. Analyze the evolving role of social media in shaping societal norms, political landscapes, and cultural trends, and explore strategies for cultivating a healthy and responsible digital presence",
      img: Travel,
      tag: "Social Media",
      datePosted: "2022-04-15",
      personPosted: "Sarah Johnson",
    },
    {
      id: "4",
      title: "The Ultimate Travel Guide: Top Destinations for Adventure Seekers",
      description: "Embark on an exhilarating journey as we explore the most thrilling destinations around the world for adventure seekers. From scaling majestic mountains to diving into the depths of the ocean, this blog post will provide a comprehensive guide to adrenaline-pumping activities and breathtaking landscapes. Discover hidden gems, adrenaline-fueled experiences, and insider tips for adventure travel enthusiasts looking to push their boundaries and create unforgettable memories.",
      img: Editor,
      tag: "Travel",
      datePosted: "2022-03-01",
      personPosted: "John Smith",
    },
    {
      id: "5",
      title: "The Role of Education in Shaping the Future Generation",
      description: "Education is the foundation of a prosperous society. In this blog post, we will delve into the critical role education plays in shaping the minds of the future generation. Explore how education fosters intellectual growth, cultivates essential skills, and instills values that prepare individuals for success in a rapidly evolving world. Discuss the significance of innovative teaching methods, inclusive education, and lifelong learning in equipping the next generation with the tools they need to navigate the challenges and seize the opportunities of the future.",
      img: Travel2,
      tag: "Education",
      datePosted: "2022-05-10",
      personPosted: "Emily Lee",
    },
    {
      id: "6",
      title: "Social Media: The Good, the Bad, and the Impact on Society",
      description: "Step into the captivating world of social media and examine its profound influence on individuals and society as a whole. This blog post will delve into the positive aspects of social media, such as its power to connect people, amplify voices, and drive social change. It will also address the negative impacts, including the effects on mental health, privacy concerns, and the spread of misinformation. Analyze the evolving role of social media in shaping societal norms, political landscapes, and cultural trends, and explore strategies for cultivating a healthy and responsible digital presence",
      img: Influencer,
      tag: "Social Media",
      datePosted: "2022-04-15",
      personPosted: "Sarah Johnson",
    },
    {
      id: "1",
      title: "The Ultimate Travel Guide: Top Destinations for Adventure Seekers",
      description: "Embark on an exhilarating journey as we explore the most thrilling destinations around the world for adventure seekers. From scaling majestic mountains to diving into the depths of the ocean, this blog post will provide a comprehensive guide to adrenaline-pumping activities and breathtaking landscapes. Discover hidden gems, adrenaline-fueled experiences, and insider tips for adventure travel enthusiasts looking to push their boundaries and create unforgettable memories.",
      img: Book,
      tag: "Travel",
      datePosted: "2022-06-20",
      personPosted: "David Kim",

    },
    {
      id: "2",
      title: "The Role of Education in Shaping the Future Generation",
      description: "Education is the foundation of a prosperous society. In this blog post, we will delve into the critical role education plays in shaping the minds of the future generation. Explore how education fosters intellectual growth, cultivates essential skills, and instills values that prepare individuals for success in a rapidly evolving world. Discuss the significance of innovative teaching methods, inclusive education, and lifelong learning in equipping the next generation with the tools they need to navigate the challenges and seize the opportunities of the future.",
      img: Travel2,
      tag: "Education",
      datePosted: "2022-05-10",
      personPosted: "Emily Lee",
    },
    {
      id: "3",
      title: "Social Media: The Good, the Bad, and the Impact on Society",
      description: "Step into the captivating world of social media and examine its profound influence on individuals and society as a whole. This blog post will delve into the positive aspects of social media, such as its power to connect people, amplify voices, and drive social change. It will also address the negative impacts, including the effects on mental health, privacy concerns, and the spread of misinformation. Analyze the evolving role of social media in shaping societal norms, political landscapes, and cultural trends, and explore strategies for cultivating a healthy and responsible digital presence",
      img: Travel,
      tag: "Social Media",
      datePosted: "2022-04-15",
      personPosted: "Sarah Johnson",
    },
    {
      id: "4",
      title: "The Ultimate Travel Guide: Top Destinations for Adventure Seekers",
      description: "Embark on an exhilarating journey as we explore the most thrilling destinations around the world for adventure seekers. From scaling majestic mountains to diving into the depths of the ocean, this blog post will provide a comprehensive guide to adrenaline-pumping activities and breathtaking landscapes. Discover hidden gems, adrenaline-fueled experiences, and insider tips for adventure travel enthusiasts looking to push their boundaries and create unforgettable memories.",
      img: Editor,
      tag: "Travel",
      datePosted: "2022-03-01",
      personPosted: "John Smith",
    },
    {
      id: "5",
      title: "The Role of Education in Shaping the Future Generation",
      description: "Education is the foundation of a prosperous society. In this blog post, we will delve into the critical role education plays in shaping the minds of the future generation. Explore how education fosters intellectual growth, cultivates essential skills, and instills values that prepare individuals for success in a rapidly evolving world. Discuss the significance of innovative teaching methods, inclusive education, and lifelong learning in equipping the next generation with the tools they need to navigate the challenges and seize the opportunities of the future.",
      img: Travel2,
      tag: "Education",
      datePosted: "2022-05-10",
      personPosted: "Emily Lee",
    },
    {
      id: "6",
      title: "Social Media: The Good, the Bad, and the Impact on Society",
      description: "Step into the captivating world of social media and examine its profound influence on individuals and society as a whole. This blog post will delve into the positive aspects of social media, such as its power to connect people, amplify voices, and drive social change. It will also address the negative impacts, including the effects on mental health, privacy concerns, and the spread of misinformation. Analyze the evolving role of social media in shaping societal norms, political landscapes, and cultural trends, and explore strategies for cultivating a healthy and responsible digital presence",
      img: Influencer,
      tag: "Social Media",
      datePosted: "2022-04-15",
      personPosted: "Sarah Johnson",
    },


  ]

  // getting to see the rest of the cards
  const [numBlogsToShow, setNumBlogsToShow] = useState(4);

  return (
    <div className='blogs'>
      {/* carousel */}
   
      {/* top cards that show the metrics */}
      <div className='cardsMetrics'>
        <Card className='views'>
          <Card.Body>
            No of views :26
          </Card.Body>
        </Card>
        <Card className='posts'>
          <Card.Body>
            No of blogs posted :6
          </Card.Body>
        </Card>
        <Card className='reviews'>
          <Card.Body>
            No of reviews :26
          </Card.Body>
        </Card>
        <Card className='rates'>
          <Card.Body>
            No of rates :26
          </Card.Body>
        </Card>
      </div>
      {/* the blogs with images  */}

      <div className='blogsCards'>

        {blogData.slice(0, numBlogsToShow).map((blogDetail) => (
          <Card key={blogDetail.id}>
            <Card.Img src={blogDetail.img} />
            <Card.Body>
              <h2>{blogDetail.title}</h2>
              <span>{blogDetail.tag}</span>
              <div className='d-flex justify-content-between'>
                <span>Posted by: {blogDetail.personPosted}</span>
                <span>on: {blogDetail.datePosted}</span>

              </div>
              <p >{blogDetail.description}</p>
              <Link to={`/blog/${blogDetail.id}`}>Read More</Link>
            </Card.Body>
          </Card>
        ))}
        <div className='viewmore'>
        {blogData.length > 4 && numBlogsToShow < blogData.length && (
          <Button onClick={() => setNumBlogsToShow(numBlogsToShow + 4)}>
            View More Blogs
          </Button>
        )}
        </div>
     
      </div>
      <p className='mt-3'></p>

    </div>
  )
}

export default Blog