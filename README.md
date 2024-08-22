# no-idea

### TODO (sorted easy -> diff):
- Make Diamonds actual diamonds, not just rotated Rects
- Infinite (or just bigger) canvas that you can move around in
    - Am I the only one that sees the stupid 1px white line on Firefox?
- Undo/Redo with Ctrl/Cmd-Z (use a history?)
- Firefox: Fix the damn font/sizing change when text goes from editable to static Konva
    - There's a fix for the Y-axis change here https://konvajs.org/docs/sandbox/Editable_Text.html
    - But there appears to be a font size change as well somehow
    - ...ffs. I figured it out.... I'm using "Bold". But "Bold" does not exist on this weird custom font. So the browser decides how to "bold" it and I'm assuming Konva does too in its own weird way and they're not aligned.. Ugh
- Selection box (to select multiple shapes, in order to possibly delete)
- Saving
    - As Image
    - As Loadable State
- Collaboration


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
