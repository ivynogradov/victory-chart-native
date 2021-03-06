/* global setInterval */
/* eslint-disable no-magic-numbers */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import random from "lodash.random";
import range from "lodash.range";
import React, { Component } from "react";
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text
} from "react-native";
import Svg from "react-native-svg";
import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryCandlestick,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryScatter,
  VictoryStack,
  VictoryErrorBar,
  VictoryVoronoiTooltip,
  VictoryZoom
} from "../lib";

import { VictoryTooltip } from "victory-core-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#e1d7cd",
    justifyContent: "center",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 50
  },
  text: {
    fontSize: 18,
    fontFamily: "Menlo",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30
  }
});

const candleData = [
  {x: 1, open: 9, close: 30, high: 56, low: 7},
  {x: 2, open: 80, close: 40, high: 120, low: 10},
  {x: 3, open: 50, close: 80, high: 90, low: 20},
  {x: 4, open: 70, close: 22, high: 70, low: 5},
  {x: 5, open: 20, close: 35, high: 50, low: 10},
  {x: 6, open: 35, close: 30, high: 40, low: 3},
  {x: 7, open: 30, close: 90, high: 95, low: 30},
  {x: 8, open: 80, close: 81, high: 83, low: 75}
];

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      y: this.getYFunction(),
      style: this.getStyles(),
      staticData: this.getStaticData(),
      transitionData: this.getTransitionData()
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        y: this.getYFunction(),
        style: this.getStyles(),
        transitionData: this.getTransitionData()
      });
    }, 3000);
  }

  getStaticData() {
    const n = 100;
    return range(n).map((i) => {
      return {
        x: i,
        y: i < n / 2 ? random(0, 100) : random(100, 200)
      };
    });
  }

  getStyles() {
    const colors = [
      "red", "orange", "magenta",
      "gold", "blue", "purple"
    ];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: random(1, 5)
    };
  }

  getTransitionData() {
    const n = random(4, 10);
    return range(n).map((i) => {
      return {
        x: i,
        y: random(2, 10)
      };
    });
  }

  getYFunction() {
    const n = random(2, 7);
    return (data) => Math.exp(-n * data.x) * Math.sin(2 * n * Math.PI * data.x);
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.text}>{"<VictoryChart/>"}</Text>

        <VictoryChart
          domain={{y: [-25, 25]}}
        >
          <VictoryGroup
            data={
              range(10).map((i) => {
                return {
                  x: i,
                  y: random(-20, 20)
                };
              })
            }
          >
            <VictoryLine/>
            <VictoryVoronoiTooltip
              labels={(d) => `x: ${d.x} \n y: ${d.y}`}
            />
          </VictoryGroup>
        </VictoryChart>
        <VictoryChart><VictoryBar/><VictoryLine/></VictoryChart>

        <VictoryChart><VictoryCandlestick data={candleData}/></VictoryChart>

        <VictoryChart domain={{x: [0, 4]}}>
          <VictoryGroup
            labels={["a", "b", "c"]}
            offset={10}
            colorScale={"qualitative"}
          >
            <VictoryBar
              data={[
                {x: 1, y: 1},
                {x: 2, y: 2},
                {x: 3, y: 5}
              ]}
            />
            <VictoryBar
              data={[
                {x: 1, y: 2},
                {x: 2, y: 1},
                {x: 3, y: 7}
              ]}
            />
            <VictoryBar
              data={[
                {x: 1, y: 3},
                {x: 2, y: 4},
                {x: 3, y: 9}
              ]}
            />
          </VictoryGroup>
        </VictoryChart>

        <VictoryChart>
          <VictoryScatter
            labelComponent={<VictoryTooltip/>}
            data={[
              {
                x: 1, y: 3, fill: "red",
                symbol: "plus", size: 6, label: "WOW\nSTUFF"
              },
              {
                x: 2, y: 5, fill: "magenta",
                size: 9, opacity: 0.4, label: "WAT"
              },
              {
                x: 3, y: 4, fill: "orange",
                size: 5, label: "LABEL"
              },
              {
                x: 4, y: 2, fill: "brown",
                symbol: "square", size: 6, label: "OKAY"
              },
              {
                x: 5, y: 5, fill: "black",
                symbol: "triangleUp", size: 5, label: "GOOD"
              }
            ]}
          />
        </VictoryChart>

        <VictoryChart animate={{duration: 500}}>
          <VictoryBar
            data={this.state.transitionData}
            style={{
              data: {
                fill: "tomato", width: 12
              }
            }}
            animate={{
              onExit: {
                duration: 500,
                before: () => ({
                  y: 0,
                  fill: "orange",
                  label: "BYE"
                })
              }
            }}
          />
        </VictoryChart>

        <VictoryChart>
          <VictoryStack>
            <VictoryArea
              data={[
                {x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}, {x: "d", y: 4}, {x: "e", y: 7}
              ]}
            />
            <VictoryArea
              data={[
                {x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}, {x: "d", y: 7}, {x: "e", y: 5}
              ]}
            />
            <VictoryArea
              data={[
                {x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}, {x: "d", y: 2}, {x: "e", y: 6}
              ]}
            />
            <VictoryArea
              data={[
                {x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 3}, {x: "d", y: 4}, {x: "e", y: 7}
              ]}
            />
          </VictoryStack>
        </VictoryChart>

        <Text style={styles.text}>{"<VictoryZoom/>"}</Text>

        <VictoryZoom>
          <VictoryChart>
            <VictoryGroup data={this.state.staticData}>
              <VictoryLine/>
            </VictoryGroup>
          </VictoryChart>
        </VictoryZoom>

        <VictoryZoom zoomDomain={{x: [10, 20]}}>
          <VictoryChart>
            <VictoryLine
              interpolation="basis"
              animate={{duration: 1000}}
              data={
                range(30).map((x) => ({
                  x, y: Math.min(Math.max(0, x + random(-2, 2)), 30)
                }))
              }
              style={{
                data: {stroke: "red", strokeWidth: 2}
              }}
            />
            <VictoryLine
              interpolation="basis"
              animate={{duration: 1000}}
              data={
                range(30).map((x) => ({
                  x, y: Math.min(Math.max(0, x + random(-10, 10)), 30)
                }))
              }
              style={{
                data: {stroke: "yellow", strokeWidth: 2}
              }}
            />
          </VictoryChart>
        </VictoryZoom>

        <Text style={styles.text}>{"<VictoryLine />"}</Text>

        <VictoryLine />

        <VictoryLine
          data={[
            {x: 0, y: 1},
            {x: 1, y: 3},
            {x: 2, y: 2},
            {x: 3, y: 4},
            {x: 4, y: 3},
            {x: 5, y: 5}
          ]}
        />

        <VictoryLine
          data={[
            {amount: 1, yield: 1, error: 0.5},
            {amount: 2, yield: 2, error: 1.1},
            {amount: 3, yield: 3, error: 0},
            {amount: 4, yield: 2, error: 0.1},
            {amount: 5, yield: 1, error: 1.5}
          ]}
          x={"amount"}
          y={(data) => (data.yield + data.error)}
        />

        <VictoryLine y={(data) => Math.sin(2 * Math.PI * data.x)} />

        <VictoryLine
          height={300}
          domain={[0, 5]}
          padding={75}
          data={[
            {x: 0, y: 1},
            {x: 1, y: 3},
            {x: 2, y: 2},
            {x: 3, y: 4},
            {x: 4, y: 3},
            {x: 5, y: 5}
          ]}
          interpolation="cardinal"
          label="LINE"
          style={{
            data: {
              stroke: "#822722",
              strokeWidth: 3
            },
            labels: {fontSize: 12}
          }}
        />

        <VictoryLine
          width={300}
          style={{
            data: {
              stroke: (data) => {
                const y = data.map((d) => d.y);
                return Math.max(...y) > 2 ?
                  "red" : "blue";
              }
            }
          }}
          data={[
            {x: 0, y: 1},
            {x: 1, y: 3},
            {x: 2, y: 2},
            {x: 3, y: 4},
            {x: 4, y: 3},
            {x: 5, y: 5}
          ]}
        />

        <VictoryLine
          style={{
            data: {stroke: "red", strokeWidth: 9}
          }}
          interpolation={"linear"}
          // animate={{duration: 1000}}
          data={this.state.transitionData}
        />

        <VictoryLine
          style={{data: this.state.style}}
          interpolation="basis"
          y={this.state.y}
        />

        <Text style={styles.text}>{"<VictoryArea />"}</Text>

        <VictoryArea />

        <VictoryArea
          data={[
            {x: 1, y: 1},
            {x: 2, y: 2},
            {x: 3, y: 3},
            {x: 4, y: 1},
            {x: 5, y: 3},
            {x: 6, y: 4},
            {x: 7, y: 2}
          ]}
        />

        <VictoryArea
          data={[
            {amount: 1, yield: 1, error: 0.5},
            {amount: 2, yield: 2, error: 1.1},
            {amount: 3, yield: 3, error: 0},
            {amount: 4, yield: 2, error: 0.1},
            {amount: 5, yield: 1, error: 1.5}
          ]}
          x={"amount"}
          y={(data) => (data.yield + data.error)}
        />

        <VictoryGroup
          width={300}
          height={375}
          style={{data: {opacity: 0.3}}}
        >
          <VictoryArea
            data={[
              {x: 1, y: 1},
              {x: 2, y: 2},
              {x: 3, y: 3}
            ]}
          />
          <VictoryArea
            data={[
              {x: 1, y: 2},
              {x: 2, y: 1},
              {x: 3, y: 1}
            ]}
          />
          <VictoryArea
            data={[
              {x: 1, y: 3},
              {x: 2, y: 4},
              {x: 3, y: 2}
            ]}
          />
        </VictoryGroup>

        <VictoryStack
          width={300}
          height={375}
        >
          <VictoryArea
            data={[
              {x: 1, y: 1},
              {x: 2, y: 2},
              {x: 3, y: 3}
            ]}
          />
          <VictoryArea
            data={[
              {x: 1, y: 2},
              {x: 2, y: 1},
              {x: 3, y: 1}
            ]}
          />
          <VictoryArea
            data={[
              {x: 1, y: 3},
              {x: 2, y: 4},
              {x: 3, y: 2}
            ]}
          />
        </VictoryStack>

        <VictoryStack
          width={300}
          height={450}
          style={{ data: {
            strokeDasharray: "5,5",
            strokeWidth: 2,
            fillOpacity: 0.4
          }}}
        >
          <VictoryArea
            style={{ data: {
              fill: "tomato", stroke: "tomato"
            }}}
            data={[
              {x: 1, y: 1},
              {x: 2, y: 2},
              {x: 3, y: 3}
            ]}
          />
          <VictoryArea
            style={{ data: {
              fill: "orange", stroke: "orange"
            }}}
            data={[
              {x: 1, y: 2},
              {x: 2, y: 1},
              {x: 3, y: 1}
            ]}
          />
          <VictoryArea
            style={{ data: {
              fill: "gold", stroke: "gold"
            }}}
            data={[
              {x: 1, y: 3},
              {x: 2, y: 4},
              {x: 3, y: 2}
            ]}
          />
        </VictoryStack>

        <Text style={styles.text}>{"<VictoryBar />"}</Text>

        <VictoryBar />

        <VictoryBar
          data={[
            {x: 1, y: 1},
            {x: 2, y: 2},
            {x: 3, y: 3},
            {x: 4, y: 2},
            {x: 5, y: 1}
          ]}
        />

        <VictoryGroup
          width={300}
          height={375}
          offset={20}
          colorScale={"qualitative"}
        >
          <VictoryBar
            data={[
              {x: 1, y: 1},
              {x: 2, y: 2},
              {x: 3, y: 3}
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 2},
              {x: 2, y: 1},
              {x: 3, y: 1}
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 3},
              {x: 2, y: 4},
              {x: 3, y: 2}
            ]}
          />
        </VictoryGroup>

        <VictoryStack
          width={300}
          height={375}
          colorScale={"qualitative"}
        >
          <VictoryBar
            data={[
              {x: 1, y: 1},
              {x: 2, y: 2},
              {x: 3, y: 3}
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 2},
              {x: 2, y: 1},
              {x: 3, y: 1}
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 3},
              {x: 2, y: 4},
              {x: 3, y: 2}
            ]}
          />
        </VictoryStack>

        <VictoryBar
          height={375}
          padding={75}
          style={{
            data: {
              fill: (data) => data.y > 2 ? "red" : "blue"
            }
          }}
          data={[
            {x: 1, y: 1},
            {x: 2, y: 2},
            {x: 3, y: 3},
            {x: 4, y: 2},
            {x: 5, y: 1}
          ]}
        />

        <Text style={styles.text}>{"<VictoryScatter />"}</Text>

        <VictoryScatter />

        <VictoryScatter
          y={(data) =>
            Math.sin(2 * Math.PI * data.x)
          }
        />

        <VictoryScatter
          data={[
            {x: 1, y: 3},
            {x: 2, y: 5},
            {x: 3, y: 4},
            {x: 4, y: 2},
            {x: 5, y: 5}
          ]}
          size={8}
          symbol="star"
          style={{
            data: {
              fill: "gold",
              stroke: "orange",
              strokeWidth: 3
            }
          }}
        />

        <VictoryScatter
          style={{
            data: {
              fill: (data) => data.y > 0 ?
                "red" : "blue"
            }
          }}
          symbol={(data) => data.y > 0 ?
            "triangleUp" : "triangleDown"
          }
          y={(d) => Math.sin(2 * Math.PI * d.x)}
          samples={25}
        />

        <Text style={styles.text}>{"<VictoryAxis />"}</Text>

        <VictoryAxis height={100} />

        <VictoryAxis
          height={100}
          scale="time"
          tickValues={[
            new Date(1980, 1, 1),
            new Date(1990, 1, 1),
            new Date(2000, 1, 1),
            new Date(2010, 1, 1),
            new Date(2020, 1, 1)
          ]}
          tickFormat={(x) => x.getFullYear()}
        />

        <Svg width={320} height={320}>
          <VictoryAxis
            width={320}
            height={320}
            domain={[-10, 10]}
            crossAxis={true}
            offsetY={160}
            standalone={false}/>
          <VictoryAxis dependentAxis
            width={320}
            height={320}
            domain={[-10, 10]}
            crossAxis={true}
            offsetX={160}
            standalone={false}/>
        </Svg>

        <VictoryAxis
          dependentAxis
          padding={{left: 50, top: 20, bottom: 20}}
          scale="log"
          domain={[1, 5]}
        />

        <Text style={styles.text}>{"<VictoryErrorBar />"}</Text>

        <VictoryErrorBar
          style={{
            data: {stroke: "red", strokeWidth: 2}
          }}
          data={[
            {x: 1, y: 1, errorX: [1, 0.5], errorY: .1},
            {x: 2, y: 2, errorX: [1, 3], errorY: .1},
            {x: 3, y: 3, errorX: [1, 3], errorY: [.2, .3]},
            {x: 4, y: 2, errorX: [1, 0.5], errorY: .1},
            {x: 5, y: 1, errorX: [1, 0.5], errorY: .2}
          ]}
        />
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent("Demo", () => Demo);
