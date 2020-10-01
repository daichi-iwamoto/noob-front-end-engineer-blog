import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  // タグリスト出力
  // const renderTags = () => {
    
  //   // タグ一覧取得処理
  //   let tag = []
  //   posts.map(({ node }) => {
  //     if (node.frontmatter.tag !== null) {
  //       node.frontmatter.tag.forEach(val => {
  //         tag.push(val)
  //       })
  //     }
  //     return tag
  //   })
  //   const tags = Array.from(new Set(tag))
    
  //   // タグの出力処理
  //   let list = []
  //   tags.forEach(val => {
  //     list.push(<li><p>{val}</p></li>)
  //   })
    
  //   return list
  // }

  return (
    <Layout location={location} title={siteTitle}>
      <div className="index">
        <SEO title="Home" />

        {/* <section>
          <h2>Tags</h2>
          <ul className="taglist">
            {renderTags()}
          </ul>
        </section> */}

        <section className="postlist">
          <h2>Posts</h2>

          <div className="listbox">
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug

              if (true) {
                return (
                  <Link to={node.fields.slug}>
                    <article key={node.fields.slug}>
                      <header>
                        <h3
                          style={{
                            marginBottom: rhythm(1 / 4),
                          }}
                        >
                            {title}
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
                  </Link>
                )
              } else {
                return null
              }
            })}
          </div>
        </section>
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
