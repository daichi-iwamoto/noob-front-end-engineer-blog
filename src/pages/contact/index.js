import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <div className="contact">
        <SEO title="Contact" />
        <section>
          <form name="contact" netlify action="/contact/thanks/">
            <p>
              <label>
                Name <input type="text" name="name" />
              </label>
            </p>
            <p>
              <label>
                Email <input type="email" name="email" />
              </label>
            </p>
            <p>
              <label>
                Message <input type="textarea" name="message" />
              </label>
            </p>
            <p>
              <button type="submit">Send</button>
            </p>
          </form>
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
