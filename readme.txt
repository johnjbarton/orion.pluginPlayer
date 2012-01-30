Experimental support for visual Orion plugins.

Orion plugins currently extend the given Orion UI. This project creates a 
visual hosting wrapper for non-Orion UI plugins: the Orion banner, toolbars,
and footer wrap an iframe that can be any content

Install: 
  1. Use Orion > 0.4M2. http://download.eclipse.org/orion/
  2. clone https://github.com/eclipse/orion.client.git
  3. clone this repo
  4. Create a Site called eg 'orion'
  5. Make that site "Self-hosting", using the project from step 2.
  6. Add an entry "orion.pluginPlayer" <- "orion/pluginPlayer"
  7. Save and start the site, 
  8. Open the site,
  8. Install the plugin: <base>/orion.pluginPlayer/plugin.html
  9. Reload the site.
(you will need some visual plugins before you can try the player).

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