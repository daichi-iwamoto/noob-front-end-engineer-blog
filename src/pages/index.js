import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Tech from "../components/article-tech"
import Hobby from "../components/article-hobby"
import BackgroundWave from "../components/background-wave"

class BlogIndexs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'tech'
    }
  }

  showHobby = () => {
    this.setState({type: 'hobby'})
  }
  showTech = () => {
    this.setState({type: 'tech'})
  }

  render() {
    let articles
    let techClass
    let hobbyClass
    if ( this.state.type === 'hobby' ) {
      articles = <Hobby />
      techClass = "tag"
      hobbyClass = "tag active"
    } else if ( this.state.type === 'tech' ) {
      articles = <Tech />
      techClass = "tag active"
      hobbyClass = "tag"
    }

    return (
      <section className="postlist">
        <BackgroundWave />
        <h2>Posts</h2>

        <ul className="tag-list">
          <li className={techClass}><button onClick={this.showTech}>Tech</button></li>
          <li className={hobbyClass}><button onClick={this.showHobby}>Hobby</button></li>
        </ul>
        
        {articles}
      </section>
    )
  }
}

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <div className="index">
        <SEO title="Home" />

        <BlogIndexs />
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
