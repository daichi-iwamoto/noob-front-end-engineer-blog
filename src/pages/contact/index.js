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
          <form method="post" name="contact" data-netlify="true" data-netlify-honeypot="bot-field" action="/contact/thanks/">
            <input type="hidden" name="form-name" value="contact" />
            <p>
              <label htmlFor="name">
                Name
              </label>
              <input type="text" name="name" />
            </p>
            <p>
              <label htmlFor="email">
                Email
              </label>
              <input type="email" name="email" />
            </p>
            <p>
              <label htmlFor="textarea">
                Message
              </label>
              <input type="textarea" name="message" />
            </p>
            <p className="submit">
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
