import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostLinkItem from "../components/post-link-item"
import Pagination from "../components/Pagination/Pagination"
import SEO from "../components/seo"

const IndexTemplate = props => {
  const Posts = props.data.allMarkdownRemark.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostLinkItem key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div>{Posts}</div>
      // Pagination関数の実行
      <Pagination props={props} />
    </Layout>
  )
}
