import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Tech from "../components/article-tech"
import Novel from "../components/article-novel"

class BlogIndexs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'tech'
    }
  }

  showNovel = () => {
    this.setState({type: 'novel'})
  }
  showTech = () => {
    this.setState({type: 'tech'})
  }

  render() {
    let articles
    let techClass
    let novelClass
    if ( this.state.type === 'novel' ) {
      articles = <Novel />
      techClass = "tag"
      novelClass = "tag active"
    } else if ( this.state.type === 'tech' ) {
      articles = <Tech />
      techClass = "tag active"
      novelClass = "tag"
    }

    return (
      <section className="postlist">
        <h2>Posts</h2>

        <ul className="tag-list">
          <li className={techClass}><button onClick={this.showTech}>Tech</button></li>
          <li className={novelClass}><button onClick={this.showNovel}>Novel</button></li>
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
