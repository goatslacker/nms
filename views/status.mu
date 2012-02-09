{{#h1}}nms status{{/h1}}

{{#modules}}
  {{#modules.sync.length}}
    Modules to sync.
  {{/modules.sync.length}}
  {{#modules.sync}}
    - {{module}}@{{version}}
  {{/modules.sync}}
  {{#modules.install.length}}
    Modules to install.
  {{/modules.install.length}}
  {{#modules.install}}
    - {{module}}@{{version}}
  {{/modules.install}}
  {{#modules.local.length}}
    Modules to update on machine.
  {{/modules.local.length}}
  {{#modules.local}}
    - {{xmodule}}@{{#no}}{{xversion}}{{/no}} « {{module}}@{{#yes}}{{version}}{{/yes}}
  {{/modules.local}}
  {{#modules.remote.length}}
    Modules to update in gist.
  {{/modules.remote.length}}
  {{#modules.remote}}
    - {{module}}@{{#yes}}{{version}}{{/yes}} » {{xmodule}}@{{#no}}{{xversion}}{{/no}}
  {{/modules.remote}}
{{/modules}}
{{^modules}}
  {{#ok}}Nothing to update.{{/ok}}
{{/modules}}
