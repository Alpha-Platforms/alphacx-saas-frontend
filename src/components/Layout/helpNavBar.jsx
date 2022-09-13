/* eslint-disable react/prop-types */
import React from 'react';
import { css } from '@emotion/css';
import { useScrollDetect } from '../helpers/helpers';
import './helpnav.scss';
import { kbBrandKit } from '../../helper';
// import { Link } from 'react-router-dom';
// import ManImg from '../../assets/images/man.jpg';

function HelpNavBar({ activeBG }) {
    const { shadow: scroll } = useScrollDetect();
    return (
        <div
            className={`help-nav  ${
                scroll || activeBG
                    ? `onScroll ${css(
                          `background-image: linear-gradient(${kbBrandKit({ bgCol: 0 })?.backgroundColor}1a, ${
                              kbBrandKit({ bgCol: 0 })?.backgroundColor
                          }1a), linear-gradient(#FFF, #FFF); border-bottom: solid 1px ${
                            kbBrandKit({ bgCol: 0 })?.backgroundColor
                        }40`,
                      )}`
                    : ''
            }`}
        >
            <div className="logo">
                <img src={kbBrandKit(['logo'])[0]} alt="" />
            </div>
        </div>
    );
}

export default HelpNavBar;
