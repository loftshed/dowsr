/*---------
| Mapping |
---------*/

/*
STRETCH: LOAD MAP POINTS BASED ON DISTANCE RANGE IN VIEWPORT

KNOWN BUGS:
- When clicking dislike on a liked pin, likes are decremented, but dislikes are not incremented.
- When clicking like on a disliked pin, dislikes are decremented, but likes are not incremented.
- Map pins do not render immediately upon creation.

USEFUL:
https://visgl.github.io/react-map-gl/docs/api-reference/map
https://docs.mapbox.com/mapbox-gl-js/guides/
*/

export { default as Map } from "./Map";
