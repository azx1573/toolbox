import React, { useEffect, useState } from "react";
import { useLocation } from "umi";
import { Row, Col, Button } from "antd";
import { addressList } from "./config";
import errGif from "./image/error.gif";
import "./index.less";

export default function Index({ onReset }) {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location);

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  useEffect(() => {
    if (location !== prevLocation) {
      handleReset();
      setPrevLocation(location);
    }
  }, [location]);

  const errGifImg = `${errGif}?${new Date()} `;

  return (
    <div className="errPage-container">
      <Row gutter={30}>
        <Col span={12}>
          <h1 className="text-jumbo text-ginormous">Oops!</h1>

          <h2>尊贵的上帝，请您先别着急</h2>

          <h2>系统可能出现了一些令人悲伤的错误😭</h2>

          <div className="err-page-tips">
            <div style={{ color: "#337885", fontSize: 13 }}>
              小码哥正在火速赶来的路上~~~
            </div>
            <div>
              <Button
                type="link"
                style={{ paddingLeft: 0, fontSize: 13 }}
                onClick={handleReset}
              >
                您可以尝试重试刷新
              </Button>
            </div>
            <div style={{ color: "#337885", fontSize: 13 }}>
              或者联系如下童鞋
            </div>
          </div>

          <p>
            {addressList.map((v) => (
              <h6 key={v.enName}>{`${v.enName}/${v.cnName}`}</h6>
            ))}
          </p>
        </Col>

        <Col span={12} style={{ textAlign: "right" }}>
          <img
            src={errGifImg}
            width="313"
            height="428"
            alt="Girl has dropped her ice cream."
          />
        </Col>
      </Row>
    </div>
  );
}
