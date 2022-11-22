import React from 'react';

type Props = {};

function Header({}: Props) {
  return (
    <div className="header">
      <header>
        <div className="container">
          <div className="left">
            <div className="leftSide">
              <div className="menuToggle">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <a href="/">JSE</a>
            </div>
            <div className="categories">
              <span>Categories</span>
              <div className="arrowDownIcon"></div>
            </div>
          </div>
          <div className="searchForm">
            <form action="" method="get">
              <input
                type="text"
                name="search"
                id="searchInput"
                className="form-input"
                autoComplete="off"
                placeholder="Search Jobs..."
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
              <div className="autocompleteList">
                <div className="list">Front end Developer</div>
                <div className="list">Web Developer</div>
                <div className="list">Back end Developer</div>
                <div className="list">Front end Developer</div>
                <div className="list">Software Engineer</div>
              </div>
            </form>
          </div>
          <div className="account">
            <a href="/login.html" className="login">
              Login
            </a>
            <div className="orSymbol">|</div>
            <a href="/sign_up.html" className="signup">
              Sign&nbsp;Up
            </a>
          </div>
        </div>
      </header>
      <nav>
        <ul>
          <li>
            <a href="#">Front End Developer</a>
          </li>
          <li>
            <a href="#">Backend Developer</a>
          </li>
          <li>
            <a href="#">Full Stack Developer</a>
          </li>
          <li>
            <a href="#">Software Engineer</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
