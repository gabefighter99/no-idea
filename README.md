# no-idea

### Play Around (Beta): <a href="https://verdant-scone-642f7d.netlify.app/" target="_blank">no-idea</a>

### TODO (sorted easy -> diff. tho tbh most lean hi diff):
- [ ] Tests. I think we hit the complexity level to warrant them lmao
    - [ ] test toolbar and dark mode effects
    - [ ] test drag all shapes + on drag end resetting to pointer
    - [ ] test resize all shapes (+ font size changes to Text post transform)
    - [ ] test above two after dragging and resizing canvas
    - [ ] test background rectangle scales appropriately to fill full screen
    - [ ] test appropriate cursor style changes
    - [ ] if possible test text onBlur causes no "shift" for both Chrome and Firefox
- [ ] Add quick select toolbar tool by pressing buttons (1 for hand, 2 for pointer, etc)
- [ ] Add hints ("like double tap to add text", etc)
- [ ] Make Diamonds actual diamonds, not just rotated Rects
- [ ] Undo/Redo with Ctrl/Cmd-Z (use a history? every action get pushed onto history stack?)
- [ ] Make it work on Mobile
    - Most of the functionality already works. Famous last works, but I'm hoping this is just a few more tweaks.
- [x] Better canvas:
    - [x] Infinite canvas
    - [x] Draggable canvas
    - [x] Zoomable canvas
        - N.B. Am I the only one that sees the stupid 1px white line on Firefox? Thought it was an extension, but I see it in Incognito too
- [x] Fix the damn font/sizing change glitch when onBlur text goes from editable to static Konva
    - This is actually a two-parter
    - [x] Y-axis glitch
        - Fixed manually by testing pixel offset based on fontSize. Was exactly as painful as it sounds. Check common/utils.ts
        - It's hella ugly, but whtvr
    - [x] X-axis change
        - There appears to be a font size change as well somehow
        - ...ffs. I figured it out.... I'm using "Bold". But "Bold" does not exist on this weird custom font. So the browser decides how to "bold" it and I'm assuming Konva does too in its own weird way and they're not aligned.. Ugh
        - Changing fonts fixes this
- [ ] When resizing text that has multiple words, sometimes the last word disappears when transforming into Static Konva Text
    - These freaking issues with width differences are killing me. Could be the spaces maybe?
- [ ] Selection box (to select multiple shapes, in order to possibly delete)
- [ ] Connecting objects (like arrows pointing to Rects becoming a single Group)
- [ ] Saving
    - [ ] As Image
    - [ ] As Loadable State
- [ ] Collaboration


### A New Beginning
okay so what u wanna do today?

umm lol. lets make a react app i guess? 
yeah i think react app with ts and then maybe one endpoint on go to exch data?

yeah we can start with simple go endpoint that just dis /heeloworld
. i can do that

okay so shud i do the react-app?
yeh go ahead. imma do in local tho. cuz there hella delay here
yeye
just keep this open in the side i think
yeh
u can share ur local w me too with tmate
just se
nd oke
can i ask u to fullscreen this terminal. cus it makes it tiny on my screen lmfao

wait .. you see in split screen too?
check fb, this is what i see

### Kinda how im imagining this going:

Frontend (React, TypeScript, Socket.IO):

- UI
- Real-time collaboration

Backend (Go):

- Auth (login, registration, JWTs)
- Rooms (and any logic related)
- DBs (user data, drawings, rooms)
