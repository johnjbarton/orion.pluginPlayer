/*******************************************************************************
 * @license
 * Copyright (c) 2011 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 * 
 * Contributors: IBM Corporation - initial API and implementation
 * johnjbarton@johnjbarton.com, Google, Inc.
 ******************************************************************************/

/*jslint browser:true devel:true*/
/*global define dijit dojo orion widgets serviceRegistry:true window*/

define(['require', 'dojo', 'orion/bootstrap', 'orion/status', 'orion/progress', 'orion/commands', 'orion/fileClient', 'orion/operationsClient',
          'orion/searchClient', 'orion/globalCommands', 'orion/dialogs',
          'dojo/parser', 'dojo/hash', 'dijit/layout/BorderContainer', 'dijit/layout/ContentPane', 'orion/widgets/RegistryTree'], 
      function(require, dojo, mBootstrap, mStatus, mProgress, mCommands, mFileClient, mOperationsClient, mSearchClient, mGlobalCommands, mDialogs) {

// extensionPoint: string like "orion.edit.command" 
// serviceRegistry: core thingy
// onServiceInfo: callback takes info {} and service object
function processExtensions(extensionPoint, serviceRegistry, onServiceInfo) {
  // iterate through the extension points and generate links for each one
  var actionReferences = serviceRegistry.getServiceReferences(extensionPoint);
  actionReferences.forEach(function(actionRef) {
    var service = serviceRegistry.getService(actionRef);
    var info = {};
    var propertyNames = actionRef.getPropertyNames();
    for (var j = 0; j < propertyNames.length; j++) {
      info[propertyNames[j]] = actionRef.getProperty(propertyNames[j]);
    }
    onServiceInfo(info, service);
  });
}

var pluginPlayer = {

  openMedia: function (info, statusService, event) {
    this.iframe = this.iframe || document.querySelector("#player");
    this.iframe.contentWindow.addEventListener('load', function () {
      statusService.setMessage("Now Playing " + info.id);
    });
    this.iframe.src = info.url;
    statusService.setMessage("Loading " + info.id);
  }

};

dojo.addOnLoad(function() {
  mBootstrap.startup().then(function(core) {
    var serviceRegistry = core.serviceRegistry;
    var preferences = core.preferences;
    var pluginRegistry = core.pluginRegistry;
    document.body.style.visibility = "visible";
    dojo.parser.parse();
    var dialogService = new mDialogs.DialogService(serviceRegistry);
    var commandService = new mCommands.CommandService({serviceRegistry: serviceRegistry});
    var fileClient = new mFileClient.FileClient(serviceRegistry);
    var searcher = new mSearchClient.Searcher({serviceRegistry: serviceRegistry, commandService: commandService, fileService: fileClient});
    var operationsClient = new mOperationsClient.OperationsClient(serviceRegistry);
    var statusService = new mStatus.StatusReportingService(serviceRegistry, operationsClient, "statusPane", "notifications");
    new mProgress.ProgressService(serviceRegistry, operationsClient);
    
    // global commands
    mGlobalCommands.generateBanner("banner", serviceRegistry, commandService, preferences, searcher);
  
    // add install stuff to page actions toolbar
    // We could use the command framework for the links but we are being lazy since we have to add a textbox anyway
    var pageActions = dojo.byId("pageActions");
    if (pageActions) {
      processExtensions("orion.pluginPlayer.media", core.serviceRegistry, function onServiceInfo(info, service) {
        var id = info.id;
        if (!id) {
          console.error("orion.pluginPlayer.media skipped, no id", info, service);
          return;
        }
        if (!info.url) {
          console.error("orion.pluginPlayer.media skipped, no url", info, service);
          return;
        }
        var title = info.title || info.id;
        var btn = dojo.place('<a id='+id+' title='+title+'>'+id+'</a>', pageActions, "last");
        dojo.addClass(btn, "commandLink");
        dojo.connect(btn, "onclick", pluginPlayer.openMedia.bind(pluginPlayer, info, statusService));
      });
    } else {
      console.error("no pageActions element");
    }
    
    
  });
});
});