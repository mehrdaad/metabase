import cxs from "cxs";
import React, { Component } from "react";
import { connect } from "react-redux";

import { newMetric, selectMetric, selectAndAdvance } from "../actions";
import { fetchMetrics } from "metabase/redux/metadata";

import Button from "metabase/components/Button";

import Text from "metabase/components/Text";

import { getMetricsForCurrentFlow } from "../selectors";

const mapStateToProps = state => ({
    metrics: getMetricsForCurrentFlow(state)
});

const mapDispatchToProps = {
    fetchMetrics,
    newMetric,
    selectMetric,
    selectAndAdvance
};

const SURFACE_BORDER_COLOR = "#DCE1E4";
const Surface = ({ children }) => (
    <div
        className={cxs({
            backgroundColor: "#fff",
            border: `1px solid ${SURFACE_BORDER_COLOR}`
        })}
    >
        {children}
    </div>
);

@connect(mapStateToProps, mapDispatchToProps)
class MetricLanding extends Component {
    async componentWillMount() {
        this.props.fetchMetrics();
    }
    render() {
        const {
            metrics,
            newMetric,
            selectMetric,
            selectAndAdvance
        } = this.props;
        return (
            <div>
                <div className={cxs({ display: "flex", alignItems: "center" })}>
                    <h3>Existing metrics</h3>
                    <Button
                        className="ml-auto"
                        onClick={() => newMetric()}
                        primary
                    >
                        A fresh metric
                    </Button>
                </div>
                <Surface>
                    <ol>
                        {metrics.map(metric => (
                            <li
                                className="border-bottom py2 px3"
                                onClick={() =>
                                    selectAndAdvance(() =>
                                        selectMetric(metric))}
                                key={metric.id}
                            >
                                <h2 className="link">{metric.name}</h2>
                                <Text>{metric.description}</Text>
                            </li>
                        ))}
                    </ol>
                </Surface>
            </div>
        );
    }
}

export default MetricLanding;
