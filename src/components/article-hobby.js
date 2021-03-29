import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { rhythm } from "../utils/typography"

const Hobby = ({ description, lang, meta, title }) => {
  const posts = useStaticQuery(
    graphql`
      query {
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
  )

  return (
    <div id="hobby" className="listbox">
      {posts.allMarkdownRemark.edges.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug

        if (node.frontmatter.tag.includes('hobby')) {
          return (
            <Link to={node.fields.slug} key={node.fields.slug}>
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
  )
}

export default Hobby
