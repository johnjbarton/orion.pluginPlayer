Experimental support for visual Orion plugins.

Orion plugins currently extend the given Orion UI. This project creates a 
visual hosting wrapper for non-Orion UI plugins: the Orion banner, toolbars,
and footer wrap an iframe that can be any content

This Orion plugin creates a 'global' toolbar menu item "Plugin Player".

When you open the player, the 'page' toolbar menu lists Orion plugins 
implementing  'orion.pluginPlayer.media'
     id: one word identifier, appears in the toolbar menu
     title: tooltip and headline string
     href: the plugin URL
If you click on a 'media' plugin menu entry, the interior UI will be loaded with 
an iframe pointing to the plugin.

TODO:

When a media plugin is selected, its title and page menu replace the player's 
title and menu.

When the player is started with ?id=<media-id> the media-id is selected.

Implement 'promote this plugin' allowing users to convert a media-plugin to a 
global Orion command (by creating a 'orion.page.link' plugin with the 
'?id<media-id>' URL. 