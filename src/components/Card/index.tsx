/*
 * @Author: shawbowang
 * @Date: 2023-02-18 21:51:09
 * @LastEditTime: 2023-02-23 21:33:30
 * @LastEditors: shawbowang
 * @Description: 
 * @FilePath: /blog/src/components/Card/index.tsx
 */
import {h, Fragment } from 'preact';
import './index.scss';

export interface ICard {
  cardName: string;
  imgSrc?: string;
  label: string;
  label2?: string;
  path: string;
}

export default function Card({ cardName, imgSrc, label, label2, path }: ICard) {
  const onClick = () => {
    console.log(111);
    location.href = `/draft${path}`;
  }
  return (
    <div className="userCard"
      onClick={onClick}
    >
      <div class="cardHeader">
        <div class="userName">
          {cardName}
        </div>
      </div>
      {imgSrc ? <img class="styledImg" src={imgSrc} /> : null}
      <div class="infoContainer">
        <div class="infoLabel">{label}</div>
        {label2 ? <div class="infoLabel">{label2}</div> : null}
      </div>
    </div>
  );
};
