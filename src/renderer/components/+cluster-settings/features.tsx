import React from "react";
import { Cluster } from "../../../main/cluster";
import { InstallFeature } from "./components/install-feature";
import { clusterFeatureRegistry } from "../../../extensions/registries/cluster-feature-registry";

interface Props {
  cluster: Cluster;
}

export class Features extends React.Component<Props> {
  render() {
    const { cluster } = this.props;

    return (
      <section id="features">
        <h1>Features</h1>
        {
          clusterFeatureRegistry
            .getItems()
            .map((f) => (
              <InstallFeature key={f.title} cluster={cluster} feature={f.feature}>
                <section id={f.title}>
                  <h2>{f.title}</h2>
                  <p><f.components.Description /></p>
                </section>
              </InstallFeature>
            ))
        }
      </section>
    );
  }
}
