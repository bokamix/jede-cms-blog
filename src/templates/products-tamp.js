import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import styled from 'styled-components'

export const ProductTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  gallery,
}) => {
  const PostContent = contentComponent || Content

  const DescriptionStyle = styled.p` 
  color:red; `

const H1Styled = styled.h1`
color:green !important;
`
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <H1Styled className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </H1Styled>
        
          {gallery &&
          gallery.map(({ photo, name}) => (
               <img src={photo} alt={name}/>
          ))}
            <DescriptionStyle>{description}</DescriptionStyle>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

ProductTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const ProductData = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ProductTemplate
        content={post.html}
        contentComponent={HTMLContent}
        gallery={post.frontmatter.gallery}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

ProductData.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ProductData

export const pageQuery = graphql`
  query ProductDataByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
             
        tags
      }
    }
  }
`
