/** @jsxImportSource solid-js */
import { onMount, type Component } from 'solid-js';
import classNames from 'classnames';

import styles from './WeddingInvitation.module.scss';
import Slider from './Slider';

const image1 = 'https://media.istockphoto.com/id/1136437406/zh/%E7%85%A7%E7%89%87/%E4%B8%89%E8%97%A9%E5%B8%82%E5%A4%A9%E9%9A%9B%E7%B7%9A%E8%88%87%E5%A5%A7%E5%85%8B%E8%98%AD%E7%81%A3%E5%A4%A7%E6%A9%8B%E5%9C%A8%E6%97%A5%E8%90%BD-%E5%8A%A0%E5%88%A9%E7%A6%8F%E5%B0%BC%E4%BA%9E%E5%B7%9E-%E7%BE%8E%E5%9C%8B.jpg?s=2048x2048&w=is&k=20&c=fycaGDKgsYkHb648nr5XPOAkTu85FQB03DFWwlW5WyQ=';
const image2 = 'https://thumbor.4gamers.com.tw/wG25c91fyaJeIBN8XSTzH16q-RM=/adaptive-fit-in/1200x1200/filters:no_upscale():extract_cover():format(jpeg):quality(85)/https%3A%2F%2Fugc-media.4gamers.com.tw%2Fpuku-prod-zh%2Fanonymous-story%2Fd3a5085e-2ef8-4235-a3ee-058b0fd212c2.jpg';
const image3 = 'https://p0.itc.cn/images01/20231106/23c143b5fdbc419c86ddb2b0f5b6f831.jpeg';

const TencentMap = () => {
  let mapContainer: any;
  onMount(() => {
    const script = document.createElement("script");
    script.src = `https://map.qq.com/api/gljs?v=1.exp&key=G7PBZ-J733C-MAN2U-AK7ST-MYGEK-W3FQ5`;
    script.onload = () => {
      const map = new window.TMap.Map(mapContainer, {
        center: new window.TMap.LatLng(27.797349,112.972599), // 湘潭的经纬度
        zoom: 19,
      });

      // 添加标记
      new window.TMap.MultiMarker({
        map: map,
        geometries: [
          {
            id: "marker",
            position: new window.TMap.LatLng(27.797349,112.972599),
            properties: {
              title: "湖南省湘潭市湘潭县滨江路江湾广场12栋246号",
            },
          },
        ],
      });
    };
    document.head.appendChild(script);
  })
  return <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />;
}

const slides = [
  <TencentMap />,
  <div class={classNames(styles.slice)}>
    <img src={image1} class={styles.img} alt="Slide 1" />
  </div>,
  <div class={classNames(styles.flip, styles.img)}>
    <img class={styles.img} src={image2} alt="Slide 2" />
  </div>,
  <div class={classNames(styles.blinds, styles.img)}>
    <img src={image3} class={styles.img} alt="Slide 3" />
  </div>,
];

const WeddingInvitation: Component = () => {
  return <div class={styles.container}>
    <Slider slides={slides} />
  </div>;
};

export default WeddingInvitation;