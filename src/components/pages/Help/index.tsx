import React from "react";
import { Route, Link } from "react-router-dom";
import useReactRouter from "use-react-router";

import { BalloonButton } from "./../../atoms/BalloonButtom";
import { Button } from "./../../atoms/Button";
import { PageTemplate } from "./../Template";
import styles from "./Help.module.scss";
import img1 from "../../../assets/img/help1.png";
import img2 from "../../../assets/img/help2.png";
import img3 from "../../../assets/img/help3.png";
import img4 from "../../../assets/img/help4.png";
import imgT from "../../../assets/img/twitter.png";

export const Help: React.FC<{}> = () => {
  const { history } = useReactRouter();
  return (
    <PageTemplate>
      <div className={styles.title}>ヘルプページ</div>
      <Route exact path="/help" component={HelpList}></Route>
      <Route path="/help/walk-through/:id" component={HelpPage}></Route>
      <Route path="/help/info" component={HelpInfo}></Route>
      <BalloonButton
        label="Home"
        onClick={() => {
          history.push("/");
        }}
        isEmpha={false}
        LorR="left"
      ></BalloonButton>
    </PageTemplate>
  );
};

const list = [
  {
    title: "魔法陣とは",
    body:
      "３×３のマスに１～９の数字が一回ずつ当てはまり、縦・横・斜めのそれぞれの３マスの合計がどれも同じになるように配置されています。"
  },
  {
    title: "解き方のコツ(合計)",
    body: "一列の合計はどの魔法陣でも同じです。"
  },
  {
    title: "解き方のコツ(中央)",
    body: "中央のマスはどの魔法陣でも同じです。"
  },
  {
    title: "解き方のコツ(ペア)",
    body: "中央のマスを挟んだ２つのペアの合計は１０になります。"
  }
];

const HelpList: React.FC<{}> = () => {
  const howtoplayList = list.map((value, index) => {
    return (
      <Link
        key={index}
        to={`/help/walk-through/${index}`}
        className={styles.link}
      >
        {index}. {value.title}
      </Link>
    );
  });

  return (
    <div>
      <div className={styles.help_list}>
        <div className={styles.link_title}>攻略方法</div>
        <div>{howtoplayList}</div>
      </div>
      <Link to="/help/info" className={styles.info_link}>
        Magic Squareについて
      </Link>
    </div>
  );
};

const HelpPage: React.FC<{}> = (pr: any) => {
  const { history } = useReactRouter();
  const id = pr.match.params.id;

  const changeBtn = list.map((value, index) => {
    return (
      <Button
        key={index}
        label={"" + index}
        onClick={() => {
          history.push(`/help/walk-through/${index}`);
        }}
      />
    );
  });

  const img = [
    <img src={img1} style={{ width: "100%" }}></img>,
    <img src={img2} style={{ width: "100%" }}></img>,
    <img src={img3} style={{ width: "100%" }}></img>,
    <img src={img4} style={{ width: "100%" }}></img>
  ];

  return (
    <div>
      <div className={styles.help_list}>
        <div className={styles.link_title}>
          {id}. {list[id].title}
        </div>
        <div>{list[id].body}</div>
        <div style={{ padding: "1rem" }}>{img[id]}</div>
        <a
          href={`https://syakoo.hatenablog.com/entry/2019/08/30/124844#${id}`}
          className={styles.link}
        >
          解説ページ(はてなブログ)
        </a>
      </div>
      {changeBtn}
      <br />
      <Button
        label="ヘルプページTopへ"
        onClick={() => history.push("/help")}
      ></Button>
    </div>
  );
};

const HelpInfo: React.FC<{}> = () => {
  const { history } = useReactRouter();
  return (
    <div>
      <div className={styles.help_list}>
        <div className={styles.link_title}>Magic Square</div>
        <div>
          <div className={styles.ver}>ver 2.0</div>
          レベル選択を実装、UIの変更、データベースの変更
        </div>
        <div>
          <div className={styles.ver}>ver 1.1</div>
          ヘルプページの追加
        </div>
        <div>
          <div className={styles.ver}>ver 1.0</div>
          リリース
        </div>
      </div>
      <div className={styles.help_list}>
        <div
          className={styles.link_title}
          style={{ borderBottom: "1px solid #white" }}
        >
          STAFF
        </div>
        <div>
          PRODUCED BY : syakoo{" "}
          <a href="https://twitter.com/sako_data" title="twitter">
            <img src={imgT} className={styles.twitter}></img>
          </a>
          <br />
          DESIGNED BY : 悠凪れいね{" "}
          <a href="https://twitter.com/yunagi_reine_" title="twitter">
            <img src={imgT} className={styles.twitter}></img>
          </a>
        </div>
      </div>
      <Button
        label="ヘルプページTopへ"
        onClick={() => history.push("/help")}
      ></Button>
    </div>
  );
};
