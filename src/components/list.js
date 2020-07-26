import React, { Component } from "react";
import {
  IoMdMove,
  IoMdArrowBack,
  IoMdArrowForward,
  IoMdTrash,
} from "react-icons/io";

const list_style = {
  parent: { marginLeft: 0, color: "#0061ff", fontSize: "x-large" },
  child: { marginLeft: 30, color: "#000", fontSize: "unset" },
  sub_child: { marginLeft: 60, color: "#737373", fontSize: "x-small" },
};

export default class ListComponent extends Component {
  render() {
    const { list_type } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: 0,
          borderBottom: 1,
          borderBottomColor: "#d9d9d9",
          borderBottomStyle: "solid",
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: "#e6f2ff",
            height: 60,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "100%",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IoMdMove
              onMouseDown={this.props.onMouseDown}
              touchstart={this.props.onMouseDown}
              // onMouseUp={this.props.onMouseUp}
              className="icon"
              title="move"
              style={{ marginRight: 10 }}
              size="25"
            />
            <IoMdArrowBack
              onClick={this.props.outdent}
              className="icon"
              title="outdent"
              style={{ marginRight: 10 }}
              size="25"
            />
            <IoMdArrowForward
              onClick={this.props.indent}
              className="icon"
              title="indent"
              style={{ marginRight: 10 }}
              size="25"
            />
            <IoMdTrash
              className="icon"
              title="delete"
              onClick={this.props.deleteStandard}
              style={{ marginRight: 10 }}
              size="25"
            />
          </div>
        </div>
        <div
          style={{
            flex: 6,
            backgroundColor: "#e6f2ff",
            height: 60,
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                flex: 1,
                height: 60,
                backgroundColor: "#add6ff",
                marginLeft: list_style[list_type].marginLeft,
              }}
            ></div>
            <div
              style={{
                flex: 15,
                height: 60,
                marginLeft: 70,
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                placeholder="Type standard here (e.g. Numbers)"
                className="input"
                type="text"
                style={{
                  width: 700,
                  color: list_style[list_type].color,
                  fontSize: list_style[list_type].fontSize,
                }}
                onChange={this.props.onChange}
                value={this.props.text}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
