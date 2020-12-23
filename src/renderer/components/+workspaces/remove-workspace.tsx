import React from "react";
import { observer } from "mobx-react";
import { computed} from "mobx";
import { WorkspaceStore } from "../../../common/workspace-store";
import { ConfirmDialog } from "../confirm-dialog";
import { commandRegistry } from "../../../extensions/registries/command-registry";
import { Select } from "../select";
import { CommandOverlay } from "../command-palette/command-container";

@observer
export class RemoveWorkspace extends React.Component {
  @computed get options() {
    return WorkspaceStore.getInstance()
      .enabledWorkspacesList
      .filter(workspace => workspace.id !== WorkspaceStore.defaultId)
      .map((workspace) => ({
        value: workspace.id,
        label: workspace.name
      }));
  }

  onChange(id: string) {
    const workspace = WorkspaceStore.getInstance().getById(id);

    if (!workspace?.enabled) {
      return;
    }

    CommandOverlay.close();
    ConfirmDialog.open({
      okButtonProps: {
        label: `Remove Workspace`,
        primary: false,
        accent: true,
      },
      ok: () => {
        WorkspaceStore.getInstance().removeWorkspace(workspace);
      },
      message: (
        <div className="confirm flex column gaps">
          <p>
            Are you sure you want remove workspace <b>{workspace.name}</b>?
          </p>
          <p className="info">
            All clusters within workspace will be cleared as well
          </p>
        </div>
      ),
    });
  }

  render() {
    return (
      <Select
        onChange={(v) => this.onChange(v.value)}
        components={{ DropdownIndicator: null, IndicatorSeparator: null }}
        menuIsOpen={true}
        options={this.options}
        autoFocus={true}
        escapeClearsValue={false}
        data-test-id="command-palette-workspace-remove-select"
        placeholder="Remove workspace" />
    );
  }
}

commandRegistry.add({
  id: "workspace.removeWorkspace",
  title: "Workspace: Remove workspace ...",
  scope: "global",
  action: () => CommandOverlay.open(<RemoveWorkspace />)
});
