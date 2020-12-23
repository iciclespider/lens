import { addClusterURL } from "../components/+add-cluster";
import { clusterSettingsURL } from "../components/+cluster-settings";
import { extensionsURL } from "../components/+extensions";
import { landingURL } from "../components/+landing-page";
import { preferencesURL } from "../components/+preferences";
import { clusterViewURL } from "../components/cluster-manager/cluster-view.route";
import { LensProtocolRouterRenderer } from "./router";
import { navigate } from "../navigation/helpers";
import { ClusterStore } from "../../common/cluster-store";
import { WorkspaceStore } from "../../common/workspace-store";

export function bindProtocolAddRouteHandlers() {
  LensProtocolRouterRenderer
    .getInstance()
    .addInternalHandler("/preferences", ({ search: { highlight }}) => {
      navigate(preferencesURL({ fragment: highlight }));
    })
    .addInternalHandler("/", () => {
      navigate(landingURL());
    })
    .addInternalHandler("/landing", () => {
      navigate(landingURL());
    })
    .addInternalHandler("/landing/:workspaceId", ({ pathname: { workspaceId } }) => {
      if (WorkspaceStore.getInstance().getById(workspaceId)) {
        WorkspaceStore.getInstance().setActive(workspaceId);
        navigate(landingURL());
      } else {
        console.log("[APP-HANDLER]: workspace with given ID does not exist", { workspaceId });
      }
    })
    .addInternalHandler("/cluster", () => {
      navigate(addClusterURL());
    })
    .addInternalHandler("/cluster/:clusterId", ({ pathname: { clusterId } }) => {
      const cluster = ClusterStore.getInstance().getById(clusterId);

      if (cluster) {
        WorkspaceStore.getInstance().setActive(cluster.workspace);
        navigate(clusterViewURL({ params: { clusterId } }));
      } else {
        console.log("[APP-HANDLER]: cluster with given ID does not exist", { clusterId });
      }
    })
    .addInternalHandler("/cluster/:clusterId/settings", ({ pathname: { clusterId } }) => {
      const cluster = ClusterStore.getInstance().getById(clusterId);

      if (cluster) {
        WorkspaceStore.getInstance().setActive(cluster.workspace);
        navigate(clusterSettingsURL({ params: { clusterId } }));
      } else {
        console.log("[APP-HANDLER]: cluster with given ID does not exist", { clusterId });
      }
    })
    .addInternalHandler("/extensions", () => {
      navigate(extensionsURL());
    });
}
