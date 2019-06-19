import React from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";
import {
  Form,
  Button,
  Container,
  Menu,
  Sidebar,
  Segment,
  Icon,
  Header
} from "semantic-ui-react";
import autoBind from "auto-bind";
import ModalModalExample from "./ModalExample";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";

const columns = [
  { key: "name", name: "Name" },
  { key: "country", name: "Country" },
  { key: "group", name: "Group" }
];
const rows = [
  { name: "James", country: "Taiwan", group: "A" },
  { name: "Gary", country: "Japan", group: "A" },
  { name: "Dan", country: "America", group: "B" },
  { name: "Lucy", country: "France", group: "B" }
];

const emptyGroup = [[], [], [], []];

var group = [[], [], [], []];

const names = [
  "Mark",
  "Lily",
  "Ann",
  "Scott",
  "Cody",
  "Frank",
  "Angle",
  "Peter",
  "Jack",
  "Kevin"
];

const player = [
  "Mark",
  "Lily",
  "Ann",
  "Scott",
  "Cody",
  "Frank",
  "Angle",
  "Peter",
  "Jack",
  "Kevin"
];
const options = [
  { key: 1, text: "Choice 1", value: 1 },
  { key: 2, text: "Choice 2", value: 2 },
  { key: 3, text: "Choice 3", value: 3 }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows,
      visible: false,
      name: "",
      country: "",
      group: "",
      rowSize: 4,
      newGroup: []
    };
    autoBind(this);
  }
  handleSidebarHide = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleName(event) {
    this.setState({ name: event.target.value });
  }
  handleCountry(event) {
    this.setState({ country: event.target.value });
  }
  handleGroup(event) {
    this.setState({ group: event.target.value });
  }
  handleSubmit(event) {
    console.log("handle submit is called");
    event.preventDefault();

    const temp = {
      name: this.state.name,
      country: this.state.country,
      group: this.state.group
    };
    console.log("temp", temp);
    this.state.rows.push(temp);
    this.setState({ rowSize: this.state.rowSize + 1 });
    console.log("rows", rows);
    //const { list, item } = this.state;
    //e.preventDefault();
    //this.setState({ list: [...list, item] });
  }
  handleRandom(event) {
    console.log("clear group", group);
    this.assignGroup(player, [[], [], [], []]);
  }
  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  //Fisher–Yates Shuffle
  //url：https://bost.ocks.org/mike/shuffle/
  shuffle = array => {
    var m = array.length,
      t,
      i;
    console.log("m", m);
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m]; // 缓存当前的第 m 位
      array[m] = array[i]; // 随机 m 之前某位放进 m
      array[i] = t; // 第随机位换成 m 位的值（后续还会被取到）
    }
    return array;
  };

  assignGroup = (arr, group) => {
    console.time("T1");
    // var date3=new Date();  //开始时间
    var size = group.length; // 分多少组
    var length = arr.length; // 人数总长度

    // 随机洗牌
    this.shuffle(arr);

    for (var i = 0; i < length; i++) {
      group[i % size].push(arr[i]); // 入组
    }

    this.shuffle(group); //随机排序数组

    // console.log(group);
    // var date4=new Date();    //结束时间
    // console.log(date4.getTime()-date3.getTime());
    console.timeEnd("T1");
    console.log("Fisher–Yates Shuffle");
    console.log("group", group);

    this.setState({ newGroup: group });
    console.log("this.state.newGroup", this.state.newGroup);
    //return group;
  };

  render() {
    return (
      <div className="App">
        <Container>
          <Menu>
            <Button
              disabled={this.state.visible}
              onClick={this.handleShowClick}
            >
              Show sidebar
            </Button>
          </Menu>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="push"
              direction="left"
              icon="labeled"
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={this.state.visible}
              width="thin"
            >
              <Menu.Item as="a">
                <Icon name="home" />
                Home
              </Menu.Item>
              <Menu.Item as="a">
                <ModalModalExample />
              </Menu.Item>
              <Menu.Item as="a">
                <Icon name="camera" />
                Channels
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Header as="h3">Application Content</Header>
                <h1>Random Assign</h1>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      label="Name"
                      placeholder="Name"
                      onChange={this.handleName}
                      //value={this.state.name}
                    />
                    <Form.Input
                      fluid
                      label="Country"
                      placeholder="Country"
                      onChange={this.handleCountry}
                      //value={this.state.country}
                    />
                    <Form.Input
                      fluid
                      label="Group"
                      placeholder="Group"
                      onChange={this.handleGroup}
                      //value={this.state.name}
                    />
                  </Form.Group>
                  <Button type="submit">Submit</Button>
                </Form>
                <h3>Before</h3>
                {names}
                <h3>After</h3>
                {this.state.newGroup[0]}/{this.state.newGroup[1]}/
                {this.state.newGroup[2]}/{this.state.newGroup[3]}
                <h2>Random</h2>
                <Button type="submit" onClick={this.handleRandom}>
                  Randomize
                </Button>
                <h3>Start editing to see some magic happen!</h3>
                <ReactDataGrid
                  columns={columns}
                  rowGetter={i => this.state.rows[i]}
                  rowsCount={this.state.rowSize}
                  onGridRowsUpdated={this.onGridRowsUpdated}
                  minHeight={250}
                />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Container>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
