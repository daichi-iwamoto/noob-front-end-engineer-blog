import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  // タグリスト出力
  const renderTags = () => {
    
    // タグ一覧取得処理
    let tag = []
    posts.map(({ node }) => {
      if (node.frontmatter.tag !== null) {
        node.frontmatter.tag.forEach(val => {
          tag.push(val)
        })
      }
      return tag
    })
    const tags = Array.from(new Set(tag))
    
    // タグの出力処理
    let list = []
    tags.forEach(val => {
      list.push(<li>{val}</li>)
    })
    
    return list
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />

      <ul>
        {renderTags()}
      </ul>

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug

        let tag_span
        if (node.frontmatter.tag !== null) {
          node.frontmatter.tag.forEach(val => {
            tag_span += "<span>{val}</span>"
          })
        }

        if (true) {
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        } else {
          return null
        }
      })}
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY/MM/DD")
            title
            description
            tag
          }
        }
      }
    }
  }
`
