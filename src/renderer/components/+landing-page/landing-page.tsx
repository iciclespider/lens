import "./landing-page.scss";
import React from "react";
import { computed, observable } from "mobx";
import { observer } from "mobx-react";
import { WorkspaceOverview } from "./workspace-overview";
import { PageLayout } from "../layout/page-layout";
import { Notifications } from "../notifications";
import { Icon } from "../icon";
import { ClusterStore } from "../../../common/cluster-store";
import { WorkspaceStore } from "../../../common/workspace-store";

@observer
export class LandingPage extends React.Component {
  @observable showHint = true;

  get workspace() {
    return WorkspaceStore.getInstance().currentWorkspace;
  }

  @computed
  get clusters() {
    return ClusterStore.getInstance().getByWorkspaceId(this.workspace.id);
  }

  componentDidMount() {
    const noClustersInScope = !this.clusters.length;
    const showStartupHint = this.showHint;

    if (showStartupHint && noClustersInScope) {
      Notifications.info(<><b>Welcome!</b><p>Get started by associating one or more clusters to Lens</p></>, {
        timeout: 30_000,
        id: "landing-welcome"
      });
    }
  }

  render() {
    const showBackButton = this.clusters.length > 0;
    const header = <><Icon svg="logo-lens" big /> <h2>{this.workspace.name}</h2></>;

    return (
      <PageLayout className="LandingOverview flex" header={header} provideBackButtonNavigation={showBackButton} showOnTop={true}>
        <WorkspaceOverview />
      </PageLayout>
    );
  }
}
