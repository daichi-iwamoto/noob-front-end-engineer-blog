import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header
  let contact

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
          &nbsp;
          <span className="shake-crazy" role="img">&#x1f92a;</span>
        </Link>
      </h1>
    )
  } else {
    header = (
      <p
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </p>
    )
  }

  if (location.pathname === rootPath) {
    contact = (
    <div className="profile-box">
      <div className="profile-img">
        <img src="/logo.jpg" alt="プロフィール画像"/>
      </div>
      <p>
        とこしえのひよっこフロントエンジニアによる技術ブログ<br />
        主にフロントエンドまわりの記事を書いています。<br />
        読んだ小説の記録もつけ始めました。
      </p>
      <p className="contact-btn">
        <Link
          to={`/contact/`}
        >
          CONTACT
        </Link>
      </p>
    </div>
    )
  } else if (location.pathname === '/contact/') {
    contact = (
    <div className="profile-box contact">
      <div className="profile-img">
        <img src="/logo.jpg" alt="プロフィール画像"/>
      </div>
      <p>
        フロントエンドエンジニアの「だいち」です。<br />
        記事についての質問や、ご指摘お待ちしてます。
      </p>
    </div>
    )
  } else {
    contact = (
    <p className="head-contact">
      <Link
        to={`/contact/`}
      >
        CONTACT
      </Link>
    </p>
    )
  }

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(28),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>
        {header}
        {contact}
      </header>
      <main>{children}</main>
      <footer>
        {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
