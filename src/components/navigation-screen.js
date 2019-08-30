import React from 'react';
import IconButton from './IconButton';
import GitHubLogo from "../images/github-logo.svg";
import DribbbleLogo from "../images/dribbble.svg";
import { Link } from "gatsby";

function NavigationScreen({ isVisible, closeNavigation }) {

    if (isVisible)
        return (
            <div className="navigation-screen">
                <div className="container">
                    <div className="flex-col">
                        {
                            /**
                             * Top bar
                             */
                        }
                        <div className="top-bar">
                            <IconButton onClick={closeNavigation}>clear</IconButton>
                            <div className="flex-expand"></div>
                            <a href="https://github.com/haxzie" target="_blank" rel="noopener noreferrer">
                                <img className="logo-button" src={GitHubLogo} alt="github link" />
                            </a>
                            <a href="https://dribbble.com/haxzie" target="_blank" rel="noopener noreferrer">
                                <img className="logo-button" src={DribbbleLogo} alt="dribbble link" />
                            </a>
                        </div>
                        {
                            /**
                             * Nav contents
                             */
                        }
                        <div className="flex-row">
                            <div className="flex-col">
                                <ul className="navigation-items">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/blog">Blog</a></li>
                                    <li><a href="https://github.com/haxzie">GitHub</a></li>
                                    <li><a href="https://twitter.com/haxzie_">Twitter</a></li>
                                    <li><a href="https://linkedin.com/in/haxzie">LinkedIn</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    else return <></>
}

export default NavigationScreen
