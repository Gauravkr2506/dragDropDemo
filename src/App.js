import React from "react";

import "./App.css";
import ListItem from "./components/list";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draggable: false,
      data: [
        { text: "1", key: "sd" },
        { text: "2", key: "df", child: [{ text: "3", key: "gd" }] },
        { text: "4", key: "nh", child: [{ text: "5", key: "vd" }] },
      ],
    };
    this.addStandard = this.addStandard.bind(this);
  }

  addStandard() {
    const { data } = this.state;
    let key = Math.random().toString(36).substr(2, 7);
    if (data.length === 0) {
      this.setState({ data: [{ text: "", key }] });
      return;
    }

    let last_parent = data[data.length - 1];
    if (!last_parent.child || last_parent.child.length === 0) {
      this.setState({ data: [...data, { text: "", key }] });
      return;
    }

    let last_child = last_parent.child[last_parent.child.length - 1];
    if (!last_child.sub_child || last_child.sub_child.length === 0) {
      data[data.length - 1].child.push({ text: "", key });
      this.setState({ data });
      return;
    }
    data[data.length - 1].child[
      data[data.length - 1].child.length - 1
    ].sub_child.push({
      text: "",
      key,
    });
    this.setState({ data });
  }

  deleteParent(parent_index) {
    const { data } = this.state;
    data.splice(parent_index, 1);
    this.setState({ data });
  }

  deleteChild(parent_index, child_index) {
    const { data } = this.state;
    data[parent_index].child.splice(child_index, 1);
    this.setState({ data });
  }
  deleteSubChild(parent_index, child_index, sub_child_index) {
    const { data } = this.state;
    data[parent_index].child[child_index].sub_child.splice(sub_child_index, 1);
    this.setState({ data });
  }

  onChangeParent(parent_index, value) {
    const { data } = this.state;
    data[parent_index].text = value;
    this.setState({ data });
  }
  onChangChild(parent_index, child_index, value) {
    const { data } = this.state;
    data[parent_index].child[child_index].text = value;
    this.setState({ data });
  }

  onChangSubChild(parent_index, child_index, sub_child_index, value) {
    const { data } = this.state;
    data[parent_index].child[child_index].sub_child[
      sub_child_index
    ].text = value;
    this.setState({ data });
  }

  parentIndent(parent_index) {
    const { data } = this.state;
    if (parent_index !== data.length - 1) {
      return;
    }
    if (!!data[parent_index].child && data[parent_index].child.length > 0) {
      return;
    }
    let parent_data = data.splice(parent_index, 1);
    if (data[parent_index - 1].child) {
      data[parent_index - 1].child.push(parent_data[0]);
    } else {
      data[parent_index - 1].child = parent_data;
    }

    this.setState({ data });
  }

  childIndent(parent_index, child_index) {
    const { data } = this.state;
    if (child_index === 0) {
      return;
    }
    if (
      !!data[parent_index].child[child_index].sub_child &&
      data[parent_index].child[child_index].sub_child.length > 0
    ) {
      return;
    }

    let child_data = data[parent_index].child.splice(child_index, 1);
    if (data[parent_index].child[child_index - 1].sub_child) {
      data[parent_index].child[child_index - 1].sub_child.push(child_data[0]);
    } else {
      data[parent_index].child[child_index - 1].sub_child = child_data;
    }

    this.setState({ data });
  }

  childOutdent(parent_index, child_index) {
    const { data } = this.state;

    if (data[parent_index].child.length - 1 === child_index) {
      if (
        data[parent_index].child[child_index].sub_child &&
        data[parent_index].child[child_index].sub_child.length > 0
      ) {
        return;
      }
      let child = data[parent_index].child[child_index];
      data[parent_index].child.splice(child_index, 1);
      data.push(child);
      this.setState({ data });
      return;
    }
    if (
      child_index !== 0 ||
      data[parent_index].child.length > 1 ||
      (data[parent_index].child[0].sub_child &&
        Array.isArray(data[parent_index].child[0].sub_child) &&
        data[parent_index].child[0].sub_child.length > 0)
    ) {
      return;
    }
    let child = data[parent_index].child[child_index];
    data[parent_index].child = undefined;
    data.push(child);
    this.setState({ data });
  }
  subChildOutdent(parent_index, child_index, sub_child_index) {
    const { data } = this.state;
    if (
      sub_child_index !== 0 ||
      data[parent_index].child[child_index].sub_child.length > 1
    ) {
      return;
    }

    let sub_child = data[parent_index].child[child_index].sub_child[0];
    data[parent_index].child[child_index].sub_child = undefined;
    data[parent_index].child.push(sub_child);
    this.setState({ data });
  }

  onParentDragOver(e, parent_index) {
    console.log("dragOver:parent-> ", parent_index);
    e.preventDefault();
  }
  onChildDragOver(e, parent_index, child_index) {
    console.log(
      "dragOver:parent-> " + parent_index,
      "dragOver:child-> " + child_index
    );
    e.preventDefault();
  }
  onSubChildDragOver(e, parent_index, child_index, sub_child_index) {
    console.log(
      "dragOver:parent-> " + parent_index,
      "dragOver:child-> " + child_index,
      "dragOver:sub child-> " + sub_child_index
    );
    e.preventDefault();
  }

  parentDragStart(e, parent_index) {
    console.log("dragStart:parent-> ", parent_index);
    e.dataTransfer.setData("start_parent_index", parent_index);
    e.dataTransfer.setData("start_child_index", "");
    e.dataTransfer.setData("start_sub_child_index", "");
  }
  childDragStart(e, parent_index, child_index) {
    console.log("dragStart:parent-> ", parent_index);
    console.log("dragStart:child-> ", child_index);
    e.dataTransfer.setData("start_parent_index", parent_index);
    e.dataTransfer.setData("start_child_index", child_index);
    e.dataTransfer.setData("start_sub_child_index", "");
    e.stopPropagation();
  }
  subChildDragStart(e, parent_index, child_index, sub_child_index) {
    console.log("dragStart:parent-> ", parent_index);
    console.log("dragStart:child-> ", child_index);
    console.log("dragStart:sub child-> ", sub_child_index);
    e.dataTransfer.setData("start_parent_index", parent_index);
    e.dataTransfer.setData("start_child_index", child_index);
    e.dataTransfer.setData("start_sub_child_index", sub_child_index);
    e.stopPropagation();
  }
  parentDrop(e, parent_index) {
    const { data } = this.state;
    let start_parent_index = e.dataTransfer.getData("start_parent_index");
    let start_child_index = e.dataTransfer.getData("start_child_index");
    let start_sub_child_index = e.dataTransfer.getData("start_sub_child_index");

    if (!!start_sub_child_index) {
      return;
    }

    if (!!start_parent_index && !!start_child_index) {
      let new_child = data[start_parent_index].child.splice(
        start_child_index,
        1
      )[0];
      if (!!data[parent_index].child) {
        data[parent_index].child.unshift(new_child);
      } else {
        data[parent_index].child = [new_child];
      }
    } else if (!!start_parent_index) {
      if (parent_index > start_parent_index) {
        let new_parent = data.splice(start_parent_index, 1)[0];
        data.splice(parent_index, 0, new_parent);
      } else if (parent_index < start_parent_index) {
        let new_parent = data.splice(start_parent_index, 1)[0];
        data.splice(parent_index - 1, 0, new_parent);
      }
      this.setState({ data });
    }
    this.setState({ draggable: false });
  }

  childDrop(e, parent_index, child_index) {
    const { data } = this.state;
    let start_parent_index = e.dataTransfer.getData("start_parent_index");
    let start_child_index = e.dataTransfer.getData("start_child_index");
    let start_sub_child_index = e.dataTransfer.getData("start_sub_child_index");

    if (!!!start_child_index) {
      return;
    }

    if (!!start_sub_child_index && !!start_child_index) {
      let new_sub_child = data[start_parent_index].child[
        start_child_index
      ].sub_child.splice(start_sub_child_index, 1)[0];
      if (!!data[parent_index].child[start_child_index].sub_child) {
        data[parent_index].child[start_child_index].sub_child.unshift(
          new_sub_child
        );
      } else {
        data[parent_index].child[start_child_index].sub_child = [new_sub_child];
      }
    } else if (!!start_child_index) {
      let new_child = data[start_parent_index].child.splice(
        start_child_index,
        1
      )[0];

      if (parent_index === start_parent_index) {
        if (child_index > start_child_index) {
          data[parent_index].child.splice(child_index - 1, 0, new_child);
        } else if (parent_index < start_parent_index) {
          data[parent_index].child.splice(parent_index, 0, new_child);
        }
      } else {
        data[parent_index].child.push(new_child);
      }

      this.setState({ data });
    }
    this.setState({ draggable: false });
    e.stopPropagation();
  }

  subChildDrop(e, parent_index, child_index, sub_child_index) {
    const { data } = this.state;
    let start_parent_index = e.dataTransfer.getData("start_parent_index");
    let start_child_index = e.dataTransfer.getData("start_child_index");
    let start_sub_child_index = e.dataTransfer.getData("start_sub_child_index");

    if (!!!start_child_index) {
      return;
    }
    let new_sub_child = data[start_parent_index].child[
      start_child_index
    ].sub_child.splice(start_sub_child_index, 1)[0];

    if (
      parent_index === start_parent_index &&
      child_index === start_child_index
    ) {
      if (sub_child_index < start_child_index) {
        data[parent_index].child[start_child_index].sub_child.splice(
          sub_child_index,
          0,
          new_sub_child
        );
      } else if (sub_child_index > start_child_index) {
        data[parent_index].child[start_child_index].sub_child.splice(
          sub_child_index - 1,
          0,
          new_sub_child
        );
      }
    } else {
      data[parent_index].child[start_child_index].sub_child.push(new_sub_child);
    }

    this.setState({ draggable: false });
    e.stopPropagation();
  }

  render() {
    const { data, draggable } = this.state;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            marginTop: 70,
            width: "90%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              borderBottom: 1,
              borderBottomColor: "#d9d9d9",
              borderBottomStyle: "solid",
              color: "#b2b2b2",
            }}
          >
            <h3>MATHEMATICS</h3>
          </div>

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
                //  backgroundColor: "red",
                height: 60,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>
                <h6 style={{ marginBottom: 0 }}>Actions</h6>
                <span className="span">Move, Indent, Outdent, Delete</span>
              </div>
            </div>
            <div
              style={{
                flex: 4,
                // backgroundColor: "yellow",
                height: 60,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ marginLeft: 70 }}>
                <h6 style={{ marginBottom: 0 }}>Standard</h6>
                <span className="span">The text of the standard</span>
              </div>
            </div>
          </div>
          {data.map(
            (obj, parent_index) => (
              <div
                key={obj.key + "/" + parent_index}
                draggable={draggable}
                onDragOver={(e) => this.onParentDragOver(e, parent_index)}
                onDragStart={(e) => this.parentDragStart(e, parent_index)}
                onDrop={(e) => this.parentDrop(e, parent_index)}
              >
                <ListItem
                  onMouseDown={() => this.setState({ draggable: true })}
                  onMouseUp={() => this.setState({ draggable: false })}
                  indent={() => this.parentIndent(parent_index)}
                  list_type="parent"
                  key={obj.key + "/" + parent_index}
                  onChange={(e) =>
                    this.onChangeParent(parent_index, e.target.value)
                  }
                  {...obj}
                  deleteStandard={() => this.deleteParent(parent_index)}
                />
                {Array.isArray(obj.child) &&
                  obj.child.map(
                    (obj_2, child_index) => (
                      <div
                        key={obj_2.key + "/" + parent_index + "/" + child_index}
                        draggable={draggable}
                        onDragOver={(e) =>
                          this.onChildDragOver(e, parent_index, child_index)
                        }
                        onDragStart={(e) =>
                          this.childDragStart(e, parent_index, child_index)
                        }
                        onDrop={(e) =>
                          this.childDrop(e, parent_index, child_index)
                        }
                      >
                        <ListItem
                          onMouseDown={() => this.setState({ draggable: true })}
                          onMouseUp={() => this.setState({ draggable: false })}
                          indent={() =>
                            this.childIndent(parent_index, child_index)
                          }
                          outdent={() =>
                            this.childOutdent(parent_index, child_index)
                          }
                          list_type="child"
                          key={
                            obj_2.key + "/" + parent_index + "/" + child_index
                          }
                          onChange={(e) =>
                            this.onChangChild(
                              parent_index,
                              child_index,
                              e.target.value
                            )
                          }
                          {...obj_2}
                          deleteStandard={() =>
                            this.deleteChild(parent_index, child_index)
                          }
                        />
                        {Array.isArray(obj_2.sub_child) &&
                          obj_2.sub_child.map(
                            (obj_3, sub_child_index) => (
                              <div
                                key={
                                  obj_3.key +
                                  "/" +
                                  parent_index +
                                  "/" +
                                  child_index +
                                  "/" +
                                  sub_child_index
                                }
                                draggable={draggable}
                                onDragOver={(e) =>
                                  this.onSubChildDragOver(
                                    e,
                                    parent_index,
                                    child_index,
                                    sub_child_index
                                  )
                                }
                                onDragStart={(e) =>
                                  this.subChildDragStart(
                                    e,
                                    parent_index,
                                    child_index,
                                    sub_child_index
                                  )
                                }
                                onDrop={(e) =>
                                  this.subChildDrop(
                                    e,
                                    parent_index,
                                    child_index,
                                    sub_child_index
                                  )
                                }
                              >
                                <ListItem
                                  onMouseDown={() =>
                                    this.setState({ draggable: true })
                                  }
                                  onMouseUp={() =>
                                    this.setState({ draggable: false })
                                  }
                                  indent={() => {}}
                                  outdent={() =>
                                    this.subChildOutdent(
                                      parent_index,
                                      child_index,
                                      sub_child_index
                                    )
                                  }
                                  list_type="sub_child"
                                  key={
                                    obj_3.key +
                                    "/" +
                                    parent_index +
                                    "/" +
                                    child_index +
                                    "/" +
                                    sub_child_index
                                  }
                                  onChange={(e) =>
                                    this.onChangSubChild(
                                      parent_index,
                                      child_index,
                                      sub_child_index,
                                      e.target.value
                                    )
                                  }
                                  {...obj_3}
                                  deleteStandard={() =>
                                    this.deleteSubChild(
                                      parent_index,
                                      child_index,
                                      sub_child_index
                                    )
                                  }
                                />
                              </div>
                            ),
                            this
                          )}
                      </div>
                    ),
                    this
                  )}
              </div>
            ),
            this
          )}

          <button
            onClick={this.addStandard}
            style={{ marginTop: 20 }}
            type="button"
            class="btn btn-primary"
          >
            Add a standard
          </button>
        </div>
      </div>
    );
  }
}

export default App;
