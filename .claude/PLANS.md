This is a brand new file as of August 17 2025. You can essentially treat this as a prompt that was written today, and everything else as pre-existing context.

I'm going to give you more detailed instructions on the UI/UX for this site. Document what I'm about to say however you like and update the project's planning documents under the .claude/ directory with this information. Feel free to summarize, rephrase, or word it more efficiently or clearly. REMEMBER: This is all for the site as it appears on a computer monitor or a wide 16:9 type display. The site needs to be responsive, and we will look at how the site should look and behave on a phone or tablet in the future.

Much of this behavior is already present, so don't change things that don't need to be changed in order to fit these instructions.

Read this entire instruction set, compare this to the site's current behavior, and then generate a plan of action to implement these instructions. The plan should be set up in a way that allows us to do one step at a time, checking in with me between each step, so that I can choose to stop and save progress at any point.

IMPORTANT: Ask me any clarifying questions and point out anything I may have missed or not thought of BEFORE planning and starting this work. MAKE SURE we talk about anything labelled "FOR DISCUSSION" before starting work.

Once you have a complete understanding of the path forward, merge the instructions contained in this file into the existing claude files for planning, tasks, etc. Ensure that EVERYTHING referenced here is documented in those other default files. Treat this file like a prompt that could eventually be deleted (BUT DO NOT DELETE IT).

# How to categorize the content

## Albums

We're going to move away from calling them "albums" on the site. They'll be "tracks" now, although they will maintain much of the album functionality, including metadata and cover art.

## Tracks

- A "track" is an individual piece of content we want to be able to talk about and feature on the website as one of my portfolio items. It can be a side project, a work history entry, or a specific project from a place I've worked. For example, "Did Kansas Win?", "PHP Engine Optimization", and "Campbell Zafar Law" are all tracks.
- A track is anything that is an individual piece of content that cannot be considered a collection or playlist.
- I would like to preserve the idea that each track has rich metadata about it, the way albums currently do.
- When the project is finished, each track should have its own cover art and canvas video. There will be times especially during development (but potentially also in production) when not every track has cover art and/or a canvas video.
- When the user is not on a track's detail page but is viewing the track as a card on a higher level page like a playlist page or the home page, the cover art behavior defined below should apply.
- A track can exist in multiple playlists. For example, WichitaRadar can be in a playlist called Go Development, and in another playlist called Side Projects.

## Playlists

- A "playlist" is a collection of "tracks".
- Playlists cannot be nested, they can only contain tracks.

## What's what

- Personal projects and work history entries like "Did Kansas Win" and "Campbell Zafar Law" are tracks.
- Categories of work (like "Full Stack Engineering", "Data Engineering", etc) are playlists.
- Individual projects (like "Mobile API rebuild" or "PHP Engine Optimization") are tracks.
- Collections like "Recently Played", "Top Hits", and "Side Projects" are playlists.
- You have freedom to generate playlists as you have been doing. What you've done with that so far makes sense.

# Home Page

- The home page can continue to have the existing sections, like Spotify, with "Good Afternoon", "Made for You", "Top hits", etc.
- FOR DISCUSSION: Maybe we need to have an introductory section at the top that describes just a little bit what this site is? But in a Spotify looking way?
- Home page can continue to have a mix of vertical cards (like the "Good Afternoon" ones) and bigger cards, like the other sections do.
- All the cards on the home page should continue to have mouseover play buttons as they do right now.
- The "Show All" links should be functional, taking the user to a page that is similar to the home page but shows all of the content items that would fall under that category. For example, clicking the Show All link next to "Made for You" should take the user to a playlist page that shows all the "made for you" type content. There is a design reference file for that in designref/made-for-you-page.png.
- Scrollbars on spotify are these blocky translucent bars that appear when the user mouses over the scrollable column, and disappear a second or so after the user mouses out. See designref/scrollbars.png. Let's try to emulate that.

# Sub pages

## Track pages

- This is the detail page for an individual content item. I might call this the "track detail" or "track information" page. We already have these and they're great.
- When the user is on a track's detail page, the default behavior for the main cover art location should be as it already is - the cover art behavior defined below. For the right column, the top section should exhibit the canvas art behavior defined below.
- I love how you've already put these pages together, so they don't need to change much. For projects that have a public github repository, the track detail page should have a link to the repository. For projects that have a website or app that can be viewed, continue to show the "View live" link.
- Each track's "About this project" section should include a description of what it is. It should be more than just a sentence or two. It should be written in the voice of a music critic writing an article. Don't be too over the top with the music critic voice though. What we've done so far is good but dial the music critic voice back about 25% and place a little more emphasis on allowing the reader to easily grasp the project and its usefulness or value - whatever will be most compelling to a potential employer.

## Playlist pages

- When a user is on a playlist page, the list of tracks should show, just as it does right now. See designref/playlist.png.
- For each track listed in a playlist page, the title of the track should be clickable to take the user to that track's detail page.
- For each track listed in a playlist page, the cover art behavior should be exhibited, just as it currently is.
- When a user clicks the main green play button on a playlist page, the first track listed in the playlist should become the Now Playing track.
- When a user clicks the play button for an individual track, that track should become Now Playing, just as it currently does. That should not change.
- FOR DISCUSSION: Since we're not really doing albums anymore, the "Album" column here doesn't really make sense, but I'm not sure what to replace it with. Let's discuss that and you make some suggestions.
- Playlists should also have descriptions, but not in-depth music-critic-written descriptions. These should just be more brief and informative, like something Spotify would write. Interesting and entertaining, but concise and to the point.

## Left Column

We need to entirely rework the left column to match Spotify. See designref/left-col.png.

- In the top left is a button that can be used to collapse the left column - we do not need that on this site at all.
- Then there is the text "Your Library". Let's come up with something a little more appropriate for this site. We'll use that text elsewhere too.
- No need for any "Create" button, and no need for an icon or any functionality that appears to "maximize" that column or grow it into anything more than a column.
- This screenshot has buttons to filter the content by category, like "Playlists", "Artists", "Albums", etc. We only need two for certain - "Playlists" and "Projects", which would filter the content by playlists or by tracks, respectively. FOR DISCUSSION: Maybe we'll have other buttons there.
- The screenshot shows a "Recents" link - we don't need that at all.

### Left Column Resizing

- The left column on Spotify has an interesting resizing behavior. It has a maximum and minimum width, but if you drag it far enough to the left, it snaps into place at a width that is only wide enough to contain the cover art and nothing else, and the left column becomes just a stack of cover art. See designref/left-col-max.png as the maximum width, designref/left-col-min.png as the minimum width, and designref/left-col-icons.png as the stack of cover art. I would like to emulate this behavior.
- To get to the stack of icons, it appears this is the behavior:
	- When the user mouses over the border between columns, a gray line appears and the mouse icon changes to the hand as a visual indicator that the column can be grabbed and resized. See designref/column-border.png.
	- User mouses down on the border between the columns to begin resizing. When the user mouses down, the column border subtly fades from gray to white, as shown in designref/column-border-mousedown.png, and stays that color until mouseup. Once the user mouses out of the column border area, the line disappears again.
	- As the user drags the border left and right, the resizing moves with the mouse as expected, but stops at certain widths as shown in left-col-min.png and left-col-max.png.
	- As the user drags the mousedown further left than the minimum column size, the mouse icon persists as expected for a mousedown. The column remains static at its minimum width until the mouse gets to a spot that is about two thirds the minimum width of the column as measured from left to right. Once the mouse passes that point, the column SNAPS to icon width as shown in left-col-icons.jpg.
	- From there, if the user continues to hold the mouse down, the user can move back to the right and once the mouse crosses that same x axis, the column width SNAPS back to the minimum column width, and if the user continues to move right beyond the minimum width, the column smoothly resizes again, maxing out at the same max width as before.
	- If the user releases the mouse once the column has snapped to icon width, then the column border can still be grabbed by the mouse and resized again. The behavior is the same as before: the column sticks at icon width until the mouse reaches that same x-axis which is approximately 2/3rds the minimum column width, at which point the column snaps to that minimum width and can then be smoothly resized from min to max as expected.

### Left column search

- The screenshot shows a search area; I would like to have that and for it to be functional. It should filter the content in that column as the user types.
- When the user mouses over the search magnifying glass icon, the background color of the icon changes and the user is shown a tooltip that says "Search in Your Library". See designref/left-col-search-mouseover.png. I would like to have that, except instead of the text "Your Library", use whatever text we decided on in the above step when renaming this column.
- When a user clicks the magnifying glass icon, they are presented with a search bar that is pre-populated with the text "Search in Your Library". See designref/left-col-search-text.png. I would like to have that as well, but also replacing the text "Your Library" with whatever we're calling this column.

## Right Column

- The right column (where the canvas is) should also be resizable. Examples of how that looks on Spotify are in designref/right-col-1.png and designref/right-col-2.png. right-col-1 represents the minimum width of the column; right-col-2 represents the maximum width. Match the left column resizing behavior in terms of the mouseover effect, although there is no width narrower than right-col-1 to snap to.
- The track name should be clickable (with a mouseover underline) to go to that track's detail page.
- If the track is associated with a workplace history entry (for example, the track "Election Data Pipeline" has the text "Software Engineer - DDx" in a place that looks like it would be the Artist field on Spotify), then that text should be clickable to take the user to the track detail page for that workplace history track.

## Top Bar

- The Joshify logo and the word "Joshify" at the top left should be clickable to go back to the home page.
- We should have a home icon, a search bar, and within the search bar, a Browse icon, like designref/spotify-home.png shows.
- When a user mouses over the home button or search bar, they get a tooltip and the background of the icon or field changes to a slightly lighter gray. See designref/top-bar-mouseover.png.

### Search

- We should emulate Spotify's top center search bar, as seen in designref/spotify-home.png.
- FOR DISCUSSION: In that search bar we should come up with some other default text instead of "What do you want to play?" Like maybe "What do you want to see?" or something.
- As a user types in the search bar, results appear below including top result, songs, and artists. We can do Top Result, Tracks, and Playlists. see designref/search-results.png.
- FOR DISCUSSION: On the search results page there are lots of buttons to filter the results, like "All", "Songs", "Artists", etc. We just need "All" (which is selected by default as in the reference image), "Tracks", "Playlists", maybe "Projects" or "Work History", I don't know. Give me some suggestions about that. (Those filter buttons can also be used in the left column search bar - whatever we do there should be identical in both places in terms of the available search filter results buttons.)

### FOR DISCUSSION: Browse

- On Spotify, When a user clicks the browse button that's within the search bar at the top, they are showed pretty much all the site's content at a high level. See designref/browse.png.
- Each card has its name and a solid background color, and shows an example of some cover art within the card, at a jaunty angle. The colors seem to be random. We could emulate that.
- Once a user clicks on one of those cards, they are taken to that card's playlist. See designref/browse-result.png. Let's discuss what to do there before we do anything. I'm not sure we want that level of complexity for this site. I suppose we need somewhere to just list "everything", but maybe the Browse page just lists all the playlists? Let's talk about what the Browse icon does, or whether we need it.

## Bottom Bar

- There's an orphan heart/like icon; let's remove that.
- Track names should be clickable to take the user to that track's detail page.
- If a track is playing because it was clicked from a playlist card or page, the next and previous buttons should work, changing the Now Playing track to the next or previous tracks from that playlist.

# Cover art and canvas videos

- I will continue to use the term "album art" - that is synonymous with "cover art", and this just means whatever image we use for that playlist or track's art - even though we aren't calling it an "album" anymore.
- Every card that appears on the home page, playlist or track, should have cover art which I will supply. That cover art should show everywhere that's appropriate. The home page, any playlist or child content page (like the Made For You page), in the bottom bar when it's playing, etc. I think that is all correct as of right now.

## Behavior

- "Cover art behavior" means that the static cover art image should appear wherever it is expected, and if there is no cover art, the fallback should be the appropriate initials on the spotify green background.
- "Canvas video behavior" means that the track's canvas video should load and autoplay on loop in the current designated location in the right column. If there is no canvas video or it fails to load, the content displayed in that location should fall back to the cover art behavior.
- FOR DISCUSSION: Maybe there is some really simple animation we can automatically load into that area when no canvas video exists? Let's talk about that.

# Now Playing

- The "Now Playing" track is the track that is shown on the bottom bar and in the right column.
- When a track is now playing, its canvas video should be playing in the right column.
- When a user presses any pause button, the canvas video should pause.
- There should be a Default Track which is the track that always loads as Now Playing when a user first visits the site. I should be able to change which track is Now Playing by telling you which one it should be. This is not a user configurable option. Currently that track is Campbell Zafar; we'll keep that for now.
- When a user clicks the play button for a playlist from a card, from some page other than the playlist page, or by clicking the big green play button on a playlist's page, the first track in that playlist should become the "now playing" track, and the next and previous buttons in the bottom bar should be functional for that playlist. If a user clicks "previous" from the first track in a playlist, nothing should happen. If a user clicks "next" from the last track in a playlist, nothing should happen.
- When a user clicks the play button associated with any individual track, whether from the home page, a playlist page, the left column, or anywhere, that track should become the Now Playing track.
- When a track loads as Now Playing, it should load in the bottom bar as it currently does, with the track name, artist or whatever text goes in that field, and the cover art behavior should happen to the left as it does right now.
- When a track loads as Now Playing, it should load in the right column as it currently does, executing the canvas art behavior noted above.

